"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from api.models import db, User, EmailAuthorized, Estudiante, Role, Docente, Materias, Grados, DocenteMaterias, EstudianteMaterias
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt, verify_jwt_in_request
from .schemas import TeacherSchema, UserSchema, AuthorizedEmailSchema, StudentSchema, MateriasSchema, DocenteMateriaSchema, EstudianteMateriaSchema
from datetime import datetime
app = Flask(__name__)
bcrypt = Bcrypt(app)

admin_routes = Blueprint('admin_routes', __name__)
# Allow CORS requests to this API
CORS(admin_routes)

@admin_routes.before_request
def get_role():
    verify_jwt_in_request()
    claims = get_jwt()
    role = Role.query.get(claims["role"])

    if not role:
        return jsonify({"msg": "Role Not found"}),400
    
    if role.nombre.lower() != "admin":
        return jsonify({"msg":"Access Denied"}),403

#  Asignacion de Schemas
    
teacher_schema = TeacherSchema()
teachers_schema = TeacherSchema(many=True)    

user_schema = UserSchema()
users_schema = UserSchema(many=True)

authorized_email_schema = AuthorizedEmailSchema()
authorized_emails_schema = AuthorizedEmailSchema(many=True)


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

materia_schema = MateriasSchema()
materias_schema = MateriasSchema(many=True)


# Endpoint para autorizacion de usuarios nuevos (Docentes y representantes)
@admin_routes.route('/user/auth', methods=['POST'])
@jwt_required()
def email_authorization():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Missig info"}),400
    
    
    role_exists = Role.query.get(body["role_id"])

    if not role_exists:
        return jsonify({"msg": "Role not found"}), 404
        
    try:
        new_authorized = authorized_email_schema.load(body)


        isUser = EmailAuthorized.query.filter_by(email=body['email']).first()

        if isUser:
            return jsonify({"msg": f"User already added with registered status: {isUser.isRegistered}"})

        db.session.add(new_authorized)
        db.session.commit()
    except ValidationError as err:

        return jsonify(err.messages),400
    

    return jsonify({"msg": "Email Authorized"}),201

@admin_routes.route('/user/auth', methods=['GET'])
def email_authorization():
    emails = EmailAuthorized.query.all()

    return jsonify(authorized_emails_schema.dump(emails)),201

# ////////////////////////////// Teachers Endpoints CRUD ////////////////////
@admin_routes.route('/teacher', methods=['POST'])
def add_teacher():
    body = request.get_json()

    if not body:
        return jsonify({"msg":"Error"}),400
    email = body['email']

    authorized = EmailAuthorized.query.filter_by(email=email).first()
    user_exists = User.query.filter_by(email=email).first()

    if not authorized or authorized.isRegistered == True or user_exists:
        return jsonify({"msg": "Docente no authorizado para registro o ya registrado"}),400
    
    if authorized.role.nombre.lower() != "docente":
        return jsonify({"msg": "Rol asignado incorrecto"}),400
    
    body["role_id"] = authorized.role.id

    try:
        new_teacher = teacher_schema.load(body)
        new_teacher.password = bcrypt.generate_password_hash(body['password'])

        db.session.add(new_teacher)
        authorized.isRegistered = True
        db.session.commit()

    except ValidationError as err:
        return jsonify(err.messages),400

    return jsonify({"msg": "Docente creado."}),201
    
@admin_routes.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = Docente.query.all()

    if not teachers:
        return jsonify({"msg": "Empty"}),200

    return jsonify(teachers_schema.dump(teachers)),200

@admin_routes.route('/teachers/<int:id>', methods=['GET'])
def get_teacher_by_id(id):

    teacher = Docente.query.get_or_404(id)
    
    return jsonify(teacher_schema.dump(teacher)),200

@admin_routes.route('/teachers/<int:id>', methods=['PUT'])
def update_teacher(id):
    body = request.get_json()
    teacher = Docente.query.get_or_404(id)

    if not body:
        return jsonify({"msg": "request body not found"}),400
    
    body.pop('email', None)
    body.pop('password', None)

    try:
        validate = teacher_schema.load(body, partial=True)
    except ValidationError as err:
        return jsonify(err.messages)

    for key,value in body.items():
        setattr(teacher, key, value)

    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(err.orig)

        return jsonify({"error": "Integrity Error", "details": str(e)}),400
    
    return jsonify(teacher_schema.dump(teacher)),200
    
@admin_routes.route('/teachers/<int:id>', methods=['DELETE'])
def remove_teacher(id):

    teacher = Docente.query.get(id)

    if not teacher:
        return jsonify({"msg": "Teacher not found"}),404
    
    try:
        db.session.delete(teacher)

        db.session.commit()
    except IntegrityError as err:
        db.session.rollback()
        print(err.orig)
        return jsonify(err._message)
    
    return jsonify({"msg": "Teacher removed"}),204
    
# /////////////////////////////// Students Endpoints CRUD //////////////////////////

@admin_routes.route('/student', methods=['POST'])
def add_student():
    body = request.get_json()

    representante = User.query.get(body.get('representante_id'))

    if not representante or representante.rol.nombre.lower() != "representante":
        return jsonify({"msg": "Representante no encontrado o con rol diferente"})

    try:
        student = student_schema.load(body) 
    except ValidationError as err:
        return jsonify(err.messages)
    
    existing_student = Estudiante.query.filter_by(
        nombre=student.nombre, 
        apellido=student.apellido, 
        representante_id=student.representante_id
    ).first()

    if existing_student:
        return jsonify({"error": "Student already exists with the same name, surname, and representative"}), 409
    
    fecha_actual = datetime.now()
    fecha_formateada = fecha_actual.strftime("%Y-%m-%d")
    student.fecha_ingreso = fecha_formateada

    try:
        db.session.add(student)
        db.session.commit()
    except IntegrityError as err:
        db.session.rollback()
        print(err.orig)
        return jsonify({"error": "Database Integrity Error"}), 500
    
    return jsonify({"msg": "Added successfully"}),201

@admin_routes.route('/students', methods=['GET'])
def get_students():
    body = Estudiante.query.all()

    return jsonify(students_schema.dump(body)),200

@admin_routes.route('/students/<int:id>', methods=['GET'])
def get_student_by_id(id):
    student = Estudiante.query.get(id)

    if not student:
        return jsonify({"msg": "Student not found"}),404

    return jsonify(student_schema.dump(student)),200

@admin_routes.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    body = request.get_json()
    student = Estudiante.query.get_or_404(id)

    if not body:
        return jsonify({"msg": "request body not found"}),400

    try:
        student_schema.load(body, partial=True)
    except ValidationError as err:
        return jsonify(err.messages)

    for key,value in body.items():
        setattr(student, key, value)

    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(err.orig)

        return jsonify({"error": "Integrity Error", "details": str(e)}),400
    
    return jsonify(student_schema.dump(student)),200
    
@admin_routes.route('/students/<int:id>', methods=['DELETE'])
def remove_student(id):
    student = Estudiante.query.get(id)

    if not student:
        return jsonify({"msg": "Student not found"}),404
    
    try:
        db.session.delete(student)
        db.session.commit()
    except IntegrityError as err:
        db.session.rollback()
        return jsonify(err._message)

    return jsonify({"msg": "Student removed"}),204

# ////////////////////// Materias endpoints CRUD ///////////////

@admin_routes.route('/materias', methods=['GET'])
def get_materias():
    materias = Materias.query.all()

    if not materias:
        return jsonify({"msg":"Not found"}),404

    return jsonify(materias_schema.dump(materias)),200

@admin_routes.route('/materias/<int:id>', methods=['GET'])
def get_materia_by_id(id):

    materia = Materias.query.get_or_404(id)

    return jsonify(materia_schema.dump(materia)),200

@admin_routes.route("/materia", methods=['POST'])
def add_materia():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Missing Body"})
    
    try:
        materia = materia_schema.load(body)
    except ValidationError as err:
        return jsonify(err.messages)
    
    grado_exists = Grados.query.get(materia.grado_id)

    if not grado_exists:
        return jsonify({"msg": "Grado no encontrado."}),404
    
    try:
        db.session.add(materia)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return jsonify({"msg": "Integrity Error"}),409
    
    return jsonify({"msg": "Materia added"}),201

@admin_routes.route('/materias/<int:id>', methods=['PUT'])
def update_materia(id):
    materia = Materias.query.get_or_404(id)
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Body not found"}),400
    
    try:
        materia_schema.load(body, partial=True)
    except ValidationError as err:
        return jsonify(err.messages)


    for key,value in body.items():
        setattr(materia, key, value)

    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(err.orig)

        return jsonify({"error": "Integrity Error", "details": str(e)}),400
    
    return jsonify(materia_schema.dump(materia))

@admin_routes.route('/materias/<int:id>', methods=['DELETE'])
def delete_materia(id):
    materia = Materias.query.get_or_404(id)

    try:
        db.session.delete(materia)

        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()

        print(e.orig)
        return jsonify({"msg": "Database Integrity Error"}),409
    
    return jsonify({"msg": "Materia deleted"}),204
    

# ///////////////////// Asociar Materias con docentes ///////////////
@admin_routes.route('/docente/materia', methods=['POST'])
def add_materia_docente():
    schema = DocenteMateriaSchema()
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Body not found."}),400

    try:
        new_relation = schema.load(body)
    except ValidationError as err:
        return jsonify(err.messages)

    materia = Materias.query.get(body.get('id_materia'))
    docente = Docente.query.get(body.get('id_docente'))

    if not materia or not docente:
        return jsonify({"msg":"Materia o docente no encontrado"}),404
    
    relation_exists = DocenteMaterias.query.filter_by(id_docente=docente.id, id_materia=materia.id).first()

    if relation_exists:
        return jsonify({"msg": "Teacher already assigned"}),400
    
    try:
        db.session.add(new_relation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return ({"msg": "Database Integrity Error"}),409
    
    return jsonify("Relation Created"),201
    
@admin_routes.route('/docente/<int:docente_id>/materia/<int:materia_id>', methods=['DELETE'])
def delete_docente_materia(docente_id, materia_id):

    materia = Materias.query.get(materia_id)
    docente = Docente.query.get(docente_id)

    if not materia or not docente:
        return jsonify({"msg":"Materia o docente no encontrado"}),404
    
    relation = DocenteMaterias.query.filter_by(id_docente=docente.id, id_materia=materia.id).first()

    if not relation:
        return jsonify({"msg": "relation not found"}),404
    
    try:
        db.session.delete(relation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return jsonify({"msg": "Database Integrity Error"})

    return jsonify({"msg": "Relation Deleted"}),204
    
# ////////////////// Asociar Materias con estudiantes ////////////////
@admin_routes.route('/estudiante/materia', methods=['POST'])
def add_estudiante_materia():
    body = request.get_json()
    schema = EstudianteMateriaSchema()

    if not body:
        return jsonify({"msg":"Body not found"}),400
    
    try:
        new_relation = schema.load(body)
    except ValidationError as err:
        return jsonify(err.messages)

    estudiante = Estudiante.query.get(body.get('estudiante_id'))
    materia = Estudiante.query.get(body.get('materia_id'))

    if not estudiante or not materia:
        return jsonify({"msg": "estudiante o materia no encontrado"}),404
    
    relation_exists = EstudianteMaterias.query.filter_by(id_estudiante=estudiante.id, id_materia=materia.id)

    if relation_exists:
        return jsonify({"msg": "Student already assigned"}),400
    try:
        db.session.add(new_relation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return ({"msg": "Database Integrity Error"}),409
    
    return jsonify("Relation Created"),201

@admin_routes.route('/estudiante/<int:id_estudiante/materia/<int:id_materia>', methods=['DELETE'])
def delete_estudiante_materia(id_estudiante,id_materia):
    materia = Materias.query.get(id_materia)
    estudiante = Estudiante.query.get(id_estudiante)

    if not materia or not estudiante:
        return jsonify({"msg":"Materia o estudiante no encontrado"}),404
    
    relation = EstudianteMaterias.query.filter_by(id_estudiante=estudiante.id, id_materia=materia.id).first()

    if not relation:
        return jsonify({"msg": "relation not found"}),404
    
    try:
        db.session.delete(relation)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        print(e.orig)
        return jsonify({"msg": "Database Integrity Error"})

    return jsonify({"msg": "Relation Deleted"}),204


# ////////////////// Rol Endpoints CRUD //////////////////////



# /////////////////// Grados Endpoints CRUD //////////////////

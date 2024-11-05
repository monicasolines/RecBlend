"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from api.models import db, User, EmailAuthorized, Estudiante, Role, Docente
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, verify_jwt_in_request
from .schemas import TeacherSchema, UserSchema, AuthorizedEmailSchema

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
    
teacher_schema = TeacherSchema()
teachers_schema = TeacherSchema(many=True)    

user_schema = UserSchema()
users_schema = UserSchema(many=True)

authorized_email_schema = AuthorizedEmailSchema()
authorized_emails_schema = AuthorizedEmailSchema(many=True)


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

@admin_routes.route('/add/teacher', methods=['POST'])
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
        return jsonify({"msg": "Rol asignado incorrecto"})
    
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
def retrieve_teachers():
    teachers = Docente.query.all()

    if not teachers:
        return jsonify({"msg": "Empty"}),200

    return jsonify(teachers_schema.dump(teachers)),200
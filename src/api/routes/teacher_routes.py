"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from api.models import db, Estudiante, Role, Docente
from flask_cors import CORS
from flask_jwt_extended import get_jwt, verify_jwt_in_request, get_jwt_identity
from api.schemas import TeacherSchema, MateriasSchema, EvaluacionSchema

app = Flask(__name__)


teacher_routes = Blueprint('teacher_routes', __name__)
# Allow CORS requests to this API
CORS(teacher_routes)

@teacher_routes.before_request
def get_role():
    verify_jwt_in_request()
    claims = get_jwt()
    role = Role.query.get(claims["role"])

    if not role:
        return jsonify({"msg": "Role Not found"}),400
    
    if role.nombre.lower() != "docente":
        return jsonify({"msg":"Access Denied"}),403

# //////////////////// Definicion de esquemas ////////

teacher_schema = TeacherSchema()

materias_schema = MateriasSchema(many=True)

evaluaciones_schema = EvaluacionSchema(many=True)

@teacher_routes.route('/info', methods=['GET'])
def get_personal_info():
    docente = Docente.query.get(get_jwt_identity())
    materias = [materia_asociada.materia for materia_asociada in docente.materias_enseñadas]
    evaluaciones = [evaluacion_asignada.evaluaciones for evaluacion_asignada in docente.evaluaciones]
    
    return jsonify({"docente": teacher_schema.dump(docente),
                    "materias": materias_schema.dump(materias),
                   "Evaluaciones": evaluaciones_schema.dump(evaluaciones)})
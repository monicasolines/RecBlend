"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from api.models import db, User, EmailAuthorized, Estudiante, Role, Docente
from flask_cors import CORS
from flask_jwt_extended import get_jwt, verify_jwt_in_request
from .schemas import TeacherSchema, UserSchema, AuthorizedEmailSchema, StudentSchema

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
    

@teacher_routes.route('/create/test', methods=['POST'])
def handle_eval_creation():
    pass
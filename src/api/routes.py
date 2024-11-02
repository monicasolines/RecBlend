"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from marshmallow import ValidationError
from api.models import db, User, EmailAuthorized, BlockedTokenList, Estudiante
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from .schemas import UserSchema, StudentSchema, get_role

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

# Definicion de esquemas para su uso

user_schema = UserSchema()
student_schema = StudentSchema()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/signup', methods=['POST'])
def handle_register():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "No hay body"}),400
    
    try: 
        user = user_schema.load(body)

        authorized = EmailAuthorized.query.filter_by(email=body['email']).first()

        if not authorized or authorized.isRegistered == True:
            return jsonify({"msg": "Email no autorizado o ya registrado"}),400
        

        user["role"] = authorized.role
        user["is_active"] = True
        hashed_password = bcrypt.generate_password_hash(user["password"]).decode('utf-8')
        user["password"] = hashed_password
        new_user = User(**user)
        

        authorized.isRegistered = True
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User registered successfully"}),201

    except ValidationError as err:
        return jsonify(err.messages),400


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()

    if not body or not body["email"] or not body["password"]:
        return jsonify({"msg": "Faltan credenciales"}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if not user:
        return jsonify({"msg": "User not found"}),404
    
   # role = roles.query.get(user.role_id)
    
    valid_password = bcrypt.check_password_hash(user.password, body["password"])

    if not valid_password:
        return jsonify({"msg": "Invalid Credentials"}),400
    
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token,
                    "role": user.role.name})


@api.route('/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    token = get_jwt()
    blocked_token = BlockedTokenList(jti=token['jti'])
    db.session.add(blocked_token)
    db.session.commit()

    return jsonify({"msg": "Logged Out"}),200

@api.route('/add/student', methods=['POST'])
@jwt_required()
def add_student():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Missing info"}),400

    student = student_schema.load(body)
    return jsonify({"estudiante": student})


@api.route('/student/<int:student_id>', methods=['GET'])
@jwt_required()
def get_student(student_id):
    user_id = get_jwt_identity()
    
    if  get_role(user_id) != "administrador":
        return jsonify({"msg": "No tienes permisos para acceder a esta informacion"}),403


    student = Estudiante.query.get(student_id)

    if not student:
        return jsonify({"msg": "Not found"}),404
    
    return jsonify({"student": student_schema.dump(student)})
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime

load_dotenv()

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

SECRET_KEY = os.getenv("SECRET_KEY")


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json() # Esto me ayuda a obtener los datos que me va a enviar el cliente =)

    # Valida los datos que enviaron
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400
    
    # A traves de lo siguiente voy a verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "El correo ya está registrado"}), 409
    
    # Crear un nuevo usuario con la contraseña encriptada, aquí es donde voy a usar el hash
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password, 
        is_active=True # por defecto coloco esto para que el usuario este activooo ;)
    )

    # base de datos, ya te voy cogiendo cariño, guarda aquí el usuario
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario se registro exitosamente"}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() # Esto me ayuda a obtener los datos que me va a enviar el cliente =) al igual que arriba con el registro

    # Valida que se envien email y contraseña
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email y la contraseña son obligatorios para continuar"}), 400
    
    # Por aquí buscaría el usuario por email
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"message": "Email o contraseña incorrectos"}), 401

    # Comprobar la contraseña
    if not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Correo o contraseña incorrectos"}), 401

    # Aqui la magia donde se genera el token JWT =)
    token = jwt.encode(
        {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"token": token, "user": {"id": user.id, "email": user.email, "name": user.name}}), 200

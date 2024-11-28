"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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
        return jsonify({"message": "El correo ya esta registrado"}), 400
    
    # Crear un nuevo usuario con la contraseña encriptada, aquí es donde voy a usar el hash
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        is_active=True # por defecto coloco esto para que el usuario este activooo ;)
    )

    # base de datos, ya te voy cogiendo cariño, guarda aquí el usuario
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario se registro exitosamente"}), 200
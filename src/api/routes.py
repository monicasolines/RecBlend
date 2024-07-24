"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)
CORS(api)  # Enable CORS for this blueprint

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    # Get identity from JWT token
    email = get_jwt_identity()
    dictionary = {
        "message": f"Hello world {email}"
    }

    return jsonify(dictionary)

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/admin/pending-users', methods=['GET'])
@jwt_required()
def get_pending_users():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    # Obteniendo usuarios con el estado 'en_revision'
    pending_users = User.query.filter_by(status='en_revision').all()
    return jsonify([user.serialize() for user in pending_users]), 200

@app.route('/admin/approve-user/<int:user_id>', methods=['PATCH'])
@jwt_required()
def approve_user(user_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()
    
    if user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    user_to_approve = User.query.get(user_id)
    if not user_to_approve:
        return jsonify({"msg": "User not found"}), 404

    # Cambia únicamente el estado del usuario
    user_to_approve.status = "activo"
    db.session.commit()
    return jsonify({"msg": f"User {user_to_approve.username} approved"}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

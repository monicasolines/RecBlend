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
# Admin
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

@api.route('/admin/users/<int:user_id>/status', methods=['PATCH'])
@jwt_required()
def update_user_status(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user or current_user.role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    body = request.get_json()
    new_status = body.get('status')
    
    if new_status not in ['activo', 'en_revision']:
        return jsonify({"error": "Invalid status"}), 400
    
    user.status = new_status
    db.session.commit()
    
    return jsonify({"message": "User status updated successfully"}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

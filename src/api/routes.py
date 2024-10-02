from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User

# Crear el Blueprint para la API
api = Blueprint('api', __name__)

@api.route('/')
def root():
    return "Home"



##### RUTAS LOGIN Y SIGNUP #####
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'msg': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'user': user.serialize(),  # Asegúrate de que el método serialize() esté definido en tu modelo User
            'token': access_token
        }), 200

    return jsonify({'success': False, 'msg': 'Invalid email/password combination'}), 401

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({
        'success': True,
        'message': 'This is a private route',
        'user_id': current_user
    }), 200

if __name__ == '__main__':
    api.run(debug=True)




@api.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')  

    if not email or not password or not confirm_password:
        return jsonify({"error": "Email, password, and confirm password are required."}), 400
    
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists."}), 400
    
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.serialize()), 201
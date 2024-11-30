"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
from api.models import db, User, Product, Order, Notification, OrderItem
from api.utils import APIException

load_dotenv()

api = Blueprint('api', __name__)
CORS(api)

SECRET_KEY = os.getenv("SECRET_KEY")

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message from the backend"}), 200

# Registro y login
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()# Esto me ayuda a obtener los datos que me va a enviar el cliente =)

   # Valida los datos que enviaron
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "El correo ya está registrado"}), 409
# Crear un nuevo usuario con la contraseña encriptada, aquí es donde voy a usar el has
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'], 
        password=hashed_password,
        is_active=True)# por defecto coloco esto para que el usuario este activooo ;)
   # base de datos, ya te voy cogiendo cariño, guarda aquí el usuario

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()# Esto me ayuda a obtener los datos que me va a enviar el cliente =) al igual que arriba con el registro
   # Valida que se envien email y contraseña 
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400
   # Por aquí buscaría el usuario por email
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Email o contraseña incorrectos"}), 401
   
   # Aqui la magia donde se genera el token JWT =)
    token = jwt.encode(
        {"id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )
    return jsonify({"token": token, "user": {"id": user.id, "email": user.email, "name": user.name}}), 200

# Ahora voy con los productos
@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products]), 200

# Obtener por el id del producto
@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    return jsonify(product.serialize()), 200

# Carrito de compras
@api.route('/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    cart_items = OrderItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.serialize() for item in cart_items]), 200


@api.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    if not data.get('product_id') or not data.get('quantity') or not data.get('user_id'):
        return jsonify({"message": "Producto, cantidad e ID del usuario son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    new_cart_item = OrderItem(user_id=data['user_id'], product_id=data['product_id'], quantity=data['quantity'])
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({"message": "Producto agregado al carrito"}), 201


@api.route('/cart/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cart_item = OrderItem.query.get(id)
    if not cart_item:
        return jsonify({"message": "Producto no encontrado en el carrito"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Producto eliminado del carrito"}), 200

# Crear un nuevo pedido
@api.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data.get('user_id') or not data.get('product_id') or not data.get('quantity'):
        return jsonify({"message": "Usuario, producto y cantidad son requeridos"}), 400

    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
   
   # Crear un nuevo pedido
    new_order = Order(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity'],
        total_price=product.price * data['quantity']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Pedido creado exitosamente"}), 201

# Obtener pedidos de un usuario
@api.route('/orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.serialize() for order in orders]), 200

# Consultar recordatorios/notificaciones
@api.route('/notifications', methods=['GET'])
def get_notifications():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "El ID del usuario es obligatorio"}), 400

    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([notification.serialize() for notification in notifications]), 200

# Crear o actualizar un recordatorio
@api.route('/notifications', methods=['POST'])
def create_or_update_notification():
    data = request.get_json()
    if not data.get('message') or not data.get('user_id'):
        return jsonify({"message": "El mensaje y el ID del usuario son requeridos"}), 400

   # Crear o actualizar una notificación
    notification = Notification.query.filter_by(user_id=data['user_id']).first()
    if notification:
        notification.message = data['message']
        db.session.commit()
        return jsonify({"message": "Notificación actualizada"}), 200

    new_notification = Notification(user_id=data['user_id'], message=data['message'])
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"message": "Notificación creada"}), 201

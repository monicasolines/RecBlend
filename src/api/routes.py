"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Vehiculo, Reparacion
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    if usuarios == []:
        return jsonify({"MSG":"No existen usuarios"}), 404
    return jsonify([u.serialize() for u in usuarios]), 200

@api.route('/usuarios', methods=['POST'])
def crear_usuario():
    datos = request.json
    exist_user = Usuario.query.filter_by(email=datos["email"]).first()
    if exist_user: 
        return jsonify({"MSG": "Ya existe el usuario"}), 404
    
    usuario = Usuario(
        nombre=datos['nombre'],
        apellido=datos['apellido'], 
        email=datos['email'], 
        #password=generate_password_hash(datos['contraseña']), 
        password= datos["password"], 
        rol=datos['rol'],
        telefono = datos ["telefono"],
        )
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario creado exitosamente'}), 201

@api.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    return jsonify(usuario.serialize()), 200

@api.route('/usuarios/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    
    datos = request.json
    usuario.nombre = datos['nombre']
    usuario.apellido = datos['apellido']
    usuario.email = datos['email']
   # usuario.contraseña = generate_password_hash(datos['contraseña'])
    usuario.password = datos ["password"]
    usuario.rol = datos['rol']
    usuario.telefono = datos["telefono"]
    db.session.commit()
    return jsonify({'mensaje': 'Usuario actualizado exitosamente'})

@api.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario eliminado exitosamente'})

# @api.route('/vehiculos', methods=['GET'])
# def get_vehiculos():
#     vehiculos = Vehiculo.query.all()
#     return jsonify([v.serialize() for v in vehiculos])

# @api.route('/vehiculos', methods=['POST'])
# def crear_vehiculo():
#     datos = request.json
#     vehiculo = Vehiculo(código_producto=datos['código_producto'], VIN_matrícula=datos['VIN_matrícula'], transporte=datos['transporte'], empresa_institución=datos['empresa_institución'], nombre_chófer_propietario=datos['nombre_chófer_propietario'], teléfono=datos['teléfono'], kilometraje=datos['kilometraje'], fallas=datos['fallas'], capture_DTC=datos['capture_DTC'], solución=datos['solución'], técnico_id=datos['técnico_id'], fecha_ingreso=datos['fecha_ingreso'], fecha_salida=datos['fecha_salida'], costo_reparación=datos['costo_reparación'])
#     db.session.add(vehiculo)
#     db.session.commit()
#     return jsonify({'mensaje': 'Vehículo creado exitosamente'}), 201

# @api.route('/reparaciones', methods=['GET'])
# def get_reparaciones():
#     reparaciones = Reparación.query.all()
#     return jsonify([r.serialize() for r in reparaciones])

# @api.route('/reparaciones', methods=['POST'])
# def crear_reparación():
#     datos = request.json
#     reparación = Reparación(vehículo_id=datos['vehículo_id'], fecha_reparación=datos['fecha_reparación'], costo_reparación=datos['costo_reparación'], monto_cancelado_cliente=datos['monto_cancelado_cliente'], monto_cancelado_técnico=datos['monto_cancelado_técnico'], porcentaje_ganancia_técnico=datos['porcentaje_ganancia_técnico'], porcentaje_ganancia_empresa=datos['porcentaje_ganancia_empresa'], check_list_pago=datos['check_list_pago'])
#     db.session.add(reparación)
#     db.session.commit()
#     return jsonify({'mensaje': 'Reparación creada exitosamente'}), 201

# @api.route('/reportes', methods=['GET'])
# def get_reportes():
#     reportes = Reporte.query.all()
#     return jsonify([r.serialize() for r in reportes])

# @api.route('/reportes', methods=['POST'])
# def crear_reporte():
#     datos = request.json
#     reporte = Reporte(vehículo_id=datos['vehículo_id']

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

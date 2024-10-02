from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(100), nullable=False)

class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    código_producto = db.Column(db.String(100), nullable=False)
    VIN_matrícula = db.Column(db.String(100), nullable=False)
    transporte = db.Column(db.String(100), nullable=False)
    empresa_institución = db.Column(db.String(100), nullable=False)
    nombre_chófer_propietario = db.Column(db.String(100), nullable=False)
    teléfono = db.Column(db.String(100), nullable=False)
    kilometraje = db.Column(db.Float, nullable=False)
    fallas = db.Column(db.String(200), nullable=False)
    capture_DTC = db.Column(db.String(100), nullable=False)
    solución = db.Column(db.String(200), nullable=False)
    técnico_id = db.Column(db.Integer)
    #técnico = db.relationship('Usuario', backref='vehiculos')
    fecha_ingreso = db.Column(db.Date, nullable=False)
    fecha_salida = db.Column(db.Date)
    costo_reparación = db.Column(db.Float)

class Reparación(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehículo_id = db.Column(db.Integer,)
    #vehículo = db.relationship('Vehiculo', backref='reparaciones')
    fecha_reparación = db.Column(db.Date, nullable=False)
    costo_reparación = db.Column(db.Float, nullable=False)
    monto_cancelado_cliente = db.Column(db.Float)
    monto_cancelado_técnico = db.Column(db.Float)
    porcentaje_ganancia_técnico = db.Column(db.Float)
    porcentaje_ganancia_empresa = db.Column(db.Float)
    check_list_pago = db.Column(db.Boolean)

class Reporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehículo_id = db.Column(db.Integer)
   # vehículo = db.relationship('Vehiculo', backref='reportes')
    fecha_reporte = db.Column(db.Date, nullable=False)
    contenido_reporte = db.Column(db.String(500), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
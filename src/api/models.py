from flask_sqlalchemy import SQLAlchemy
from enum import Enum
db = SQLAlchemy()


class Roles(Enum):
    DOCENTE = "Docente"
    REPRESENTANTE = "Representante"
    ADMINISTRADOR = "Administrador"

class EmailAuthorized(db.Model):
    __tablename__="Email_Autorizado"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Integer, unique=True, nullable=False)
    isRegistered = db.Column(db.Boolean(), nullable=False)
    Role = db.Column(db.Enum(Roles), nullable=False)


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    Role = db.Column(db.Enum(Roles), nullable=False)

    estudiantes = db.relationship("Estudiante", back_populates="representante")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Materias(db.Model):
    __tablename__ = "materia"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(70))


class DocenteMaterias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_docente = db.Column(db.Integer, db.ForeignKey("user.id"))
    id_materia = db.Column(db.Integer, db.ForeignKey("materia.id"))


class Estudiante(db.Model):
    __tablename__ = "estudiante"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    fecha_ingreso = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    representante_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    representante = db.relationship('User', back_populates="estudiantes")
    calificaciones = db.relationship('Calificacion', back_populates="estudiantes")


class Evaluacion(db.Model):
    __tablename__ = "evaluacion"

    id = db.Column(db.Integer, primary_key=True)
    profesor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    materia_id = db.Column(db.Integer, db.ForeignKey('materia.id'), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(100))
    fecha = db.Column(db.Date)

    calificaciones = db.relationship('Calificacion', back_populates="evaluaciones")

class Calificacion(db.Model):
    __tablename__ = "calificacion"

    id = db.Column(db.Integer, primary_key=True)
    evaluacion_id = db.Column(db.Integer, db.ForeignKey('evaluacion.id'))
    estudiante_id = db.Column(db.Integer, db.ForeignKey('estudiante.id'))

    evaluaciones = db.relationship('Evaluacion', back_populates="calificaciones")
    estudiantes = db.relationship('Estudiante', back_populates="calificaciones")
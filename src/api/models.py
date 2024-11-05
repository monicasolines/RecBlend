from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()


class Role(db.Model):
    __tablename__ = 'role'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20))


    users = db.relationship("User", back_populates="rol")
    authorized_email = db.relationship("EmailAuthorized", back_populates="role")
    

    def __repr__(self):
        return f"{self.nombre}"

class EmailAuthorized(db.Model):
    __tablename__="Email_Autorizado"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    isRegistered = db.Column(db.Boolean(), nullable=False, default=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

    role = db.relationship('Role', back_populates='authorized_email')

    def __repr__(self):
        return f"Email: {self.email} - Registered: {self.isRegistered}"

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

    estudiantes = db.relationship("Estudiante", back_populates="representante")

    rol = db.relationship(Role, back_populates='users')

    def __repr__(self):
        return f'{self.nombre} - {self.rol.nombre}'


class Docente(User):
    __tablename__ = "docente"
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)  
    descripcion = db.Column(db.String(300), nullable=False)
    foto = db.Column(db.String(250))

    def __repr__(self):
        return f'<Docente {self.nombre}>'

class Grados(db.Model):
    __tablename__ = "grado"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(40), nullable=False, unique=True)

    materias = db.relationship('Materias', back_populates='grados')

    def __repr__(self):
        return f"{self.nombre}"

class Materias(db.Model):
    __tablename__ = "materia"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(70))
    grado = db.Column(db.Integer, db.ForeignKey('grado.id'))

    grados = db.relationship(Grados, back_populates="materias")

    def __repr__(self):
        return f"{self.nombre} - {self.grados.nombre}"

class DocenteMaterias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_docente = db.Column(db.Integer, db.ForeignKey("docente.id"))
    id_materia = db.Column(db.Integer, db.ForeignKey("materia.id"))

    docentes = db.relationship(Docente)
    materias = db.relationship(Materias)

    __table_args__ = (db.UniqueConstraint(id_docente, id_materia, name="docente_materia_unique"),)

class EstudianteMaterias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_estudiante = db.Column(db.Integer, db.ForeignKey("estudiante.id"))
    id_materia = db.Column(db.Integer, db.ForeignKey("materia.id"))


    estudiante = db.relationship('Estudiante')
    materia = db.relationship(Materias)

    __table_args__ = (db.UniqueConstraint(id_estudiante, id_materia, name="estudiante_materia_unique"),)



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
    

    def __repr__(self):
        return f"{self.nombre}"

class Evaluacion(db.Model):
    __tablename__ = "evaluacion"

    id = db.Column(db.Integer, primary_key=True)
    profesor_id = db.Column(db.Integer, db.ForeignKey('docente.id'), nullable=False)
    materia_id = db.Column(db.Integer, db.ForeignKey('materia.id'), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(100))
    fecha = db.Column(db.Date)
    finalizada = db.Column(db.Boolean(), default=False, nullable=False)
    calificaciones = db.relationship('Calificacion', back_populates="evaluaciones")

    profesor = db.relationship(Docente)
    materia = db.relationship(Materias)

    def __repr__(self):
        return f"{self.nombre} - {self.materia.nombre} - {self.profesor.nombre}"
    
class Calificacion(db.Model):
    __tablename__ = "calificacion"

    id = db.Column(db.Integer, primary_key=True)
    evaluacion_id = db.Column(db.Integer, db.ForeignKey('evaluacion.id'))
    estudiante_id = db.Column(db.Integer, db.ForeignKey('estudiante.id'))
    nota = db.Column(db.Float, nullable=False)

    evaluaciones = db.relationship('Evaluacion', back_populates="calificaciones")
    estudiantes = db.relationship('Estudiante', back_populates="calificaciones")

class BlockedTokenList (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(500))


    

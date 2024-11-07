from marshmallow_sqlalchemy import SQLAlchemySchema, SQLAlchemyAutoSchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from .models import db, User, Estudiante, Docente, EmailAuthorized, Materias, Evaluacion, Grados, DocenteMaterias, EstudianteMaterias
from marshmallow import post_load

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

    password = auto_field(load_only=True)
    role_id = auto_field(dump_only=True)
    is_active = auto_field(dump_only=True)
    id = auto_field(dump_only=True)

    @post_load
    def filter_fields(self, data, **kwargs):
        # Eliminar campos extra que no pertenecen a User
        data.pop("foto", None)
        data.pop("descripcion", None)
        return data

class TeacherSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Docente
        sqla_session = db.session
        include_fk= True
        load_instance = True

        
    password = auto_field(load_only=True)
    id = auto_field(dump_only=True)
    role_id = auto_field(load_only=True)

class StudentSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = Estudiante
        sqla_session = db.session
        load_instance = True

    id = auto_field(dump_only=True)
    representante_id = auto_field(load_only=True)
    fecha_ingreso = auto_field(dump_only=True)
    is_active= auto_field(missing=True)
    representante = Nested(UserSchema, dump_only=True, exclude=['role_id','id', 'is_active'])

class AuthorizedEmailSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = EmailAuthorized
        sqla_session = db.session
        dump_only = ('id','isRegistered')
        load_instance = True
        include_fk = True
        
class GradoSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        model = Grados
        sqla_session = db.session
        dump_only = ('id',)

class MateriasSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Materias
        sqla_session = db.session
        load_instance= True
        dump_only = ('id',)
        ordered = True

    grado = Nested(GradoSchema, dump_only=True)
        
class EvaluacionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Evaluacion
        sqla_session = db.session
        dump_only = ('id',)


class DocenteMateriaSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = DocenteMaterias
        sqla_session = db.session
        dump_only = ('id',)
        load_instance = True

class EstudianteMateriaSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = EstudianteMaterias
        sqla_session = db.session
        dump_only = ('id',)
        load_instance = True
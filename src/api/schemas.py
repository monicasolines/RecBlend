from marshmallow_sqlalchemy import SQLAlchemySchema, SQLAlchemyAutoSchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from .models import db, User, Estudiante


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

    password = auto_field(load_only=True)
    role = auto_field(dump_only=True)
    is_active = auto_field(dump_only=True)
    id = auto_field(dump_only=True)


class StudentSchema(SQLAlchemyAutoSchema):

    class Meta:
        model = Estudiante
        sqla_session = db.session

    id = auto_field(dump_only=True)
    representante_id = auto_field(load_only=True)
    fecha_ingreso = auto_field(dump_only=True)
    representante = Nested(UserSchema, dump_only=True)


def get_role(id):
    user = User.query.get(id)

    if not user:
        return 404
    
    return user.role.name.lower()
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=False)
    role = db.Column(db.Enum('user', 'admin', name='role_enum'), default='user', nullable=False)
    status = db.Column(db.Enum('activo', 'en_revision', name='role_status'), default='en_revision', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(pytz.utc)) # Importe libreria pytz para obtener la hora UTC
    updated_at = db.Column(db.DateTime, default=datetime.now(pytz.utc), onupdate=datetime.now(pytz.utc))
   

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
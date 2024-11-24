from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from api.models import db
from marshmallow import ValidationError
from tempfile import NamedTemporaryFile
from datetime import timedelta
from firebase_admin import storage

def create_instance(model,body,schema):
    
    try:
        schema.load(body)
        instance = model(**body)
        db.session.add(instance)
        db.session.commit()
        return jsonify(schema.dump(instance)),201
    
    except ValidationError as e:
        db.session.rollback()
        return jsonify({"error":{"validation_error": e.messages}}),400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}),400
    except Exception as e:
        return jsonify({"error": str(e)}),400
    
    
def get_all_instances(model,schema):
    try:
        instances = model.query.all()
        
        if not instances:
            return jsonify({"error": f"{model.__name__} no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)})
    return jsonify(schema.dump(instances)),200

def get_instance_by_id(model, schema, instance_id):
    instance = model.query.get(instance_id)
    if instance:
        return jsonify(schema.dump(instance)), 200
    return jsonify({"error": f"{model.__name__} no encontrado"}), 404

def update_instance(model, id, data, schema):
    instance = model.query.get(id)
    
    if not instance:
        return jsonify({"error": f"{model.__name__} no encontrado"}),404
    try:
        schema.load(data, partial=True)
        
        for key, value in data.items():
            setattr(instance, key, value) 
        db.session.commit()
        return jsonify({"message": f"{model.__name__} actualizado con éxito", "data": data}), 200
    
    except ValidationError as e:
        db.session.rollback()
        return jsonify({"msg": e.messages}),400
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

def delete_instance(model,id):
    instance = model.query.get(id)
    
    if not instance:
        return jsonify({"error": f"{model.__name__} no encontrado"}), 404
    
    try:
        db.session.delete(instance)
        db.session.commit()
        return jsonify({"message": f"{model.__name__} eliminado con éxito"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": str(e)})
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)})
    
    

def allowed_file(filename):
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def upload_image(file, name):
    
    if (not allowed_file(file.filename)):
        return jsonify({"msg": "Formato de archivo no admitido"}),400
    
    
    extension = file.filename.split(".")[1]
    temp=NamedTemporaryFile(delete=False)
    file.save(temp.name)
    
    bucket = storage.bucket(name='schoolhub4geeks.firebasestorage.app')
    filename ='picturesschoolhub/' + name + "." + extension
    resource = bucket.blob(filename)
    resource.upload_from_filename(temp.name, content_type="image/"+extension)
    
    return filename

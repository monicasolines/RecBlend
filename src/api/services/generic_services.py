from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from api.models import db
from marshmallow import ValidationError

def create_instance(model,body,schema):
    
    try:
        schema.load(body)
        instance = model(**body)
        db.session.add(instance)
        db.session.commit()
        return jsonify(schema.dump(instance)),201
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}),400
    except ValidationError as e:
        return jsonify(e.messages),400
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
            setattr(instance, key, value)  # Actualiza los atributos
        db.session.commit()
        return jsonify({"message": f"{model.__name__} actualizado con éxito", "data": data}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    except ValidationError as e:
        return jsonify({"msg": e.messages})

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
        return jsonify({"msg": str(e)})
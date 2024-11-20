import requests
import os
from flask import jsonify

def send_recovery_email(email, token, fullname):
    API_URL = os.getenv('API_URL')
    FRONT_URL = os.getenv('FRONTEND_URL')
    KEY = os.getenv('PRIVATE_KEY')
    data = {
    "service_id": os.getenv('SERVICE_ID'),
    "template_id": os.getenv('TEMPLATE_ID'),
    "user_id": os.getenv('USER_ID'),
        'accessToken' : KEY,
    "template_params": {
        'user_name': fullname,
        'user_email': email,
        'url': FRONT_URL+f"resetpassword?token={token}"
        
    }
    }
    
    headers = {"Content-Type": 'application/json'}

    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error al comunicarse con el serividor: {str(e)}"}),500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}),500
    
    if response.status_code == 200:
        return jsonify({"msg": "Correo de recuperacion enviado."}),200
    else:
        return jsonify({"msg": f"No se ha podido enviar la recuperacion al correo, {response.text}"}),400
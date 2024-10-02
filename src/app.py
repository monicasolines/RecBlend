
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
<<<<<<< HEAD
from flask_cors import CORS
=======
from flask_jwt_extended import JWTManager

>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'your_secret_key'
jwt = JWTManager(app)



CORS(app)
app.url_map.strict_slashes = False

<<<<<<< HEAD



=======
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)  

# database configuration
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///default.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


setup_admin(app)


setup_commands(app)


app.register_blueprint(api, url_prefix='/api')

<<<<<<< HEAD



=======
# Handle/serialize errors like a JSON object
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

<<<<<<< HEAD


=======
# generate sitemap with all your endpoints
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

<<<<<<< HEAD



=======
# any other endpoint will try to serve it like a static file
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  
    return response

<<<<<<< HEAD


=======
# this only runs if `$ python src/main.py` is executed
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
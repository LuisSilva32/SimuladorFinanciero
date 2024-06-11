from flask import Flask # type: ignore
from flask_bcrypt import Bcrypt # type: ignore
from flask_jwt_extended import JWTManager # type: ignore
from flask_cors import CORS # type: ignore
from pymongo import MongoClient # type: ignore
from dotenv import load_dotenv # type: ignore
import os

load_dotenv()

app = Flask(__name__)
app.config.from_object('app.config.Config')

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "PUT", "DELETE"]}})


bcrypt = Bcrypt(app)
# jwt = JWTManager(app)

# Configurar CORS
CORS(app)

# Configurar la conexión a MongoDB
try:
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client[app.config['MONGO_DB_NAME']]
    print("¡Conección a MongoDB exitoso!")
except Exception as e:
    print(f"¡Error al tratar de conectar con MongoDB!: {e}")

# Importar y registrar el blueprint
from app.routes import user_bp
app.register_blueprint(user_bp, url_prefix='/api')

from app.routes import product_bp
app.register_blueprint(product_bp, url_prefix='/api')

# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

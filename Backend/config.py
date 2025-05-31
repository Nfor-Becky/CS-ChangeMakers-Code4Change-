from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///techbridge.db"
app.config['SECRET_KEY'] = 'my-secret-key'

# database configuration
class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
db.init_app(app)

# database migration
migrate = Migrate(app=app, db=db)

# authentication setup
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)
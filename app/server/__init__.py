from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.cache import Cache
from server.views import index
from flask.ext.script import Manager
import pymysql
import os

app = Flask(__name__, static_url_path="/static", static_folder="static")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/swe'
app.config['SQLALCHEMY_DATABASE_URI'] = '{engine}://{username}:{password}@{hostname}/{database}'.format(
	engine='mysql+pymysql',
	username=os.getenv('MYSQL_USER'),
	password=os.getenv('MYSQL_PASSWORD'),
	hostname=os.getenv("MYSQL_HOST"),
	database=os.getenv("MYSQL_DATABASE"))

app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cache = Cache(app,config={'CACHE_TYPE': 'simple'})

app.register_blueprint(index)
db = SQLAlchemy(app)

from server.bin_gamers_api import api
app.register_blueprint(api.blueprint, url_prefix='/api')


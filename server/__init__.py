from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.cache import Cache
from server.views import index
import pymysql

app = Flask(__name__, static_url_path="/static", static_folder="static")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/swe'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://gnbepppvdpjdkn:ewIxRxj-D0iY61AWIVRmbevucs@ec2-54-225-102-116.compute-1.amazonaws.com:5432/d5nkp03mgmgd8v'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://root:password@localhost/swe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cache = Cache(app,config={'CACHE_TYPE': 'simple'})

app.register_blueprint(index)
db = SQLAlchemy(app)
db.configure_mappers()

from server.bin_gamers_api import api
app.register_blueprint(api.blueprint, url_prefix='/api')

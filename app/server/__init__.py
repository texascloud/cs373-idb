from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.cache import Cache
from server.views import index
import os

app = Flask(__name__, static_url_path="/static", static_folder="static")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://gnbepppvdpjdkn:ewIxRxj-D0iY61AWIVRmbevucs@ec2-54-225-102-116.compute-1.amazonaws.com:5432/d5nkp03mgmgd8v'
if os.environ.get('LOCAL_TESTS') is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://root:password@localhost/swe'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://docker:password@pythonwebapp_db/swe'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cache = Cache(app,config={'CACHE_TYPE': 'simple'})

app.register_blueprint(index)
db = SQLAlchemy(app)
# db.configure_mappers()

from server.bin_gamers_api import api
app.register_blueprint(api.blueprint, url_prefix='/api')

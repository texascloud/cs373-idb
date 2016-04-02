import sys
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
# from server import app, db


def setup_db():
    # from server.bin_gamers_api import api
    # from server.views import index

    # app.register_blueprint(api.blueprint, url_prefix='/api')

    db.init_app(app)
    return app

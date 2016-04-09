from server import app, db
from flask import render_template
from flask.ext.script import Manager
from db_setup import db_import, update_year_entries


manager = Manager(app)

@manager.command
def create_db():
	app.config['SQLALCHEMY_ECHO'] = True
	db.create_all()
	db_import()
	update_year_entries()

# @manager.command
# def start():
# 	app.run(host='0.0.0.0', debug=True)

if __name__ == '__main__':
	# app.run(host='192.168.99.100', debug=True)
	manager.run()
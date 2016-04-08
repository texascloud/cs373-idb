#!/usr/bin/python3
from server import app, db

# This is the run harness for our main application whose logic
# is in the 'server' directory.
app.run(host='0.0.0.0', debug=True)

def create_test_db():
	app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://travis@localhost/swe_test'
   	db.create_all()

#!/usr/bin/python3
from server import app, db

# This is the run harness for our main application whose logic
# is in the 'server' directory.
# app = setup_app()
app.run(host='0.0.0.0', debug=True)

# setup_app().run(host='0.0.0.0', debug=True)

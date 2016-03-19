#!flask/bin/python
from app import app

# This is the run harness for our main application whose logic
# is in the 'app' directory.
app.run(debug=True)

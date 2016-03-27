from app import app
from flask import render_template

# Two decorators below creates mapping from URLs / and /hello to this function
@app.route('/')
def splash():
    return render_template('base.html')

@app.route('/static')
def nah():
    return render_template('base.html')

@app.route('/<path:url>')
def static_proxy(url):
    # Send files from directory ./static/
    return render_template('base.html')

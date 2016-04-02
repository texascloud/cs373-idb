from flask import render_template, Blueprint

index = Blueprint('index', __name__)
# Two decorators below creates mapping from URLs / and /hello to this function
@index.route('/')
def splash():
    return render_template('base.html')

@index.route('/<path:url>')
def static_proxy(url):
    # Send files from directory ./static/
    return render_template('base.html')

from app import app

# Two decorators below creates mapping from URLs / and /hello to this function
@app.route('/')
@app.route('/hello')
def hello():
    return "Hello, World!"

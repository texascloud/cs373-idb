from app import app
from flask import render_template

# Two decorators below creates mapping from URLs / and /hello to this function
@app.route('/')
@app.route('/hello')
def hello():
    user = {'nickname': 'Josh'}
    return render_template('splash.html',
                            title='Splash',
                            user=user)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/companies')
def companies():
    return render_template('companies.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/timelines')
def timelines():
    return render_template('timelines.html')

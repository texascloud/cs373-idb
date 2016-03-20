from app import app
from flask import render_template

# Two decorators below creates mapping from URLs / and /hello to this function
@app.route('/')
def splash():
    return render_template('splash.html', home=True)

@app.route('/about')
def about():
    josh = {'name': 'Joshua Hurt',
            'bio': 'I like Austin and CS!',
            'responsibilities': 'Backend mostly.'
           };
    teammates = [ [josh, josh], [josh, josh], [josh] ]
    # teammates = [ [josh, doug], [will, jerry], [james] ]
    return render_template('about.html', teammates=teammates)

@app.route('/companies')
def companies():
    return render_template('companies.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/timelines')
def timelines():
    return render_template('timelines.html')

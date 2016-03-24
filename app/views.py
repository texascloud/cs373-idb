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

@app.route('/companies/<int:company_id>')
def show_single_company(company_id):
    return render_template('company.html', company_id=company_id)

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/games/<int:game_id>')
def show_single_game(game_id):
    return render_template('game.html', game_id=game_id)

@app.route('/years')
def years():
    return render_template('years.html')

@app.route('/years/<int:year_id>')
def show_single_year(year_id):
    return render_template('year.html', year_id=year_id)

from flask import Flask
from app import db
from flask_sqlalchemy import SQLAlchemy

association_table_game_company = db.Table(
        'association_game_company',
        db.Column('game_id', db.Integer, db.ForeignKey('games.game_id')),
        db.Column('company_id', db.Integer, db.ForeignKey('companies.company_id')))

class Game(db.Model):
    """
     This model is used to represent Game entries in our databse. The primary key
     is
    """
    __tablename__ = 'games'
    game_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    genre = db.Column(db.String(120))
    console = db.Column(db.String(20))
    rating = db.Column(db.Float(3))
    year = db.Column(db.Integer, db.ForeignKey('years.year_id'))
    associated_companies = db.relationship("Company", secondary=association_table_game_company, backref=db.backref("games"))

    def __init__(self, name=None, genre=None, console=None, rating=None, year=None):
        self.name = name
        self.genre = genre
        self.console = console
        self.rating = rating
        self.year = year

    def __repr__(self):
        return '<Game: %r>' % (self.name)


class Company(db.Model):
    """

    """
    __tablename__ = 'companies'
    company_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    num_developed = db.Column(db.Integer)
    num_published = db.Column(db.Integer)
    avg_rating = db.Column(db.Float)
    year_founded = db.Column(db.Integer, db.ForeignKey('years.year_id'))
    associated_games = db.relationship("Game", secondary=association_table_game_company, backref=db.backref('companies'))

    def __init__(self, name=None, num_developed=None, num_published=None, avg_rating=None, year_founded=None):
        self.name = name
        self.num_developed = num_developed
        self.num_published = num_published
        self.avg_rating = avg_rating
        self.year_founded = year_founded


    def __repr__(self):
        return '<Company: %r>' % (self.name)

class Year(db.Model):
    """

    """
    __tablename__ = 'years'
    year_id = db.Column(db.Integer, primary_key=True)
    num_games = db.Column(db.Integer)
    most_popular_genre = db.Column(db.String(20))
    avg_rating = db.Column(db.Float)
    games = db.relationship('Game', backref=db.backref('years'))
    companies_founded = db.relationship('Company', backref=db.backref('years'))

    def __init__(self, year_id = None, num_games = None, most_popular_genre = None, avg_rating = None, num_companies_founded = None):
        self.year_id = year_id
        self.num_games = num_games
        self.most_popular_genre = most_popular_genre
        self.avg_rating = avg_rating
        self.num_companies_founded = num_companies_founded

    def __repr__(self):
        return '<Year : %r>' % (self.year_id)
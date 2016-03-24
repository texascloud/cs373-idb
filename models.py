from sqlalchemy import Column, Integer, String, Float, Model
from sqlalchemy.orm import relationship
from yourapplication.database import Base

class Game(Model):
	__tablename__ = 'games'
    game_id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=False)
    genre = Column(String(120), unique=False)
    console = Column(String(20),unique=False)
    rating = Column(Float(3), unique=False)
    year = Column(Integer, ForeignKey('year_id'))
    companies = relationship("Company", secondary=association_table, backref='games')

    def __init__(self, name=None, genre=None, console=None, rating=None, year=None):
     	self.name = name
        self.genre = genre
        self.console = console
        self.rating = rating
        self.year = year

    def __repr__(self):
        return '<Game: %r>' % (self.name)

association_table = Table('association', Base.metadata,
    Column('game_id', Integer, ForeignKey('games.game_id')),
    Column('company_id', Integer, ForeignKey('companies.company_id'))
)

class Company(Model):
	__tablename__ = 'companies'
    company_id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    num_developed = Column(Integer, unique=False)
    num_published = Column(Integer, unique=False)
    avg_rating = Column(Float, unique=False)
    year_founded = Column(Integer, ForeignKey('year_id'))
    games = relationship("Game", secondary=association_table, backref='companies')

    def __init__(self, name=None, num_developed=None, num_published=None, avg_rating=None, year_founded=None):
    	self.name = name
        self.num_developed = num_developed
        self.num_published = num_published
        self.avg_rating = avg_rating
        self.year_founded = year_founded


    def __repr__(self):
        return '<Company: %r>' % (self.name)

class Year(Model):
	__tablename__ = 'years'
	year_id = Column(Integer, primary_key=True)
	num_games = Column(Integer, unique = False)
	most_popular_genre = Column(String(20), unique=False)
	avg_rating = Column(Float, unique=False)
	games = relationship('Game', backref='years')
	companies_founded = relationship('Company', backref='years')

	def __init__(self, year_id = None, num_games = None, most_popular_genre = None, avg_rating = None, num_companies_founded = None):
		self.year_id = year_id
		self.num_games = num_games
		self.most_popular_genre = most_popular_genre
		self.avg_rating = avg_rating
		self.num_companies_founded = num_companies_founded

	def __repr__(self):
		return '<Year : %r>' % (self.year_id)

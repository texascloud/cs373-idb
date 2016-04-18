from sqlalchemy.dialects.postgresql import JSON
from flask.ext.sqlalchemy import SQLAlchemy, BaseQuery
from sqlalchemy_searchable import SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType
from sqlalchemy_searchable import make_searchable, vectorizer
from server import db, app


make_searchable()

@vectorizer(db.Integer)
def integer_vectorizer(column):
    return db.cast(db.func.avals(column), db.String)
# Several empty classes to implement the search functionality for our models
class CompanyQuery(BaseQuery, SearchQueryMixin):
    pass
class GameQuery(BaseQuery, SearchQueryMixin):
    pass
class YearQuery(BaseQuery, SearchQueryMixin):
    pass


association_table_game_company = db.Table(
        'association_game_company',
        db.Column('game_id', db.Integer, db.ForeignKey('games.game_id')),
        db.Column('company_id', db.Integer, db.ForeignKey('companies.company_id')))

association_table_game_genre = db.Table(
        'association_game_genre',
        db.Column('game_id', db.Integer, db.ForeignKey('games.game_id')),
        db.Column('genre_id', db.Integer, db.ForeignKey('genres.genre_id')))

association_table_game_platform = db.Table(
        'association_game_platform',
        db.Column('game_id', db.Integer, db.ForeignKey('games.game_id')),
        db.Column('platform_id', db.Integer, db.ForeignKey('platforms.platform_id')))

def get_game_genre_table():
    return association_table_game_genre 

class Game(db.Model):
    """
    This model is used to represent Company entries in our database.
    Attributes:
    Game_ID - ID of the game object. The ID will self-increment as we add more values into the Game table.
    Name - Name of the game. The IGDB API also pulls information like alternate names for the game, which may be integrated in a future project release.
    Image_URL - The image for the game.
    Rating - The rating the game received. This rating is pulled from IGDB, just like the other information regarding games.
    Release_Year - The year the game had came out.
    Associated_Companies - The companies who developed and published the game. This information will be populated using a combination of the association table and the IGDB API.
    Associated_Genres - The genres associated with the game. Like companies, the information  is populated using an associated table with the data retrieved from the IGDB API.
    Associated_Platforms - The platforms the game was released on. This information is populated using a combination of the association table for platforms and games and the IGDB API.
    """
    query_class   = GameQuery
    __tablename__ = 'games'
    game_id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    rating = db.Column(db.Float(4))
    release_year = db.Column(db.Integer, db.ForeignKey('years.year_id'))
    search_vector = db.Column(TSVectorType('name'))
    associated_companies = db.relationship("Company", secondary=association_table_game_company, backref=db.backref("games"))
    associated_genres = db.relationship("Genre", secondary=association_table_game_genre, backref=db.backref("games"))
    associated_platforms = db.relationship("Platform", secondary=association_table_game_platform, backref=db.backref("games"))

    def __init__(self, id, name=None, image_url=None, rating=0.0, release_year=0, search_vector=None):
        self.game_id = id
        self.name = name
        self.image_url = image_url
        self.rating = rating
        self.release_year = release_year
        self.search_vector = search_vector

    def __repr__(self):
        return '<Game: %r>' % (self.name)


class Company(db.Model):
    """
    This model is used to represent Company entries in our database.
    Attributes:
    ID - ID of the company. This variable self-increments.

    Name - The name of the company.

    Num_developed - The number of games this company has developed.

    Image_url - The company logo from the IGDB API.

    Num_published - The number of games this company has published.

    Avg_rating - The average rating of all the games this company is associated with.

    Year_founded - The year this company was founded.

    Games - The games associated with this company. This data is retrieved using
        the association table.
    """
    query_class   = CompanyQuery
    __tablename__ = 'companies'
    company_id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(50), unique=True)
    num_developed = db.Column(db.Integer)
    num_published = db.Column(db.Integer)
    image_url = db.Column(db.String(255))
    avg_rating = db.Column(db.Float)
    year_founded = db.Column(db.Integer, db.ForeignKey('years.year_id'))
    search_vector = db.Column(TSVectorType('name'))
    associated_games = db.relationship("Game", secondary=association_table_game_company, backref=db.backref('companies'))

    def __init__(self, company_id, name=None, num_developed=0, image_url="", num_published=0, avg_rating=0.0, year_founded=None, search_vector=None):
        self.company_id = company_id
        self.name = name
        self.num_developed = num_developed
        self.image_url = image_url
        self.num_published = num_published
        self.avg_rating = avg_rating
        self.year_founded = year_founded
        self.search_vector = search_vector


    def __repr__(self):
        return '<Company: %r>' % (self.name)

class Year(db.Model):
    """
    This model is used to represent Year entries in our database.
    Attributes:
    Year_id - ID of the year object. Because a year number is unique, the year_id is
        equivalent to the year. For example, the year 1998 would have a year_id of
        1998 as well.

    Num_games - The number of games released for the given year.

    Most_popular_genre - The most popular genre for the given year. For example,
        if 100 out of 150 games in the year 2000 were "RPG", then the most popular
        genre would be the "RPG" genre.

    Avg_rating - The average rating of all games for the given year.

    Num_companies_founded - The number of companies that were founded this specific year.
    """
    __tablename__ = 'years'
    year_id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    num_games = db.Column(db.Integer)
    most_popular_genre = db.Column(db.String(100))
    avg_rating = db.Column(db.Float)
    games = db.relationship('Game', backref=db.backref('years'))
    companies_founded = db.relationship('Company', backref=db.backref('years'))

    def __init__(self, year_id=0, num_games=None, most_popular_genre=None, avg_rating=None, num_companies_founded=None):
        self.year_id = year_id
        self.num_games = num_games
        self.most_popular_genre = most_popular_genre
        self.avg_rating = avg_rating
        self.num_companies_founded = num_companies_founded

    def __repr__(self):
        return '<Year : %r>' % (self.year_id)


class Genre(db.Model):
    """
    The table which corresponds genre names to a specific genre ID.
    Attributes:
    Genre_id - The ID of the genre which acts as the primary key.
    
    Genre_Name - The name of the genre.
    """
    __tablename__ = 'genres'
    genre_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    genre_name = db.Column(db.String(100))

    def __init__(self, genre_name=None):
        self.genre_name = genre_name

    def __repr__(self):
        return '<Genre : %s>' % (self.genre_name)

class Platform(db.Model):
    """
    The table which stores the platform names with a platform ID.
    Attributes:
    Platform_id - The ID for the platform which is also the primary key.

    Platform_Name - The name of the platform.
    """
    __tablename__ = 'platforms'
    platform_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    platform_name = db.Column(db.String(100))

    def __init__(self, platform_name=None):
        self.platform_name = platform_name

    def __repr__(self):
        return '<Platform : %s>' % (self.platform_name)
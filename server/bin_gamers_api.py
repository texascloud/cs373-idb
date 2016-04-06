from flask import Blueprint
from flask_restful import Api, Resource
from server import db
from server import models
api = Api(Blueprint('api', __name__)) # pylint: disable=invalid-name

@api.resource('/companies')
class CompaniesAPI(Resource):
    @staticmethod
    def get():
        Company = models.Company
        q = Company.query.all()
        #TODO: YEAR FOUNDED
        return [ { 
                "company_id" : c.company_id,
                "name" : c.name,
                "num_developed" :  c.num_developed,
                "num_published" : c.num_published,
                "avg_rating" : float("%.2f" % c.avg_rating) 
                } for c in q]

@api.resource('/companies/<int:company_id>')
class CompanyAPI(Resource):
    @staticmethod
    def get(company_id):
        Company = models.Company
        c = Company.query.filter_by(company_id = company_id).first()
        if not c:
            return []
        #TODO: YEAR FOUNDED
        return [{ 
                "company_id" : c.company_id,
                "name" : c.name,
                "num_developed" :  c.num_developed,
                "num_published" : c.num_published,
                "avg_rating" : float("%.2f" % c.avg_rating) 
                }]

@api.resource('/games')
class GamesAPI(Resource):
    @staticmethod
    def get():
        Game = models.Game
        q = Game.query.all()
        return [{
                "game_id" : g.game_id,
                "name" : g.name,
                #"genre" : q.genre,
                #"console" : q.console,
                "rating" : float("%.2f" % g.rating) if g.rating else None,
                "year" : g.release_year
            } for g in q]

@api.resource('/games/<int:game_id>')
class GameAPI(Resource):
    @staticmethod
    def get(game_id):
        Game = models.Game
        g = Game.query.filter_by(game_id = game_id).first()
        if not g:
            return []
        return [{
                "game_id" : game_id,
                "name" : g.name,
                #"genre" : q.genre,
                #"console" : q.console,
                "rating" : float("%.2f" % g.rating) if g.rating else None,
                "year" : g.release_year
        }]

@api.resource('/years')
class YearsAPI(Resource):
    @staticmethod
    def get():
        Year = models.Year
        q = Year.query.all()
        return [{ 
                "year_id" : y.year_id,
                "num_games" : y.num_games,
                "most_popular_genre" : y.most_popular_genre,
                "avg_rating" : float("%.2f" % y.avg_rating) if y.avg_rating else None,
                #"num_companies_founded" : y.num_companies_founded
        } for y in q]

@api.resource('/years/<int:year_id>')
class YearAPI(Resource):
    @staticmethod
    def get(year_id):
        Year = models.Year
        y = Year.query.filter_by(year_id = year_id).first()
        if not y:
            return []
        return [{ 
                "year_id" : year_id,
                "num_games" : y.num_games,
                "most_popular_genre" : y.most_popular_genre,
                "avg_rating" : float("%.2f" % y.avg_rating) if y.avg_rating else None,
                #"num_companies_founded" : y.num_companies_founded
        }]

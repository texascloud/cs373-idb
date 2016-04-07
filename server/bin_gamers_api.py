from flask import Blueprint
from flask_restful import Api, Resource
from server import models
api = Api(Blueprint('api', __name__)) # pylint: disable=invalid-name

@api.resource('/companies')
class CompaniesAPI(Resource):
    @staticmethod
    def get():
        Company = models.Company
        q = Company.query.all()
        return [ { 
                "company_id" : c.company_id,
                "name" : c.name,
                "num_developed" :  c.num_developed,
                "num_published" : c.num_published,
                "avg_rating" : float("%.2f" % c.avg_rating) if c.avg_rating else None,
                "year_founded" : c.year_founded
                } for c in q]

@api.resource('/companies/<int:company_id>')
class CompanyAPI(Resource):
    @staticmethod
    def get(company_id):
        Company = models.Company
        c = Company.query.filter_by(company_id = company_id).first()
        if not c:
            return []
        return [{ 
                "company_id" : c.company_id,
                "name" : c.name,
                "num_developed" :  c.num_developed,
                "num_published" : c.num_published,
                "avg_rating" : float("%.2f" % c.avg_rating) if c.avg_rating else None,
                "year" : c.year_founded,
                "games_to_url" : { i.name : ("games/" + str(i.game_id)) for i in c.associated_games}
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
                "genres" : [i.genre_name for i in g.associated_genres],
                "platforms" : [i.platform_name for i in g.associated_platforms],
                "companies" : [i.name for i in g.associated_companies],
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
                "genres" : [i.genre_name for i in g.associated_genres],
                "platforms" : [i.platform_name for i in g.associated_platforms],
                "companies_to_url" : {i.name : ("companies/" + str(i.company_id)) for i in g.associated_companies},
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
                "num_games" : len(y.games),
                "most_popular_genre" : y.most_popular_genre,
                "avg_rating" : float("%.2f" % y.avg_rating) if y.avg_rating else None,
                "num_companies_founded" : len(y.companies_founded)
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
                "companies_to_url" : {i.name : ("companies/" + str(i.company_id)) for i in y.companies_founded},
                "games_to_url" : {i.name : ("games/" + str(i.game_id)) for i in y.games}
        }]

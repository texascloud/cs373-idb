from flask import Blueprint
from flask_restful import Api, Resource
api = Api(Blueprint('api', __name__)) # pylint: disable=invalid-name

@api.resource('/companies')
class CompaniesAPI(Resource):
    @staticmethod
    def get():
        return { "companies" : 'no id' }

@api.resource('/companies/<int:company_id>')
class CompanyAPI(Resource):
    @staticmethod
    def get(company_id):
        return { "company_id" : company_id }

@api.resource('/games')
class GamesAPI(Resource):
    @staticmethod
    def get():
        return { "games" : 'no id'}

@api.resource('/games/<int:game_id>')
class GameAPI(Resource):
    @staticmethod
    def get(game_id):
        return { "game_id" : game_id }

@api.resource('/years')
class YearsAPI(Resource):
    @staticmethod
    def get():
        return { "years" : 'no id' }

@api.resource('/years/<int:year_id>')
class YearAPI(Resource):
    @staticmethod
    def get(year_id):
        return { "year_id" : year_id }

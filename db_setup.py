import requests
import pprint
import re
from statistics import mean
from server import db
from server.models import Game, Company, Year, Genre, Platform, get_game_genre_table
from sqlalchemy.sql import func


genre_cache = []
# {id: 0}
company_cache = set()
header = {"token" : "Sl8Jkh1lYZKydQjStnUFa_sjrlO5bbUxWYwuaKyDk50", "offset": 0}


year_cache = []

def db_import():
	global year_cache
	global header
	db.drop_all()
	db.configure_mappers()
	db.create_all()

	game_cache = [g.game_id for g in Game.query.all()]
	platform_cache = []


	# GAME DATA PULLING
	#	data: id, name, release_date

	url = "https://www.igdb.com/api/v1/games"

	r = requests.get(url, params = header)
	j = r.json()

	# while len(j["games"]) > 0:
	while header["offset"] < 100:

		# pp = pprint.PrettyPrinter(indent = 4)
		# pp.pprint(j)
		games = j["games"]
		# loop through games
		for game in games:
			game_id = game["id"]
			if(game_id not in game_cache):
				game_cache += [game_id]
				name = game["name"]
				release_year = int((re.split("-", game["release_date"]))[0])

				#check year cache before adding a new year
				if(release_year not in year_cache):
					y = Year(release_year)
					db.session.add(y)
					year_cache += [release_year]

				url_specific_game = "https://www.igdb.com/api/v1/games/" + str(game_id)
				r = requests.get(url_specific_game, params = header)

				#get specific game information
				game_info = r.json()["game"]

				#image
				image_url = None
				if("cover" in game_info and "url" in game_info["cover"]):
					image_url = "https:" + game_info["cover"]["url"]

				#rating
				rating = 0.0
				if("rating" in game_info):
					rating = game_info["rating"]



				g = Game(id=game_id, name=name, image_url=image_url, rating=rating, release_year=release_year)

				#loop through platforms
				for v in game_info["release_dates"]:
					c = None
					platform = v["platform_name"]
					if platform not in platform_cache:
						platform_cache += [platform]
						c = Platform(platform)
						db.session.add(c)
					else:
						c = Platform.query.filter_by(platform_name = platform).first()
					g.associated_platforms.append(c)

				if "genres" not in game_info:
					continue

				add_genres(game_info["genres"], g)

				add_companies(game_info["companies"], g)

				#add game
				db.session.add(g)
				db.session.commit()


		r = requests.get(url, params = header)
		j = r.json()
		header["offset"] += 25




def update_year_entries():
	years = Year.query.all()
	for year_entry in years:
		year_entry.num_games = Game.query.filter_by(release_year = year_entry.year_id).count()
		# print("ASDSADASD")
		# print(type(Game.query.filter_by(release_year=year_entry)))
		# print("ASDASDADA")
		games = Game.query.filter_by(release_year = year_entry.year_id).all()
		ratings = [game.rating for game in games if game.rating is not None]
		if(len(ratings) != 0):
			# print(type(mean(ratings)))
			year_entry.avg_rating = mean(ratings)
		popular_genre_query = db.session.query(Genre, func.count(Genre.genre_id).label("count")).join(get_game_genre_table()).join(Game).filter(Game.release_year == year_entry.year_id).group_by(Genre).order_by("count DESC").all()
		if(len(popular_genre_query) > 0):
			year_entry.most_popular_genre = popular_genre_query[0][0].genre_name
		db.session.commit()

def add_genres(genres, game):
	global genre_cache
	for genre in genres:
		genre_name = genre["name"]
		genre_to_add = None
		if genre_name not in genre_cache:
			genre_cache += [genre_name]
			genre_to_add = Genre(genre_name)
			db.session.add(genre_to_add)
		else:
			genre_to_add = Genre.query.filter_by(genre_name = genre_name).first()
		game.associated_genres.append(genre_to_add)

def add_companies(companies, game):
	global company_cache
	global year_cache
	for company in companies:
		c={}
		company_to_update = None
		company_id = company["id"]
		if company_id in company_cache:
			company_to_update = Company.query.filter_by(company_id = company_id).first()
			if company["developer"]:
				company_to_update.num_developed += 1
			if company["publisher"]:
				company_to_update.num_published += 1
			db.session.commit()
		else:
			company_cache.add(company_id)
			c["company_id"] = company_id
			c["name"] = company["name"]
			c["num_developed"] = 1 if company["developer"] else 0
			c["num_published"] = 1 if company["publisher"] else 0
			url_specific_company = "https://www.igdb.com/api/v1/companies/" + str(company_id)
			r = requests.get(url_specific_company, params = header)
			company_info = r.json()["company"]
			if "founded_year" in company_info:
				year = company_info["founded_year"]
				c["year_founded"] = year

				if(year not in year_cache):
					y = Year(year)
					db.session.add(y)
					year_cache+= [year]

			if "average_rating" in company_info:
				c["avg_rating"] = company_info["average_rating"]
			else:
				c["avg_rating"] = 0.0

			if "company_logo" in company_info:
				c["image_url"] = "https:" + company_info["company_logo"]["url"]
			company_to_update = Company(**c)
			db.session.add(company_to_update)

		game.associated_companies.append(company_to_update)

db_import()
update_year_entries()

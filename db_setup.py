import requests
import pprint
import re
from server import db
from server.models import Game, Company, Year, Genre, Platform



def db_import():
	db.create_all()

	year_cache = [y.year_id for y in Year.query.all()]
	game_cache = [g.game_id for g in Game.query.all()]

	header = {"token" : "Sl8Jkh1lYZKydQjStnUFa_sjrlO5bbUxWYwuaKyDk50", "offset": 0}

	# GAME DATA PULLING
	#	data: id, name, release_date

	url = "https://www.igdb.com/api/v1/games"

	r = requests.get(url, params = header)
	j = r.json()

	# while len(j["games"]) > 0:
	# while offset < 200
	# 	header["offset"] += 25

	# pp = pprint.PrettyPrinter(indent = 4)
	# pp.pprint(j)
	games = j["games"]
	for game in games:
		game_id = game["id"]
		if(game_id not in game_cache):
			game_cache += [game_id]
			name = game["name"]
			release_year = int((re.split("-", game["release_date"]))[0])

			if(release_year not in year_cache):
				y = Year(release_year)
				db.session.add(y)
				year_cache+= [release_year]

			url_specific_game = "https://www.igdb.com/api/v1/games/" + str(game_id)
			r = requests.get(url_specific_game, params = header)

			game_info = r.json()["game"]

			image_url = None
			if("cover" in game_info and "url" in game_info["cover"]):
				image_url = "https" + game_info["cover"]["url"]
			rating = None
			if("rating" in game_info):
				rating = game_info["rating"]
			g = Game(id=game_id, name=name, image_url=image_url, rating=rating, release_year=release_year)
			db.session.add(g)
			db.session.commit()


db_import()

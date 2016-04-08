import requests
import pprint
import MySQLdb

header = {"token" : "Sl8Jkh1lYZKydQjStnUFa_sjrlO5bbUxWYwuaKyDk50", "offset": 0}

# GAME DATA PULLING
#	data: id, name, release_date

url = "https://www.igdb.com/api/v1/games"

r = requests.get(url, params = header)
j = r.json()

# while len(j["games"]) > 0:
# while offset < 200
	# header["offset"] += 25

# pp = pprint.PrettyPrinter(indent = 4)
# pp.pprint(j)


# for now, just pull the first 25 games to work with '''
db = MySQLdb.connect(host = "localhost", user = "root",
	password = "password", db = "swe")

cursor = db.cursor()

q = "INSERT INTO tblGames (game_id, name, release_date) VALUES " \
	"({}, {}, {})"

games_list = [(g["id"], g["name"], g["release_date"]) for g in games]
print games_list
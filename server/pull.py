import requests
import pprint
from server import db

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


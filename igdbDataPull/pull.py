import requests
import pprint

header = {"token" : "Sl8Jkh1lYZKydQjStnUFa_sjrlO5bbUxWYwuaKyDk50", "offset": 0}
url = "https://www.igdb.com/api/v1/games"


r = requests.get(url, params = header)
j = r.json()

''' for now, just pull the first 25 games to work with '''

# while len(j["games"]) > 0:
# while offset < 200
	# header["offset"] += 25

pp = pprint.PrettyPrinter(indent = 4)
pp.pprint(j)

#!/usr/bin/python3
import os
from unittest import main, TestCase


from server import app, db
# Maybe not the below one just yet
# from app.models import User

from server.models import Game, Company, Year, get_game_genre_table, Platform, Genre

class TestCase(TestCase):
    # -------------------
    # setup test server
    # -------------------
    def setUp(self):
        app.config['TESTING'] = True
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://travis@localhost/swe_test'
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/swe_test'
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:password@localhost/swe_test'

        self.app = app.test_client()
        self.endpoints = []
        self.endpoints.append('/games')
        self.endpoints.append('/games/1')
        self.endpoints.append('/companies')
        self.endpoints.append('/companies/1234')
        self.endpoints.append('/years')
        self.endpoints.append('/years/1995')

        self.api_endpoints = ['/api'+x for x in self.endpoints]

        # Below two added after making api_endpoints because these
        # are not api endpoints
        self.endpoints.append('/')
        self.endpoints.append('/about')
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # -------------------
    # test splash page
    # -------------------
    # Make sure connection to each page is successful
    def test_page_connection(self):
        for endpoint in self.endpoints:
            with self.subTest():
                res = self.app.get(endpoint)
                self.assertEqual('200 OK', res.status)


    # Make sure connection to each API endpoint is successful
    def test_api_page_connection1(self):
        for endpoint in self.api_endpoints:
            with self.subTest():
                res = self.app.get(endpoint)
                self.assertEqual('200 OK', res.status)

    # Make sure JSON is returned from a GET on each API endpoint
    def test_api_page_connection2(self):
        for endpoint in self.api_endpoints:
            with self.subTest():
                res = self.app.get(endpoint)
                self.assertTrue('json' in res.mimetype, 'culprit: {}'.format(endpoint))


    # TESTS FOR MODELS
            # id, name, image-url, rating, release_year

    def test_games_1(self):
        y = Year(2008)
        db.session.add(y)
        g = Game(1, "Fallout 3", rating = 87, release_year = 2008)
        db.session.add(g)
        db.session.commit()
        q = Game.query.all()
        self.assertEqual(len(q), 1)
        db.session.remove()

    def test_games_2(self):
        y = Year(2008)
        db.session.add(y)
        g = Game(1, "Fallout 3", rating = 87, release_year = 2008)
        db.session.add(g)
        db.session.commit()
        self.assertTrue(g in db.session) # https://pythonhosted.org/Flask-Testing/
        db.session.remove()

    def test_games_3(self):
        y = Year(2008)
        db.session.add(y)
        g = Game(1,"Fallout 3", rating = 87, release_year = 2008)
        y2 = Year(2004)
        db.session.add(y2)
        g2 = Game(2,"TES IV: Oblivion", rating = 100, release_year = 2004)
        db.session.add(g)
        db.session.add(g2)
        db.session.commit()
        q = Game.query.all()
        self.assertEqual(len(q), 2)
        db.session.remove()

    #(self, company_id, name=None, num_developed=None, image_url=None, num_published=None, avg_rating=None, year_founded=None)
    def test_company_1(self):
        y = Year(1986)
        db.session.add(y)
        c = Company(1,"Bethesda Softworks", 11, None, 66, 8.9, 1986)
        db.session.add(c)
        db.session.commit()
        self.assertTrue(c in db.session)
        db.session.remove()

    def test_company_2(self):
        y = Year(1986)
        db.session.add(y)
        c = Company(1, "Bethesda Softworks", 11, None, 66, 8.9, 1986)
        y2 = Year(1994)
        db.session.add(y2)
        c2 = Company(2, "Blizzard Entertainment", 20, None, 40, 9, 1994)
        y3 = Year(1980)
        db.session.add(y3)
        c3 = Company(3, "Activision", 10, None, 1000, 6, 1980)
        db.session.add(c)
        db.session.add(c2)
        db.session.add(c3)
        db.session.commit()
        q = Company.query.all()
        self.assertEqual(len(q), 3)
        db.session.remove()

    def test_company_3(self):
        y = Year(1986)
        db.session.add(y)
        c = Company(1, "Bethesda Softworks", 11, None, 66, 8.9, 1986)
        c2 = Company(2, "Bethesda Softworks", 11, None, 66, 8.9, 1986)
        db.session.add(c)
        self.assertTrue(c in db.session)
        self.assertFalse(c2 in db.session)
        db.session.remove()

        #Years year_id = None, num_games = None, most_popular_genre = None, avg_rating = None, num_companies_founded = None
    def test_year_1(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        db.session.add(y)
        db.session.commit()
        q = Year.query.all()
        self.assertEqual(y, q[0])
        db.session.remove()

    def test_year_2(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        y2 = Year(1990, 200, "Platformer", 10, 50)
        db.session.add(y)
        db.session.add(y2)
        db.session.commit()
        self.assertTrue(y2 in db.session)
        db.session.remove()

    # q is a list sorted in asc order by primary key (year_id in this case)
    def test_year_3(self):
        y = Year(2007, 5000, "FPS", 9.6, 1000)
        y2 = Year(2008, 2000, "FPS", 9.5, 500)
        y3 = Year(1999, 1000, "Fighting", 8.0, 400)
        db.session.add(y)
        db.session.add(y2)
        db.session.add(y3)
        q = Year.query.all()
        self.assertEqual(q[0].year_id, y3.year_id)
        db.session.remove()


    #Years year_id = None, num_games = None, most_popular_genre = None, avg_rating = None, num_companies_founded = None
    def test_year_api_1(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        db.session.add(y)
        db.session.commit()
        q = Year.query.all()
        self.assertEqual(y, q[0])
        db.session.remove()

    def test_year_api_2(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        y2 = Year(1990, 200, "Platformer", 10, 50)
        db.session.add(y)
        db.session.add(y2)
        db.session.commit()
        self.assertTrue(y2 in db.session)
        db.session.remove()

    # q is a list sorted in asc order by primary key (year_api_id in this case)
    def test_year_api_3(self):
        y = Year(2007, 5000, "FPS", 9.6, 1000)
        y2 = Year(2008, 2000, "FPS", 9.5, 500)
        y3 = Year(1999, 1000, "Fighting", 8.0, 400)
        db.session.add(y)
        db.session.add(y2)
        db.session.add(y3)
        q = Year.query.all()
        self.assertEqual(q[0].year_id, y3.year_id)
        db.session.remove()


    def test_platform_1(self):
        p = Platform("Xbox 360")
        db.session.add(p)
        db.session.commit()
        q = Platform.query.all()
        self.assertEqual(q[0].platform_name, "Xbox 360")
        db.session.remove()

    def test_platform_2(self):
        p = Platform("Xbox 360")
        db.session.add(p)
        p2 = Platform("PC")
        db.session.add(p2)
        db.session.commit()
        q = Platform.query.filter_by(platform_id=2).all()
        self.assertEqual(q[0].platform_name, "PC")
        db.session.remove()

    def test_platform_3(self):
        p = Platform("Xbox 360")
        db.session.add(p)
        p2 = Platform("PC")
        db.session.add(p2)
        p3 = Platform("PS3")
        db.session.add(p3)
        q = Platform.query.filter_by(platform_name="PS3").all()
        self.assertEqual(q[0].platform_id, 3)
        db.session.remove()

    def test_platform_4(self):
        p = Platform("Xbox 360")
        db.session.add(p)
        p2 = Platform("PC")
        db.session.add(p2)
        p3 = Platform("PS3")
        db.session.add(p3)
        q = Platform.query.all()
        self.assertEqual(len(q), 3)
        db.session.remove()

    def test_get_genre_table_1(self):
        game_genre_table = get_game_genre_table()
        q = db.session.query(game_genre_table).all()
        self.assertEqual(len(q), 0)
        db.session.remove()


if __name__ == '__main__':
    main()

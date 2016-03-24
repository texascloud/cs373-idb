#!/usr/bin/python3
import os
from unittest import main, TestCase


# from config import basedir
from app import app
from flask import url_for
# Maybe not the below one just yet
# from app.models import User

from models import Game, Company, Year, db

class TestCase(TestCase):
    # -------------------
    # setup test server
    # -------------------
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
        # Dynamically gather all defined endpoints. No need to update ever! :D
        self.endpoints = []
        self.endpoints.append('/')
        self.endpoints.append('/about')
        self.endpoints.append('/games')
        self.endpoints.append('/games/1')
        self.endpoints.append('/companies')
        self.endpoints.append('/companies/1234')
        self.endpoints.append('/years')
        self.endpoints.append('/years/1995')

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
                req = self.app.get(str(endpoint))
                self.assertEqual('200 OK', req.status)


    # TESTS FOR MODELS
        # Game name=None, genre=None, console=None, rating=None, year=None
    def test_games_1(self):
        g = Game("Fallout 3", ["RPG", "Shooter"], ["PS3", "Xbox 360", "PC"], rating = 87, year = 2008)
        db.session.add(g)
        db.session.commit()
        q = Game.query.all()
        assertEqual(len(q), 1)
        db.session.remove()

    def test_games_2(self):
        g = Game("Fallout 3", ["RPG", "Shooter"], ["PS3", "Xbox 360", "PC"], rating = 87, year = 2008)
        db.session.add(g)
        db.session.commit()
        assertTrue(user in db.session) # https://pythonhosted.org/Flask-Testing/
        db.session.remove()

    def test_games_3(self):
        g = Game("Fallout 3", ["RPG", "Shooter"], ["PS3", "Xbox 360", "PC"], rating = 87, year = 2008)
        g2 = Game("TES IV: Oblivion", ["RPG"], ["PS3", "Xbox 360", "PC"], rating = 100, year = 2004)
        db.session.add(g)
        db.session.add(g2)
        db.session.commit()
        q = Game.query.all()
        assertEqual(len(q), 2)
        db.session.remove()

        # Company  name=None, num_developed=None, num_published=None, avg_rating=None, year_founded=None
    def test_company_1(self):
        c = Company("Bethesda Softworks", 11, 66, 8.9, 1986)
        db.session.add(c)
        db.session.commit()
        assertTrue(c in db.session)
        db.session.remove()

    def test_company_2(self):
        c = Company("Bethesda Softworks", 11, 66, 8.9, 1986)
        c2 = Company("Blizzard Entertainment", 20, 40, 9, 1994)
        c3 = Company("Activision", 10, 1000, 6, 1980)
        db.session.add(c)
        db.session.add(c2)
        db.session.add(c3)
        db.session.commit()
        q = Company.query.all()
        assertEqual(len(q), 3)
        db.session.remove()

    def test_company_3(self):
        c = Company("Bethesda Softworks", 11, 66, 8.9, 1986)
        db.session.add(c)
        assertFalse(c in db.session)
        db.session.remove()

        #Years year_id = None, num_games = None, most_popular_genre = None, avg_rating = None, num_companies_founded = None
    def test_year_1(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        db.session.add(y)
        db.session.commit()
        q = Year.query.all()
        assertEqual(y, q[0])
        db.session.remove()

    def test_year_2(self):
        y = Year(1997, 2000, "FPS", 9, 100)
        y2 = Year(1990, 200, "Platformer", 10, 50)
        db.session.add(y)
        db.session.add(y2)
        db.session.commit()
        assertTrue(y2 in db.session)
        db.session.remove()

    def test_year_3(self):
        y = Year(2007, 5000, "FPS", 9.6, 1000)
        y2 = Year(2008, 2000, "FPS", 9.5, 500)
        y3 = Year(1999, 1000, "Fighting", 8.0, 400)
        db.session.add(y)
        db.session.add(y2)
        db.session.add(y3)
        q = Year.query.all()
        assertEqual(q[2], y3.year_id)
        db.session.remove()

if __name__ == '__main__':
    main()

#!flask/bin/python
import os
from unittest import main, TestCase

# from config import basedir
from app import app
# Maybe not the below one just yet
# from app.models import User

class TestCase(TestCase):
    # -------------------
    # setup test server
    # -------------------
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()


    # -------------------
    # test splash page
    # -------------------
    # Make sure connection to splash page is successful
    def test_splash_page1(self):
        req = self.app.get('/')
        self.assertEqual('200 OK', req.status)

if __name__ == '__main__':
    main()

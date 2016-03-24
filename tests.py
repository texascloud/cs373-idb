#!/usr/bin/python3
import os
from unittest import main, TestCase

# from config import basedir
from app import app
from flask import url_for
# Maybe not the below one just yet
# from app.models import User

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


    # -------------------
    # test splash page
    # -------------------
    # Make sure connection to each page is successful
    def test_page_connection(self):
        for endpoint in self.endpoints:
            with self.subTest():
                req = self.app.get(str(endpoint))
                self.assertEqual('200 OK', req.status)

if __name__ == '__main__':
    main()

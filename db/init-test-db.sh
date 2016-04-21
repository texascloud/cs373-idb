#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "docker" swe<<-EOSQL
    CREATE DATABASE swe_test;
    GRANT ALL PRIVILEGES ON DATABASE swe_test TO docker;
EOSQL
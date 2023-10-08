#!/bin/bash

# check if the port parameter is provided, otherwise default to port 9000
port="${1:-9000}"

# make necessary migrations
python3.10 manage.py makemigrations
python3.10 manage.py migrate

# run the server on specified port
python3.10 manage.py runserver 0.0.0.0:"$port"

#!/bin/sh
docker-compose build
docker-compose run --rm angular npm install
docker-compose run --rm angular ng build --prod
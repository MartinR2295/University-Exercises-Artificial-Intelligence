#!/bin/sh
git add .
git reset --hard
git pull
./deploy.sh
#!/bin/sh
cd ..
git add .
git reset --hard
git pull
cd cellular_path_finding
./deploy.sh
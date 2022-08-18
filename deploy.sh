#!/bin/bash
cd app
pm2 start npm -- start
pm2 reload 0 --name backend
cd frontend
pm2 start npm -- start
pm2 reload 1 --name frontend
cd ../../

#!/bin/sh

cd /app/api

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8080
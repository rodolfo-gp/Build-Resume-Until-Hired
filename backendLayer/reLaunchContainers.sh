#!/bin/bash

# Shut down the current Docker Compose setup
docker-compose down

# Rebuild and start the containers in detached mode
docker-compose up --build -d

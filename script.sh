#!/bin/bash

# check
check () {
if [ ! -f ".env" ]; then
    echo "Error: environment file .env does not exist."
    exit
fi
}

if [[ $1 == "build" ]]; then
    check
    docker-compose --env-file .env --file docker-compose.yml build
elif [[ $1 == "start" ]]; then
    check
    docker-compose --env-file .env --file docker-compose.yml up -d
    # docker-compose exec backend python manage.py migrate
elif [[ $1 == "stop" ]]; then
    check
    docker-compose --env-file .env --file docker-compose.yml down
elif [[ $1 == "clean" ]]; then
    # clean
    docker rmi itss2_pomodoro-frontend
    docker rmi itss2_pomodoro-backend
    docker rmi itss2_pomodoro-nginx
    docker rmi itss2_pomodoro-database
    docker rmi phpmyadmin/phpmyadmin
    docker rmi mysql:latest
elif [[ $1 == "fclean" ]]; then
    # full clean
    docker system prune --all --force
else
    echo ""
    echo "Usage: $0 build|start|stop|clean|fclean"
    echo ""
    echo "       build  :: build or rebuild services, aka docker images"
    echo "       start  :: create and start containers in the background"
    echo "       stop   :: stop and remove services, aka docker containers"
    echo "       clean  :: remove containers and unused data"
    echo "       fclean :: remove all containers and images, also unused images"
    echo ""
fi

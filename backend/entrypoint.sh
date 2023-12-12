#!/bin/bash
RUN_PORT="8000"

python manage.py collectstatic --no-input

RET=1
until [ ${RET} -eq 0 ]; do
    python manage.py migrate
    RET=$?
    sleep 5
done

gunicorn backend.wsgi:application --bind "0.0.0.0:${RUN_PORT}"

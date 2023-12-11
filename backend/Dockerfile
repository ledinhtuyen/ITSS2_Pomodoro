FROM python:latest

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .
RUN pip install -U pip
RUN pip install --no-cache-dir -r requirements.txt
RUN mv .env.example .env
RUN python manage.py makemigrations

RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
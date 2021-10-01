#!/bin/bash
FROM python:3.6.9
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SECRET_KEY=ep*17&b(&!z*3v=tm1m=(hczzf7m7_3k_bf!c%-%sj=xx5g6lw
ENV MYSQL_HOST=cgo-db-dev.c5dt4l4pj3zh.ap-southeast-1.rds.amazonaws.com
ENV MYSQL_DB=test_db
ENV MYSQL_USERNAME=author
ENV MYSQL_PASSWORD=abc123456!
ENV MYSQL_PORT=3306
ENV CORS_ORIGIN_WHITELIST=http://localhost:3000,http://0.0.0.0:3000,http://127.0.0.1:3000,http://10.17.40.104:3000,http://cgo-mkt-ui.s3-website-ap-southeast-1.amazonaws.com,http://cgo-airflow-alb-889584478.ap-southeast-1.elb.amazonaws.com:9000,http://custom-audience.centraldigitalmarketing.com,http://max.centraldigitalmarketing.com

RUN mkdir /app
RUN mkdir /app/api
WORKDIR /app/api

COPY ./mini_blog /app/api/mini_blog
COPY ./sertis_api /app/api/sertis_api
COPY ./manage.py /app/api/manage.py
COPY ./requirements.txt /app/api/requirements.txt
COPY ./startup.sh /app/api/startup.sh

RUN chmod 777 /app/api/startup.sh
RUN chmod 777 /app/api/manage.py


RUN pip install -r requirements.txt

EXPOSE 8080/tcp

ENTRYPOINT ["/app/api/startup.sh"]


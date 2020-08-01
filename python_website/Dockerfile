FROM python:3

LABEL version="1.0"
LABEL org.sgnn7.name="python_webserver"

ENV SRV_PATH=/srv/www/html

RUN apt-get update -q && \
    apt-get dist-upgrade -y

EXPOSE 8000

RUN mkdir -p ${SRV_PATH} && \
    groupadd -r -g 350 pythonsrv && \
    useradd -r -m -u 350 -g 350 pythonsrv

VOLUME ${SRV_PATH}/external

WORKDIR ${SRV_PATH}

COPY test.txt ${SRV_PATH}

ADD https://raw.githubusercontent.com/moby/moby/master/README.md ${SRV_PATH}/

RUN chown -R pythonsrv:pythonsrv ${SRV_PATH}

USER pythonsrv

CMD  ["python3", "-m", "http.server"]
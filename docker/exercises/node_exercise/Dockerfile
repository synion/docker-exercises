FROM ubuntu:latest

RUN apt-get update -q && \
  apt-get upgrade -y


ENV DISTRO = "$(lsb_release -s -c)"

ARG NODE_VERSION
ENV VERSION=$NODE_VERSION

RUN apt-get install curl -y && \
  apt-get install gnupg -y
RUN curl -sL https://deb.nodesource.com/setup_${VERSION} | bash

RUN apt-get install nodejs -y && \
  npm install yarn -g -y

RUN node -v &&\
  npm -v &&\
  yarn --version


FROM ruby:2.5.1

RUN apt-get update -q && \
  apt-get dist-upgrade -y && \
  apt-get clean && \
  apt-get autoclean

ENV WORKSPACE_PATH = /ruby_script/

RUN mkdir -p ${WORKSPACE_PATH} && \
  groupadd -r -g  350 rubycl && \
  useradd -r -m -u 350 -g 350 rubycl

RUN chown rubycl:rubycl ${WORKSPACE_PATH}

COPY . ${WORKSPACE_PATH}

USER rubycl

WORKDIR ${WORKSPACE_PATH}/

EXPOSE 3333

RUN gem install bundle && \
  bundle install 

CMD [ "ruby", "sample_script.rb" ]
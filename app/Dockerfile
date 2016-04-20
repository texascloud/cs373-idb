FROM python:3.4

ENV PYTHONUNBUFFERED 1

ADD . /src

WORKDIR /src

RUN pip install -r requirements.txt

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

ADD ./package.json /production/package.json
RUN npm install -g npm
RUN npm install

CMD gunicorn app:app -b 0.0.0.0:8000

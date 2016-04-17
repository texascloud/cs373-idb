FROM python:3.4
WORKDIR /production

ADD ./requirements.txt /production/requirements.txt
RUN pip install -r requirements.txt

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

ADD ./package.json /production/package.json
RUN npm install -g npm
RUN npm install

ADD . /production
ENTRYPOINT ["python"]

EXPOSE 5000

CMD ["/production/run.py"]

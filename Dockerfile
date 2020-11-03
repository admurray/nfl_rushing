FROM ubuntu:20.04
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install -y python3 nodejs npm python3-pip supervisor
RUN mkdir -p /rushing_nfl /var/log/supervisor

WORKDIR /rushing_nfl/

COPY db.sqlite3 /rushing_nfl/
COPY manage.py /rushing_nfl/
COPY requirements.txt /rushing_nfl/
COPY rushing /rushing_nfl/rushing
COPY rushingclient /rushing_nfl/rushingclient
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN pip3 install -r /rushing_nfl/requirements.txt
RUN npm install --prefix /rushing_nfl/rushingclient/
RUN python3 /rushing_nfl/manage.py migrate

EXPOSE 8000
EXPOSE 3000

CMD ["/usr/bin/supervisord"]
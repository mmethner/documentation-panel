FROM grafana/grafana:3.1.1

MAINTAINER "Mathias Methner <mathiasmethner@gmail.com>"

ADD . /data/plugins/grafana-documentation-panel/

ADD demo.json /data/dashboards/

ENV GF_DASHBOARDS_JSON_ENABLED true
ENV GF_DASHBOARDS_JSON_PATH /data/dashboards/

ENTRYPOINT ["/usr/sbin/grafana-server", "--homepath=/usr/share/grafana", "--config=/etc/grafana/grafana.ini", "cfg:default.paths.data=/var/lib/grafana", "cfg:default.paths.logs=/var/log/grafana"]

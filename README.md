The documentation-panel is based on the buildin grafana text-panel

![Screenshot](https://raw.githubusercontent.com/mmethner/documentation-panel/master/src/img/documentationt-panel.png)

# Installation

Just clone the documentation-panel repository to your 
grafana plugin dir. See [official documentation](http://docs.grafana.org/plugins/installation/) 
for more information.

```
git clone https://github.com/mmethner/documentation-panel.git
sudo service grafana-server restart
```

# Changelog

## 0.0.1

First working version as example how to extend the text panel.
See https://groups.io/g/grafana/message/2236

# Testing

First build:

```
npm install
grunt
```

To start grafana with a local copy run

```
docker build -t documentation-panel .
docker run -p3000:3000 documentation-panel
```

Login with admin:admin

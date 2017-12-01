'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var YAML = require('json2yaml');

var app = express();
var port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log('@.@ Express server listening on port ' + port);
});

app.post('/json2yaml', function(req, res) {	
	console.log(req.body);
	var result = YAML.stringify(req.body);
	console.log(result);
	res.send(result);
});
#!/usr/bin/env node
"use strict";

var express = require("express"),
  cors = require('cors'),
  config = require("config"),
  koop = require('koop')( config ),
  acs = require('koop-acs');

//register providers with koop 
koop.register( acs ); 

// create an express app
var app = express();
app.use( cors() );

// add koop middleware
app.use( koop );

app.get('/status', function(req, res){
  res.json( koop.status );
});

app.set('view engine', 'ejs');

// serve the index
app.get("/", function(req, res, next) {
  res.render(__dirname + '/views/index');
});

app.listen(process.env.PORT || config.server.port,  function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});


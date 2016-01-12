"use strict";

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request"),
    ccap = require("ccap");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/app/"));


app.get("/captcha",function(req,res){

});

app.post("/query",function(req,res){

});
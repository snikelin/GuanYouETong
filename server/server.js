/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var phantom = require("phantom"),
    express = require("express"),
    app = express();

app.use(express.static(__dirname+"/app/"));

app.get("/pdf/:entryNo/:dutyId",function(){

});
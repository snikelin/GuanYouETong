/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var generator = require("./pdfGenerator"),
    dataService = require("./dataService"),
    express = require("express"),
    app = express();

app.use(express.static(__dirname + "/app/"));

app.get("/pdf/:entryNo/:dutyId", function (req, res) {
    dataService.query(req.params.entryNo, req.params.dutyId)
        .then(function (data) {
            return generator.getPDF(data);
        })
        .then(function(fileUrl){
            res.sendFile(fileUrl,function(err){
                throw err;
            })
        })
        .catch(function(err){
            res.status(500).json(err);
        });
});
app.get("/pdf", function (req, res) {
    dataService.query("CI000877481JP", "PD5147201410000007")
        .then(function (data) {
            return generator.getPDF(data);
        })
        .then(function(fileUrl){
            res.sendFile(fileUrl,function(err){
                throw err;
            })
        })
        .catch(function(err){
            res.status(500).json(err);
        });
});
generator.init().then(function () {
    app.listen(3006);
    console.log("server listening on 3006");
});
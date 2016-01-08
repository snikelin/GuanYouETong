/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var generator = require("./pdfGenerator"),
    dataService = require("./dataService"),
    stamper = require("./stamper"),
    express = require("express"),
    app = express();

app.use(express.static(__dirname + "/app/"));

app.get("/pdf/:entryNo/:dutyId", function (req, res) {
    dataService.query(req.params.entryNo, req.params.dutyId)
        .then(function (data) {
            return generator.getPDF(data);
        })
        .then(function (fileUrl) {
            stamper.stamp(fileUrl,function(err,outfile){
                if(!err) {
                    res.sendFile(outfile, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        fs.unlinkSync(fileUrl);
                        fs.unlinkSync(outfile);
                    })
                }

            });

        })
        .catch(function (err) {
            res.status(500).json(err);
        });
});
app.get("/pdf", function (req, res) {
    dataService.query("CI000877481JP", "PD5147201410000007")
        .then(function (data) {
            return generator.getPDF(data);
        })
        .then(function (fileUrl) {

            stamper.stamp(fileUrl,function(err,outfile){
                if(!err) {
                    res.sendFile(outfile, function (err) {
                        if (err) {
                            console.error(err);
                        }
                        fs.unlinkSync(fileUrl);
                        fs.unlinkSync(outfile);
                    })
                }

            });
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        });
});
generator.init().then(function () {
    app.listen(3006);
    console.log("server listening on 3006");
});

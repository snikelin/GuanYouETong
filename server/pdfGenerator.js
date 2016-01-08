/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var phantom = require("phantom"),
    jade = require("jade"),
    path = require("path"),
    fs = require("fs"),
    temp = require("temp");



var compile = jade.compileFile(path.join(__dirname, "templates", "JG47.jade"), {pretty: true, cache: true});

var paperSize = {
    width: '22cm',
    height: '15cm',
    margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
    }
};

var viewportSize = {
    width: 1024,
    height: 768
};

var session;
var createPhantomSession = function () {
    if (session) {
        return Promise.resolve(session);
    }
    return new Promise(function (resolve, reject) {
        phantom.create({}, function (_session) {
            session = _session;
            resolve(session);
        });
    });
};

process.on('exit', function (code, signal) {
    console.log("cleaning up phantom");
    if (session) {
        session.exit();
    }
});

var renderPdf = function (content) {
    return new Promise(function (resolve, reject) {
        var filename = temp.path({
            prefix: "pdfgen",
            suffix: ".pdf"
        });


        var page;

        try {
            session.createPage(function (_page) {

                page = _page;
                page.set('paperSize', paperSize);
                page.set('viewportSize', viewportSize);
                page.setContent(content, null);
                page.render(filename, function (err) {
                    if(err) {
                        console.log("render err:",err);
                        return reject(err);
                    }
                    page.close();
                    page = null;
                    resolve(filename);
                });
            })
        } catch (e) {
            try {
                if (page != null) {
                    page.close();
                }
            } catch (ex) {
                return reject(ex);
            }
            return reject(e);
        }
    });
};

function PDFGenerator() {

}

PDFGenerator.init = function () {
    return createPhantomSession();
};

PDFGenerator.getPDF = function (contents) {
    var html = compile(contents);
    //console.log(html);
    return renderPdf(html);
};

PDFGenerator.getHtml = function (contents) {
    var html = compile(contents);
    return Promise.resolve(html);
};


module.exports = PDFGenerator;

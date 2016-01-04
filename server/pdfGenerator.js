/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var phantom = require("phantom"),
    jade = require("jade"),
    path = require("path"),
    fs = require("fs"),
    temp = require("temp");

temp.track();

// TODO: render stylus in-time
var compile = jade.compileFile(path.join(__dirname,"templates","JG47.jade"),{pretty: true,cache: true});

var paperSize = {
    width: '18cm',
    height: '12cm',
    margin: {
        top: '0mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
    }
};

var session;
var createPhantomSession = function(){
    if(session) {
        return new Promise.resolve(session);
    }
    return new Promise(function(resolve,reject){
        phantom.create({},function(_session){
            session = _session;
            resolve(session);
        });
    });
};

process.on('exit',function(code,signal){
    console.log("cleaning up phantom");
    if(session){
        session.exit();
    }
});

var renderPdf = function(content) {
    return new Promise(function(resolve,reject){
        temp.open({
            prefix: "pdfgen",
            suffix: ".pdf"
        },function(err,fileInfo){
            if(err) {
                return reject(err);
            }
            var page;

            try {
                session.createPage(function(_page){
                    page = _page;
                    page.set('paperSize',paperSize);
                    page.setContent(content,null);
                    page.render(fileInfo.path,function(){
                        page.close();
                        page = null;
                        resolve(fileInfo.path);
                    });
                })
            } catch(e) {
                try {
                    if(page != null) {
                        page.close();
                    }
                } catch(ex){
                    return reject(ex);
                }
                return reject(e);
            }
        });
    });
};

function PDFGenerator() {

}

PDFGenerator.init = function(){
    return createPhantomSession();
};

PDFGenerator.getPDF = function(contents){
    var html = compile(contents);
    //console.log(html);
    return renderPdf(html);
};


module.exports = PDFGenerator;
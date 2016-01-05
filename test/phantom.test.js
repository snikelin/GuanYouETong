/**
 * Created by beeven on 1/4/2016.
 */
var system = require("system"),
    fs = require("fs");

var scriptUrl = system.args[0];
var absScriptUrl = fs.absolute(scriptUrl);
var absDirectory = absScriptUrl.substring(0,absScriptUrl.lastIndexOf('/'));
var templateUrl = "file:///" + absDirectory + "/../server/templates/JG47.html";

var page = require("webpage").create();
page.paperSize = {
    width: '18cm',
    height: '12cm',
    //header: {
    //    height: '5mm',
    //    contents: phantom.callback(function(pageNum,numPages){
    //        return "test";
    //    })
    //},
    margin: {
        top: '0mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
    }
};

page.open(templateUrl,function(status){
    console.log("Status:" + status);
    if(status==="success") {
        page.render(absDirectory + "/../server/templates/JG47.pdf");
        page.close();
    }
        phantom.exit();
});
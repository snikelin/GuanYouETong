/**
 * Created by beeven on 1/4/2016.
 */

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
page.open("file:///d:/dev/GuanYouETong/server/templates/JG47.html",function(status){
    console.log("Status:" + status);
    if(status==="success") {
        page.render("d:/dev/GuanYouETong/server/templates/JG47.pdf");
        page.close();
    }
        phantom.exit();
});
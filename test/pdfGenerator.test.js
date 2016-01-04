/**
 * Created by beeven on 1/4/2016.
 */

var generator = require("../server/pdfGenerator");

generator.init().then(function(){
    return generator.getPDF({})
}).then(function(filename){
    console.log(filename);
});
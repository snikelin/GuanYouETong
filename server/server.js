/**
 * Created by beeven on 1/4/2016.
 */
"use strict";

var generator = require("./pdfGenerator"),
    express = require("express"),
    app = express();

app.use(express.static(__dirname+"/app/"));

app.get("/pdf/:entryNo/:dutyId",function(){
	
});
app.get("/pdf",function(req, res){
	generator.getPDF({}).then(function(file){
		res.sendFile(file,function(){
			console.log("file sent")
		})
	},function(err){
		console.error(err);
		res.status(500).json(err);
	})
});
generator.init().then(function(){
	app.listen(3006);
	console.log("server listening on 3006");
})
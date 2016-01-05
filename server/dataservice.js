"use strict";
/*
var soap = require("soap");


var url = "http://172.7.1.243:3000/GuanYouETong/WebService/QueryPersonalDuty.asmx?wsdl";

var client;

exports.init = function(){
	return new Promise(function(resolve,reject){
		soap.createClient(url,function(err,_client){
			if(err) {
				console.error(err);
				return reject(err);
			}
			client = _client;
			resolve(client);
		});

	});
}

exports.query = function(entryNo, dutyId) {
	if(!client){
		return new Promise.reject("Service not initialized");
	}
	return new Promise(function(resolve,reject){
		client.QueryPersonalDutyWeb({entryNo:entryNo,dutyId:dutyId},function(err, result){
			if(err){ return reject(err);}
			resolve(result);
		});
	});
}
*/

var request = require("request");

var url = "http://172.7.1.243:3000/GuanYouETong/WebService/QueryPersonalDutyWcf.svc/query";

exports.query = function(entryNo, dutyId) {
	return new Promise(function(resolve,reject){
		request.get(`${url}/${entryNo}/${dutyId}`,function(err,res,body){
			if(err) { console.error(err); return reject(err);}
			body = JSON.parse(body);
			if(body.Status === "OK") {
				resolve(JSON.parse(body.Paper));
			} else {
				reject("not found");
			}
		});
	});
};

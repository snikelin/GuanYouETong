"use strict";

var request = require("request"),
    moment = require("moment");

var url = "http://172.7.1.243:3000/GuanYouETong/WebService/QueryPersonalDutyWcf.svc/query";

const units = ["", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿"];
const mapChars = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

function chineseUppercase(num) {
    if(num <= 0) {
        return null;
    }
    num = Math.floor(num * 100);
    var fen = num % 10;
    fen = fen > 0 ? mapChars[fen] + "分" : "";
    num = Math.floor(num/10);
    var jiao = num % 10;
    jiao = jiao > 0 ? mapChars[jiao] + "角" : "";
    num = Math.floor(num/10);
    var yuan = "";
    var unitCounter = 0;
    var lastDigit = 0;
    while (num > 0) {
        var digit = num % 10;
        if (digit > 0) {
            yuan = mapChars[digit] + units[unitCounter] + yuan;
        } else if (lastDigit !== 0) {
            yuan = mapChars[0] + yuan;
        }
        lastDigit = digit;
        num = Math.floor(num/10);
        unitCounter++;
    }
    yuan += "圆" + jiao + fen;
    return yuan;
};

function chineseDate(date) {
    return moment(date).locale("zh-CN").format("LL");
}

exports.query = function (entryNo, dutyId) {
    return new Promise(function (resolve, reject) {
        request.get(`${url}/${entryNo}/${dutyId}`, function (err, res, body) {
            if (err) {
                console.error(err);
                return reject(err);
            }
            body = JSON.parse(body);
            if (body.Status === "OK") {
                var paper = JSON.parse(body.Paper);
                paper.dutyId = dutyId;
                paper.PostValueFact = chineseUppercase(paper.PostValueFact);
                paper.CreateDate = chineseDate(paper.CreateDate);
                while(paper.GListInfo.length < 7) {
                    paper.GListInfo.push({GNo: null,
                        GName: null,
                        GQty: null,
                        TradeTotal: null,
                        PostRate: null,
                        PostValue: null})
                }
                resolve(paper);

            } else {
                reject("not found");
            }
        });
    });
};

exports.chineseUppercase = chineseUppercase;


var dataservice = require("../service/dataService");
var should = require("should");

describe("dataService",function(){
    describe("chineseUppercase",function(){
        var chineseUppercase = dataservice.chineseUppercase;

        it("should convert ￥1 to 壹圆",function(){
            chineseUppercase(1).should.equal("壹圆");
        });

        it("should convert ￥100 to 壹佰圆",function(){
            chineseUppercase(100).should.equal("壹佰圆");
        });

        it("should convert ￥101 to 壹佰零壹圆",function(){
            chineseUppercase(101).should.equal("壹佰零壹圆");
        });

        it("should convert ￥1001 to 壹仟零壹圆",function(){
            chineseUppercase(1001).should.equal("壹仟零壹圆");
        });

        it("should convert ￥12003 to 壹万贰仟零三圆",function(){
            chineseUppercase(12003).should.equal("壹万贰仟零叁圆");
        });

        it("should convert ￥12003.5 to 壹万贰仟零三圆伍角",function(){
            chineseUppercase(12003.5).should.equal("壹万贰仟零叁圆伍角");
        });

        it("should convert ￥12003.56 to 壹万贰仟零三圆伍角陆分",function(){
            chineseUppercase(12003.56).should.equal("壹万贰仟零叁圆伍角陆分");
        });

        it("should convert ￥12003.567 to 壹万贰仟零三圆伍角陆分",function(){
            chineseUppercase(12003.567).should.equal("壹万贰仟零叁圆伍角陆分");
        });

        it("should return null if input <= 0",function(){
            should(chineseUppercase(-1)).be.Null();
        })
    });
});
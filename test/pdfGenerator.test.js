/**
 * Created by beeven on 1/4/2016.
 */

var generator = require("../server/pdfGenerator");

generator.init().then(function () {
    return generator.getPDF({
            GListInfo: [{
                GNo: 1,
                GName: '生活用品',
                GQty: 1,
                TradeTotal: 3000,
                PostRate: 0.1,
                PostValue: 300
            },
                {
                    GNo: 2,
                    GName: 'ddd',
                    GQty: 1,
                    TradeTotal: 200,
                    PostRate: 0.1,
                    PostValue: 20
                }],
            RecvName: 'no.name',
            RecvAdress: 'huizhoushi.henanan11haoxiaoqu.hanhejingu2haolou2305',
            PostValueFact: 320,
            Creater: 'Create',
            CreateDate: '2014-08-28T11:49:33.6'
        });
}).then(function (filename) {
    console.log(filename);
})
    .catch(function(err){
    console.log(err);
});
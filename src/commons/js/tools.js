/*
* 公共方法库文件
*/

import Vue from 'vue';
import Mock from 'mockjs';
// 1. 表单验证工具函数

Vue.prototype.$validate=function(options){

}

// 时间格式化函数
    // 输入格式为标准日期格式
    // 输出格式为yyyy-MM-dd
function forMateDate(p){
    let dt=new Date(p);
    let year=dt.getFullYear();
    let month=dt.getMonth()+1;
    let date=dt.getDate();
    return year+'-'+(month<10?('0'+month):month)+'-'+(date<10?('0'+date):date);
};

/*const Random = Mock.Random;

Mock.setup({
    timeout: '200-600'
});*/

// Mock.mock(/raiseLimit\/batchSwipeQuery/g,'post',{
// 	'data|1-10': [{
// 		'id|+1': 1,
// 		'creditCardId':()=>Random.natural( 0, 80 ),
// 		'raiseLimitPlansId': ()=>Random.natural( 0, 8000 ),
// 		'merchantId': 2,
//         'clientName':'@cname',
// 		'bank':()=>{return Random.cword( 4 )+'银行'},
// 		'cardNo':()=>Random.string( 'number', 17 ),
// 		'unpaidSwipeAmount':()=>Random.float(60, 100, 2,2),
// 		'unpaidAmount':()=>Random.float(60, 100, 2,2),
// 		'swipeAmount':()=>Random.float(60, 100, 2,2),
// 		'mccClassId': 2,
// 		'timeStatus':()=>Random.natural( 0, 80 ),
// 		'status':()=>Random.natural( 0, 3 ),
// 		'finishTime':()=>Random.datetime('yyyy.MM.dd  HH:mm:ss'),
// 		'isSelected':()=>Random.boolean(1, 9, true),
// 		'merchantName':()=>{ return Random.cword( 3 )+'-'+Random.cword( 3 )},
// 		'consumeState':()=>Random.natural( 0, 2 ),
// 		'tradeTime':()=>{return Random.natural( 0, 23 )+':'+Random.natural( 0, 59 )+':'+Random.natural( 0, 59 )},
//     }]
// });
// Mock.mock(/raiseLimit\/batchRepaymentQuery/,'post',{
// 	'data|1-30': [{
// 		'creditCardId': ()=>Random.natural( 0, 8000 ),
// 		'raiseLimitPlansId': ()=>Random.natural( 0, 8000 ),
//         'clientName':'@cname',
// 		'bank':()=>{return Random.cword( 4 )+'银行'},
// 		'cardNo':()=>Random.string( 'number', 17 ),
// 		'unpaidSwipeAmount':()=>Random.float(60, 100, 2,2),
// 		'unpaidAmount':()=>Random.float(60, 100, 2,2),
// 		'repaidAmount':()=>Random.float(60, 100, 2,2),
// 		'timeStatus':()=>Random.natural( 0, 80 ),
// 		'status':()=>Random.natural( 0, 2 ),
// 		'finishedAt':()=>Random.datetime('yyyy.MM.dd  HH:mm:ss'),
// 		// 'isSelected':()=>Random.boolean(1, 9, true),
// 		// 'merchant':()=>{ return Random.cword( 3 )+'-'+Random.cword( 3 )},
// 		// 'consumeState':()=>Random.natural( 0, 2 ),
// 		// 'tradeTime':()=>{return Random.natural( 0, 23 )+':'+Random.natural( 0, 59 )+':'+Random.natural( 0, 59 )},
//     }]
// });
// Mock.mock(/raiseLimit\/batchRepaymentConfirmation/,'post',{
// 	'data|1-30': [{
// 		'creditCardId': ()=>Random.natural( 0, 8000 ),
// 		'raiseLimitPlansId': ()=>Random.natural( 0, 8000 ),
//         'clientName':'@cname',
// 		'bank':()=>{return Random.cword( 4 )+'银行'},
// 		'cardNo':()=>Random.string( 'number', 17 ),
// 		'unpaidSwipeAmount':()=>Random.float(60, 100, 2,2),
// 		'unpaidAmount':()=>Random.float(60, 100, 2,2),
// 		'repaidAmount':()=>Random.float(60, 100, 2,2),
// 		'timeStatus':()=>Random.natural( 0, 80 ),
// 		'status':()=>Random.natural( 0, 2 ),
// 		'finishedAt':()=>Random.datetime('yyyy.MM.dd  HH:mm:ss'),
// 		// 'isSelected':()=>Random.boolean(1, 9, true),
// 		// 'merchant':()=>{ return Random.cword( 3 )+'-'+Random.cword( 3 )},
// 		// 'consumeState':()=>Random.natural( 0, 2 ),
// 		// 'tradeTime':()=>{return Random.natural( 0, 23 )+':'+Random.natural( 0, 59 )+':'+Random.natural( 0, 59 )},
//     }]
// });


// Mock.mock(/raiseLimit\/batchSwipeConfirmation/g,'post',function(options){
// 	sessionStorage.setItem('swipes',options.body.swipes)
// 	console.log(options.body)
// 	// console.log(JSON.parse(options.body.swipes))
// 	return {
// 		'code': '0000',
// 		'swipePlanCertification': 5266273
// 	}
// });

// Mock.mock(/raiseLimit\/batchSwipePollingStatus/g,'post',function(options){
// 	console.log(options)
// 	if(options.body.swipePlanCertification == 5266273){

// 	}
// });

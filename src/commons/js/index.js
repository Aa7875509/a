import Vue from 'vue';
import $ from 'jquery';
import sha from 'sha1';

var devUrl = 'http://alpha_api.wapvi.cn/';//内侧地址
var testUrl = 'http://beta_api.dan99.cc/';//公测地址
var proUrl = 'http://hc.glget.com/';//生产地址

/************************************/
/*dev ajax方式获取token*/
function getToken() {//--ajax-token--
    var data = {
        phone: "11111111111",
        password: "123456",
        accountVerification: "40BD001563085FC35165329EA1FF5C5ECBDBBEEF",
    }
    // 内测环境下
    data.sign = sign(data)
    data.sign += '&v1:' + '11111111111:' + '40BD001563085FC35165329EA1FF5C5ECBDBBEEF'
    data.sign = sha(data.sign);
    localStorage.setItem('accountVerification','40BD001563085FC35165329EA1FF5C5ECBDBBEEF')
    $.ajax({
        url: devUrl + 'login',
        type: 'post',
        traditional: true,
        dataType: 'json',
        data: data,
        success: function (r) {
            if (r.code != '0000') {
                console.error('----接 口 错 误 信 息 : ' + r.msg + ' ===>  ' + this.url);
            };
            localStorage.setItem("token", r.token);
            localStorage.setItem("openId", r.openId);
        },
        error: function (r) { }
    });
}

/*登录超时检出*/
function loginOut(msg) {
    ipcRenderer.send('app-loginOut',msg);
};

//直接调用取token【不管之前的token是否失效】
getToken();

function sign(obj) {
    var arr = [];
    for (var key in obj) {
        var ff = {};
        ff[key] = obj[key];
        arr.push(ff);
    }
    arr.sort(function (obj1, obj2) {
        return Object.keys(obj1)[0] > Object.keys(obj2)[0] ? 1 : -1;
    });
    //arr.sort()
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][Object.keys(arr[i])[0]] || arr[i][Object.keys(arr[i])[0]] === 0){
            str = str + Object.keys(arr[i])[0] + '=' + arr[i][Object.keys(arr[i])[0]] + '&';
        }

    }
    return str.substr(0, str.length - 1);
}
var self = this;
var loginOutStatus = true
Vue.prototype.$ajax = function (options) {

        //console.log("token未取到。。。");
        //getToken();

    if(!window.navigator.onLine){
        this.$alert('您的网络已经断开', '提示', {
            confirmButtonText: '确定',
          });
          return
    }
    var dt = Object.assign({}, options.data, { 'token': localStorage.getItem("token"), });
    //console.log("'"+Date.now()+"ajax':"+localStorage.getItem("token"));
    // var arr = JSON.stringify(dt).split(',').sort()
    // var sing = arr.join('')
    //以下为公测和生产环境
    //发送的数据加上openID，排序后sha加密，作为sign字段的值
    var signData = sign(options.data)
    signData += '&' + localStorage.getItem("openId") + '&' + localStorage.getItem("accountVerification")
    dt.sign = sha(signData);
    //console.log(localStorage.getItem("url"))
    //console.log(signData)
    return $.ajax({
        url: devUrl + options.url,//--dev-context--
        //url: localStorage.getItem("url") + "/" + options.url,//--test-context--
        type: 'POST',
        traditional: true,
        dataType: 'json',
        data: dt,
        //headers: { Token: '34567898765' },
        // headers: {
        //     "token": "678979",
        //     // 'Access-Control-Request-Method': 'post',
        //     // 'Access-Control-Request-Headers': 'token'
        // },
        //beforeSend: function(xhr){xhr.setRequestHeader('HTTP_TOKEN', localStorage.getItem("token"));},//这里设置header
        success: options.success,
        error: function (XMLHttpRequest, textStatus,errorThrown ) {
            //console.log(XMLHttpRequest.getAllResponseHeaders())
            Message({
                showClose: true,
                message: XMLHttpRequest.statusText + errorThrown+ ':' + options.url,
                type: 'error'
            });
        },
        dataFilter: function (data) {
            let r = JSON.parse(data);
            if (r.code == '3002') {
                /*console.error(//--global-serverError--
                    '接口错误\t:\n' +
                    'Url\t\t\t: ' + this.url + '\n' +
                    'RequestData\t: ' + JSON.stringify(dt) +'\n' +
                    'Msg\t\t\t: ' + r.msg + '\n' +
                    'Code\t\t: ' + r.code + '\n' +
                    'Error\t\t: ' + r.error + '\n'
                 );//--global-serverError--*/
                if(loginOutStatus){
                    loginOut('您超过30分钟未操作，请重新登录');
                    loginOutStatus = false
                }


            } else if (r.code == '3003') {

                loginOut('帐号在另外一个地方登录，您已经掉线，若非本人操作，请修改密码后登录');

            };
            return data;
        }
    })
};


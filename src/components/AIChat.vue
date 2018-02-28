<template>
    <div class="AIChat">
        <div class="container_title">
            <div  class="container_title_div"></div>
            <el-button type="primary"  @click="dtuichu" style="float: right; margin-top: 10px;margin-right: 100px;" size="small" plain>退出登陆</el-button>
        </div>
        <div id="convo" data-from="Sonu Joshi">
            <ul class="chat-thread">
            </ul>
        </div>
        <div>
            <div style="width:50%;margin: 15px auto;">
                <el-input ref="int" placeholder="请输入内容" v-model="input">
                    <template slot="append"><span @click="determine(input)">发 送（Enter）</span></template>
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
        input:'',
        pags:0,
        ids:1,
        };
    },
    mounted(){
        var v = this;
        $(document).keypress(function(e) {
			var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (eCode == 13){
				v.determine(v.input);
				//自己写判断操作
			}
		});
    },
    methods: {
       //成功提示
        open(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        //失败提示
        open1(msg) {
            this.$message.error(msg);
        },
        dtuichu(){
            this.$router.push('/')
        },
        determine(input){
            var v = this;
            if(!input){
                return
            }
            $(".chat-thread").append(' <li class="right">'+input+'</li>');
            var str = $("li.right:last").height();
            String.prototype.str = function () {
                return this.substr(0, this.length - 2);
            }
            console.log('ziuo',str)
            v.pags=v.pags+str+52;
            $(".chat-thread").animate({scrollTop:v.pags}, 100); 
            v.ajaxapi(input)
        },
        ajaxapi(input){
             var v = this;
             $.ajax({
                url:"http://www.tuling123.com/openapi/api",
                data:{
                    key:'2e86dfbe64f0480497b9db30e455318f',
                    info:input,
                    userid:localStorage.getItem('uuid'),
                },
                success:function(r){
                    console.log(r)
                   if(r.code=='100000'){
                        v.input='';
                        $(".chat-thread").append(' <li class="lift">'+r.text+'</li>');
                        v.heighttop();
                        
                   }else if(r.code=='200000'){
                        v.input='';
                        $(".chat-thread").append(' <li class="lift">'+r.text+'</li>');
                        window.open(r.url); 
                        v.heighttop();
                   }else if(r.code=='302000'){
                       v.input='';
                        var html=''
                       for (let index = 0; index < r.list.length; index++) {
                          html+='<p><a href="'+r.list[index].detailurl+'" >'+r.list[index].article+'</a></p><p>'+r.list[index].source+'</p><img  src="'+r.list[index].icon+'"/>' ;
                       }
                        $(".chat-thread").append(' <li class="lift">'+r.text+html+'</li>');
                        v.heighttop();
                   }else if(r.code=='308000'){
                       v.input='';
                       var html=''
                       for (let index = 0; index < r.list.length; index++) {
                          html+='<p><a href="'+r.list[index].detailurl+'" >'+r.list[index].name+'</a></p><img  src="'+r.list[index].icon+'"/><p>'+r.list[index].info+'</p>';
                       }
                        $(".chat-thread").append(' <li class="lift">'+r.text+html+'</li>');
                        v.heighttop();
                   }
                }
            });
        },
        js_method(url){
            window.open(url); 
        },
        heighttop(){
             var v = this;
            var str = $("li.lift:last").height();
            String.prototype.str = function () {
                return this.substr(0, this.length - 2);
            }
            v.pags=v.pags+str+52;
            $(".chat-thread").animate({scrollTop:v.pags}, 100); 
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.1);
    }

    ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
    }

    .chat-thread {
    margin: 24px auto 0 auto;
    padding: 15px;
    list-style: none;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 2px solid #e4e7ed;
    
    }

    .chat-thread li {
    position: relative;
    clear: both;
    display: inline-block;
    padding: 16px 40px 16px 20px;
    margin: 0 0 20px 0;
    font: 16px/20px 'Noto Sans', sans-serif;
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
    }

    /* Chat - Avatar */
    .chat-thread li:before {
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    content: '';
    }

    /* Chat - Speech Bubble Arrow */
    .chat-thread li:after {
    position: absolute;
    top: 15px;
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid rgba(25, 147, 147, 0.2);
    }

    .chat-thread .right {
    animation: show-chat-odd 0.15s 1 ease-in;
    -moz-animation: show-chat-odd 0.15s 1 ease-in;
    -webkit-animation: show-chat-odd 0.15s 1 ease-in;
    float: right;
    margin-right: 80px;
    color: #0AD5C1;
    }

    .chat-thread .right:before {
    right: -80px;
    background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTAA/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8wre0/w55qLLqM62ysMrEWAdh+PSl8M6fFLMbu5K7YziNT3b1/CqniRLq98UA2SlhHGobnA55FdbajHmZwxTnLlRtm78NabDGhs/tEwchmVfMGD0znvn0pqahoN3fCH+z0RcHcWiKY4745/KuUVtTtdSFtJCvmxHmN+317Gp5dTthGZXUSXPJJVsh1PUH1rP2rZt7GKOi1LwxHIv2jRg20jPks4b64b+h/OuZZWRyrqVZTggjBBrZ0PWftFwkA8xImTpu7gVJr1kpX7UhzJ0cZ5I9a0umtDJxcWYVFFFBJ1WlKkOmQASYyoYjZnk81aukuLHTP7YFtDeW6zJEFmyu4555H8PQemaz9NmR9PhO45C7T+HFa1rrk9iwSZ3vLJU+WyaVUCsDncMjJI64H41riYRVHmS7E4KbliOWT7nPePtPvbm8j1trWSyF3GpkgkYEbl4BBHTjHBrn49GkfRLnUpn2tBgtFj76k4GD/e749K63xb4gtdTtp4LeRismGVyOmDnpWBq2pXd74ZsdPjG2GCTdHDEnzSN/ebHLH+VeXBuyR7E4wu35EXhKKObVCRnMKMwY+hwAPz5rrJ7bzYXTfu3Ag5yKwfC+nNZvcPPJHvdQDGnJjOehPTPsOlb0zLFA8m/hVJ/SvXo0oundnhV6slU5UcjRRRXPY3Luk3giYwSHCscqfetfULXOlR3TXIhZ2ZYfLILHHDkjsO3PJPSuXqeC5aPzd5ZjIQdxOcEDFa+0fJyEKmvac5myyQWJlRZnkkTHytjoeuPepLaa9vi4ib7LbOMyFG5KjtnrVMabPd30gcrCjMSZGPQf1NbF0i29pHBAUlbABVT8pPqSOwrljDW53c+lrl/RWxvymyDAWPjsPSpdVnVF8iNsk8tz0HpVFLloowEYvJjBkIwB7AdhUGSxJJyT1JrpU2o8py1IwlJS6hRS0VAiKiiikUKKUUUUxC0ooooAKKKKQH/2Q==);
    }

    .chat-thread .right:after {
    border-right: 15px solid transparent;
    right: -15px;
    }

    .chat-thread .lift {
    animation: show-chat-even 0.15s 1 ease-in;
    -moz-animation: show-chat-even 0.15s 1 ease-in;
    -webkit-animation: show-chat-even 0.15s 1 ease-in;
    float: left;
    margin-left: 80px;
    color: #0EC879;
    }

    .chat-thread .lift:before {
    left: -80px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENEI1NDJDMzQxRUExMUU2QUUzQjg5NkFFQzhDNTZEMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENEI1NDJDNDQxRUExMUU2QUUzQjg5NkFFQzhDNTZEMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ0QjU0MkMxNDFFQTExRTZBRTNCODk2QUVDOEM1NkQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ0QjU0MkMyNDFFQTExRTZBRTNCODk2QUVDOEM1NkQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qr12oAAAEYRJREFUeNrsXXl4VNd1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);
    background-size: 100% 100%;
    }

    .chat-thread .lift:after {
    border-left: 15px solid transparent;
    left: -15px;
    }

    .chat-window {
    position: fixed;
    bottom: 18px;
    }

    .chat-window-message {
    width: 100%;
    height: 48px;
    font: 32px/48px 'Noto Sans', sans-serif;
    background: none;
    color: #0AD5C1;
    border: 0;
    border-bottom: 1px solid rgba(25, 147, 147, 0.2);
    outline: none;
    }

    /* Small screens */
    @media all and (max-width: 767px) {
    .chat-thread {
        width: 90%;
        height: 260px;
    }

    .chat-window {
        left: 5%;
        width: 90%;
    }
    }
    /* Medium and large screens */
    @media all and (min-width: 768px) {
    .chat-thread {
        width: 50%;
        height: 320px;
    }

    .chat-window {
        left: 25%;
        width: 50%;
    }
    }
    @keyframes show-chat-even {
    0% {
        margin-left: -480px;
    }

    100% {
        margin-left: 0;
    }
    }
    @-moz-keyframes show-chat-even {
    0% {
        margin-left: -480px;
    }

    100% {
        margin-left: 0;
    }
    }
    @-webkit-keyframes show-chat-even {
    0% {
        margin-left: -480px;
    }

    100% {
        margin-left: 0;
    }
    }
    @keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }

    100% {
        margin-right: 0;
    }
    }
    @-moz-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }

    100% {
        margin-right: 0;
    }
    }
    @-webkit-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }

    100% {
        margin-right: 0;
    }
    }
    .credits{
    text-align:center;
    margin-top:35px;
    color: rgba(255, 255, 255, 0.35);
    font-family: 'Noto Sans', sans-serif;
    }
    .credits a{
    text-decoration:none;
    color: rgba(255, 255, 255, 0.35);
    }
    .container_title {
    height: 52px;
    width: 100%;
    line-height: 48px;
    background: rgba(221, 221, 221,0.9);
    
    }
    .container_title_div {
    width: 100px;
    display: inline-block;
    }
</style>

# hc4.0

> Hc vue2.0 4.0 ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##AJAX代码

```
const v = this;
v.$ajax({
    data:{
        s: "Hello.World",       // 待请求的接口服务名称
        name: "dogstar",        // 更多接口参数
        callback: "onCallback"  ,// 客户端的JS回调函数
        },
    done:function(r){
        console.log(r)
    },
})
```

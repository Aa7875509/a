<template>
  <div class="loading">
      
        <div class="loading_lo">
            <h2 style=" text-align: center;margin-bottom: 50px;">登录</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户账号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="passimg">
                    <div class="passinput"><el-input v-model="ruleForm.passimg"></el-input></div>
                    <div class="passimg" @click="myurlimg()" :style="'background:url(data:image/png;base64,'+urlimg+') no-repeat;background-size: cover;'"></div>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                <el-button @click="resetForm('ruleForm')">注册</el-button>
                <!-- <span class="wodtxt" @click="nopassword">忘记密码</span> -->
            </el-form-item>
        </el-form>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            urlimg:'',
            urlimgid:'',
            ruleForm: {
                name: '',
                password:'',
                passimg:''
            },
            rules: {
                name: [
                    { required: true, message: '请输用户', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                     { min: 6, max: 20, message: '请输入6位数以上密码', trigger: 'blur' }
                ],
                passimg: [
                    { required: true, message: '请输入验证码', trigger: 'change' },
                     { min: 4, max:4 , message: '请输入4位数验证码', trigger: 'blur' }
                ],
            }
        }
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
        submitForm(formName) {
            const v = this;
            v.$refs[formName].validate((valid) => {
                if (valid) {
                    v.$ajax({
                        data:{
                            s: "App.Captcha.Verify",       // 待请求的接口服务名称
                            captcha_id: v.urlimgid,
                            captcha_code: v.ruleForm.passimg,        // 更多接口参数
                            callback: "onCallback"  ,// 客户端的JS回调函数
                            },
                        done:function(r){
                            if(r.ret=='200'){
                                if(r.data.err_code=='0'){
                                    v.ajaxmy();
                                }else{
                                    v.open1(r.data.err_msg);
                                }
                            }else{
                                v.open1(r.msg);
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
        },
         ajaxmy(){
            const v = this;
            var p =md5(v.ruleForm.password);
            v.$ajax({
                data:{
                    s: "App.User.Login",       // 待请求的接口服务名称
                    username: v.ruleForm.name,
                    password: p,        // 更多接口参数
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                        if(r.data.err_code=='0'){
                            localStorage.setItem('uuid',r.data.uuid);
                            localStorage.setItem('token',r.data.token);
                            v.$router.push('/index')
                        }else{
                            v.open1(r.data.err_msg);
                        }
                    }else{
                            v.open1(r.msg);
                    }
                }
            })
        },
        resetForm(formName) {
            const v = this;
            this.$refs[formName].resetFields();
            this.$router.push('/register')
        },
        nopassword(){
            //  this.$router.push('/register')
        },
        //获取验证，图片
         myurlimg(){
            const v = this;
            v.$ajax({
                data:{
                    s: "App.Captcha.Create",       // 待请求的接口服务名称
                    return_format: 'data',
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                            if(r.data.err_code=='0'){
                                v.urlimgid=r.data.captcha_id	//字符串	验证码唯一ID，用于校验时核对（return_format=data时返回此字段）
                                v.urlimg= r.data.captcha_img
                        }else{
                            v.open1(r.data.err_msg);
                        }
                    }else{
                            v.open1(r.msg);
                    }
                }
            })
        }
  },
  mounted(){
    this.myurlimg()
    window.onresize = () => {
				 $('.loading').css({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }
    $('.loading').css({
        width: window.innerWidth,
        height: window.innerHeight,
    })
  }
}
</script>

<style scoped>
   .loading{
       background:url(../../../static/imgs/loding.jpg) no-repeat;
       background-size: 100% 100%
   }
   .loading_lo{
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -250px;
        margin-left: -250px;
        background: #ecefec7a;
        border-radius: 4px;
        border: 1px solid rgb(148, 138, 138);
        padding: 40px 30px;
   }
   .wodtxt{
       width: 65px;
       color: blue;
       cursor: pointer;
       display: inline-block;
       margin-left: 20px;
   }
   .wodtxt:active{
       color: rgb(247, 36, 36);
   }
   .passinput{
        display: inline-block; 
        width: 180px;
    }
     .passimg{
       display: inline-block;
        position: absolute;
        width: 140px;
        height: 40px;
     }
</style>

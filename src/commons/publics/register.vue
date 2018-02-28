<template>
  <div class="register">
        <div class="loading_lo">
            <h2 style=" text-align: center;margin-bottom: 50px;">注册</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户账号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="ruleForm.password2"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="passimg">
                    <div class="passinput"><el-input v-model="ruleForm.passimg"></el-input></div>
                    <div class="passimg" @click="myurlimg()" :style="'background:url(data:image/png;base64,'+urlimg+') no-repeat;background-size: cover;'"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">关闭</el-button>
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
                password2:'',
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
                password2: [
                    { required: true, message: '请确认密码', trigger: 'change' },
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
        //注册确定
        submitForm(formName) {
            const v = this;
            if(v.password!=v.password2) {
                return v.open1('两次输入密码不一致！')
            }
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
        //确认请求
        ajaxmy(){
            const v = this;
            var p =md5(v.ruleForm.password)
            v.$ajax({
                data:{
                    s: "App.User.Register",       // 待请求的接口服务名称
                    username: v.ruleForm.name,
                    password: p,        // 更多接口参数
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                            if(r.data.err_code=='0'){
                            v.$alert('<strong>注册成功！</strong>', '提示', {
                                dangerouslyUseHTMLString: true,
                                type: 'success',
                            }).then(() => {
                            v.$router.push('/')
                            })
                        }else{
                            v.open1(r.data.err_msg);
                        }
                    }else{
                            v.open1(r.msg);
                    }
                }
            })
        },
        //返回按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push('/')
        },
        //获取验证图片
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
        this.myurlimg();
        window.onresize = () => {
                $('.register').css({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        $('.register').css({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
}
</script>

<style scoped>
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
     .register{
        background:url('../../../static/imgs/regd.jpg');
        background-size: 100% 100%;
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

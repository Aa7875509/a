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
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                <el-button @click="resetForm('ruleForm')">注册</el-button>
                <span class="wodtxt" @click="nopassword">忘记密码</span>
            </el-form-item>
        </el-form>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            ruleForm: {
                name: '',
                password:'',
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
                                    v.$router.push('/HelloWorld')
                                }else{
                                    v.open1(r.data.err_msg);
                                }
                            }else{
                                 v.open1(r.msg);
                            }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            const v = this;
            this.$refs[formName].resetFields();
            this.$router.push('/register')
        },
        nopassword(){
            //  this.$router.push('/register')
        }
  },
  mounted(){
    //   this.$router.push('/HelloWorld')
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
</style>

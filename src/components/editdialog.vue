<template>
    <div class="indexdialog">
         <el-form label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item label="名字" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="资料1" prop="date">
                <el-input v-model="formLabelAlign.date"></el-input>
            </el-form-item>
            <el-form-item label="资料2" prop="worde">
                <el-input v-model="formLabelAlign.worde"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="address">
                <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="determine" plain size="small">关 闭</el-button>
            <el-button type="primary" @click="adddate('formLabelAlign')" size="small" plain>确 定</el-button>
        </span>
    </div>
</template>

<script>
export default {
  props:['row'],
  data() {
    return {
        formLabelAlign:{
            name:this.row.name,
            date:this.row.date,
            worde:this.row.worde,
            address:this.row.address,
            id:this.row.id,
        },
        rules: {
            name: [
                { required: true, message: '请输名字', trigger: 'blur' }
            ],
            date: [
                { required: true, message: '请输入资料1', trigger: 'change' }
            ],
            worde: [
                { required: true, message: '请输入资料2', trigger: 'change' }
            ],
            address: [
                { required: true, message: '请输入备注', trigger: 'change' }
            ],
        }
    };
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
        determine(){
            this.$emit("closedialog",'编辑')
        },
        adddate(formLabelAlign){
            var v= this;
            v.$refs[formLabelAlign].validate((valid) => {
                if (valid) {
                    var data={
                                name:v.formLabelAlign.name,
                                date:v.formLabelAlign.date,
                                worde:v.formLabelAlign.worde,
                                address:v.formLabelAlign.address
                            };
                    data=JSON.stringify(data);
                    v.$ajax({
                        data:{
                            s: "App.User_Set.Update",       // 待请求的接口服务名称
                            uuid: localStorage.getItem('uuid'),
                            token: localStorage.getItem('token'),        // 更多接口参数
                            id:v.formLabelAlign.id,
                            data:data,
                            callback: "onCallback"  ,// 客户端的JS回调函数
                            },
                        done:function(r){
                            if(r.ret=='200'){
                                if(r.data.err_code=='0'){
                                    v.open('编辑成功');
                                    v.$emit("closedialog",'编辑')
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
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

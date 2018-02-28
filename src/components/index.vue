<template>
    <div class="container_fluid">
        <el-tabs tab-position="top" @tab-click='AIopen'>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-message"></i> 聊天室</span>
                <AIChat></AIChat>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 记事本</span>
                <div class="container_title">
                    <div  class="container_title_div"></div>
                    <el-button type="primary" @click="dialogVisible=true" size="small" plain>添 加</el-button>
                    <el-button type="primary"  @click="dtuichu" style="float: right; margin-top: 10px;margin-right: 100px;" size="small" plain>退出登陆</el-button>
                </div>
                <el-table
                :data="tableData3"
                height="600"
                border
                stripe
                style="width: 100%;">
                    <el-table-column
                    type="index"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    width='230'
                    label="名字">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="资料1">
                    </el-table-column>
                    <el-table-column
                    prop="worde"
                    label="资料2">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="备注">
                    </el-table-column >
                    <el-table-column
                    prop="add_time"
                    label="添加时间">
                    </el-table-column>
                    <el-table-column label="操作" width='180'>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    class="pags"
                    layout="prev, pager, next"
                    :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        
        <!-- 弹窗 -->
        <div>
            <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                width="500px"
                :close-on-click-modal='false'
                >
                <adddialog v-if="dialogVisible" @closedialog='closedialog' ></adddialog>
            </el-dialog>
            <el-dialog
                title="编辑"
                :visible.sync="dialogVisible1"
                width="500px"
                :close-on-click-modal='false'
                >
                <editdialog :row='row' v-if="dialogVisible1" @closedialog='closedialog'></editdialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import adddialog from "./adddialog";
import editdialog from "./editdialog";
import AIChat from "./AIChat";
export default {
  name: "index",
  data() {
    return {
        row:null,//表单数据
        dialogVisible: false, //添加弹窗
        dialogVisible1: false, //编辑弹窗
        tableData3:[] , //表单数据
            // {
            // name: "王小虎",
            // date: "2016-05-03",
            // worde: "王小虎",
            // address: "上海市普陀区金沙江路 1518 弄"
            // }
        
        page:1,
        total:0,
    };
  },
  mounted(){
     this.ajaxqurt();//获取列表
  },
  methods: {
    handleCurrentChange(val) {
        this.page=val;
        this.ajaxqurt();//获取列表
    },
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
    ajaxqurt(){
        var v =this;
        v.$ajax({
            data:{
                s: "App.User_Set.GetList",       // 待请求的接口服务名称
                uuid: localStorage.getItem('uuid'),
                token: localStorage.getItem('token'),        // 更多接口参数
                key:'from',
                page:v.page,
                callback: "onCallback"  ,// 客户端的JS回调函数
                },
            done:function(r){
                if(r.ret=='200'){
                    if(r.data.err_code=='0'){
                        var  tableData3=r.data.items;
                        v.total=r.data.total;
                        var dates=[];
                        for (var i=0 ;i<tableData3.length;i++){
                        tableData3[i].data.id=tableData3[i].id;
                        tableData3[i].data.add_time=tableData3[i].add_time;
                        dates.push(tableData3[i].data);
                        }
                        v.tableData3=dates;
                    }else{
                        v.open1(r.data.err_msg);
                    }
                }else{
                    v.open1(r.msg);
                }
            }
        })
    },
    //弹窗关闭前回调
    closedialog(done) {
      if (done == "添加") {
        this.dialogVisible = false;
        this.page=1;
        this.ajaxqurt();//获取列表
      } else if (done == "编辑") {
        this.dialogVisible1 = false;
        // this.page=1;
        this.ajaxqurt();//获取列表
      }
    },
    dtuichu(){
         this.$router.push('/')
    },
    handleEdit(index,row){
        this.row=row;
        this.dialogVisible1 = true;
    },
    handleDelete(index,row){
        var v= this;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             v.$ajax({
                data:{
                    s: "App.User_Set.Delete",       // 待请求的接口服务名称
                    uuid: localStorage.getItem('uuid'),
                    token: localStorage.getItem('token'),        // 更多接口参数
                    id:row.id,
                    callback: "onCallback"  ,// 客户端的JS回调函数
                    },
                done:function(r){
                    if(r.ret=='200'){
                        if(r.data.err_code=='0'){
                            v.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            v.page=1;
                            v.ajaxqurt();//获取列表
                        }else{
                            v.open1(r.data.err_msg);
                        }
                    }else{
                        v.open1(r.msg);
                    }
                }
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  components: {
    adddialog,editdialog,AIChat,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container_fluid{
    padding: 0 20px;
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
.pagination{
    padding-top: 30px;
    background: #fff;
    text-align: center
}
</style>

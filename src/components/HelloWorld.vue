<template>
  <div class="container-fluid">
        <br/>
        <br/>
        <div class="table-responsive">
            <table class="table table-hover table-bordered table table-striped">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>年龄</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in listData" :class="{ info: user.tag }" :key="index" @click="wert(user,index)" @contextmenu="rightAction(user)">
                        <td>{{user.number}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.age}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      listData:[{number:125,name:'砸阿萨德',age:456}]
    }
  },
  methods: {
      wert(is,id){
            console.log(is,id)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #login{
        width: 400px; margin: 0 auto;
    }

    th{
        line-height: 35px;
        height: 35px;
        /* background: -webkit-linear-gradient(top,#ecf3fb,#e2edfa); */
    }
    
    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
        padding: 7px;;
        
    }
</style>

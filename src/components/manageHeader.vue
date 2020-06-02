<template>
  <div >
    <el-menu
      mode="horizontal"
      background-color="#F49900"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="padding: 0 20px">
      <vue-particles
        color="#f8c367"
        :particleOpacity="0.7"
        :particlesNumber="160"
        shapeType="circle"
        :particleSize="4"
        linesColor="#f8c367"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        style="height: 57px"
      >
      </vue-particles>
      <el-row style="position: absolute; top:0;width:100%;margin: 0 auto;padding-right: 30px">
        <el-col :span="12" style="height: 57px;padding-top: 12px">
          <img id="logo" src="../assets/images/companyIcon/logoWhite.png"/>
        </el-col>
        <el-col :span="4" :offset="6" style="height: 57px;padding-top: 12px;color: white;text-align: right;text-overflow: ellipsis;padding-right: 12px">
          <span>{{nickManage}}</span><br/>
          <span>{{nickManageName}}</span>
        </el-col>
        <el-col :span="1" style="line-height: 57px">
          <el-dropdown placement="bottom" @command="handleCommand">
            <el-button circle icon="el-icon-ump-gerenzhongxin" type="warning" @click="viewInfo"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="b">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="1" style="line-height: 57px">
          <el-button @click="logout" type="danger">退出</el-button>
        </el-col>
      </el-row>
    </el-menu>
</div>
</template>

<script type="text/javascript">
export default {
    data() {
      return {
        dialogVisible: false
      };
    },
     mounted(){
      let data111=JSON.parse(localStorage.getItem('Name3'));
      this.$store.commit("updateManageName",data111);
    },
    computed:{
      nickManageName(){
        return this.$store.state.nickManageName;
      },
      nickManage(){
        return this.$store.state.nickManage;
      }
    },
    methods:{
      logout(){
        this.$confirm('即将退出平台, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$axios0.post('logdemo/logout',{})
            .then((res) => {
              // console.log(res);
              if(res.data.code === 200){
                sessionStorage.setItem('token','')
                this.$router.push({ path:"/WebPortals/HomePage" });
              }
            }).catch((e) => {
            console.log(e)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleCommand(command) {
        if(command === "a"){
          this.$router.push({ path: "/WebManage/PersonCenter" })
        }else {
          this.logout()
        }
      },
      viewInfo(){
        this.$router.push({ path: "/WebManage/PersonCenter" })
      }
  }
}
</script>
<style scoped>
  #logo {
    width: 230px !important;
    height: 34px !important;
    margin: 0;
  }
</style>

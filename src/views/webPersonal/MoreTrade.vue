<template>
    <div>
      <el-row style="margin: 50px 0">
        <el-col :span="12" :offset="6" style="color: #3a8ee6;font-size: 40px;">程序猿还在紧急开发中~~~</el-col>
      </el-row>
      <el-row style="margin: 50px 0">
        <el-col :span="6" :offset="9">
          <el-button type="danger" @click="backHome">点我返回主页</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
      methods:{
        backHome(){
          this.$store.commit('delete2_tabs', '/MoreTradePerson');
          this.$router.push({path: '/PersonMainCon'});
        }
      }
    }
</script>

<style scoped>

</style>

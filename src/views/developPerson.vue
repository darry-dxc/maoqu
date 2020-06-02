<template>
	<div class="template-wrap">
	<h1 class="ondevelop">程序员火速开发中，敬请期待!!!</h1>
  <el-button type="primary" plain icon="el-icon-arrow-left" @click="back">返回主页</el-button>
    </div>
</template>
<style>
 .template-wrap {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .ondevelop {
    color: red;
    margin-top: 300px;
  }
</style>
<script>

export default {
	//定义数据
  data () {
    return {
    }
  },
    //定义初始化函数
  mounted(){

    },
    //定义方法
  methods:{
    back(){
       this.$router.push({path:'/PersonMain'});
    },
}
}
</script>

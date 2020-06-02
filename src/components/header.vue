<template>
  <div class="login-header">
    <el-menu
      background-color="#fff"
      mode="horizontal"
      style="position: fixed;top: 0;width: 100%;height: 61px"
    >

    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {

    }
  }
</script>

<style scoped>
  .login-header #logo {
    width: 230px !important;
    height: 34px !important;
    margin: 13px 20px 0 13px;
  }
  .bk-home{
    float: right;
    margin-right: 30px;
    margin-top: 15px
  }
  .bk-home:hover{
    cursor: pointer;
  }
</style>

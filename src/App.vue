<template>
  <div id="app" style="padding-right: -10px;">
      <router-view ></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-scrollbar__wrap{
    margin-bottom: 0 !important;
    overflow-x: hidden !important;
  }
  body {
    margin: 0 !important;
    height: 100vh;
    padding: 0;
    font-family: "Microsoft YaHei UI";
  }
</style>

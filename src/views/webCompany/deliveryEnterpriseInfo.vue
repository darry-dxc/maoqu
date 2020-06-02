<template>
    <div>
      <el-tabs  type="border-card" >
        <el-tab-pane label="出口业务"><imDelivery /></el-tab-pane>
        <el-tab-pane label="进口业务"><exDelivery /></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import imDelivery from './enterNorUnitIfoExport'
  import exDelivery from './enterNorUnitIfoImport'
    export default {
      data() {
        return {}
      },
      components:{
        imDelivery,exDelivery
      },
      mounted() {
      },
      methods: {}
    }
</script>

<style scoped>

</style>

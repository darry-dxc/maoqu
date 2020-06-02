<template>
    <div>
      <el-tabs  type="border-card" >
        <el-tab-pane label="出口业务"><exCustomer /></el-tab-pane>
        <el-tab-pane label="进口业务"><imCustomer /></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import exCustomer from './enterForeClientIfoExport'
  import imCustomer from './enterForeClientIfoImport'
    export default {
        data() {
            return {}
        },
      components:{
        exCustomer,imCustomer
      },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>

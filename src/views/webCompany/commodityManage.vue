<template>
    <div>
      <el-tabs  type="border-card" >
        <el-tab-pane label="出口业务"><commodityManageExport /></el-tab-pane>
        <el-tab-pane label="进口业务"><commodityManageImport /></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import commodityManageExport from './commodityManageExport'
  import commodityManageImport from './commodityManageImport'
    export default {
        data() {
            return {}
        },
      components:{
        commodityManageExport,commodityManageImport
      },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>

<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="出口业务">
          <ExportDocReview />
        </el-tab-pane>
        <el-tab-pane label="进口业务">
          <ImportDocReview />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import ExportDocReview from './checkDocument/checkDocuments'
  import ImportDocReview from './checkDocument/docReviewImport'
    export default {
        data() {
            return {}
        },
      components:{
        ExportDocReview,
        ImportDocReview
      }
    }
</script>

<style scoped>

</style>

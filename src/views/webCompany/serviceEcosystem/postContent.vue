<template>
    <div style="min-width: 1200px">
      <el-tabs class="serviceEco" type="border-card" v-model="activeName">
        <el-tab-pane label="出口业务" name="export"><ExportBs :companyName = this.nickCompanyName /></el-tab-pane>
        <el-tab-pane label="进口业务" name="import"><ImportBs /></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import './../../../assets/css/webCompany/postContent.css';
  import ImportBs from './importBusiness';
  import ExportBs from './exportBusiness';
  export default {
        data() {
            return {
              activeName:'export'
            }
        },
    computed:{
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      },
    },
    mounted(){

    },
    activated(){
      if(this.$route.query.type !== undefined){
        if(this.$route.query.type === 'import')
          this.activeName = 'import'
        else
          this.activeName = 'export'
      }
    },
    components:{
      ImportBs,ExportBs
    },
    methods:{

    }

  }
</script>



<template>
<div>
   <div>
     <el-tabs v-model="activeName" type="border-card" >
       <el-tab-pane label="进口业务查询" name="import">
         <el-row>
           <el-radio-group v-model="bsImportType">
             <el-radio-button  label="个人业务"></el-radio-button>
             <el-radio-button  label="企业业务"></el-radio-button>
           </el-radio-group>
         </el-row>
         <bsQueryImportEnterprise v-if="bsImportType === '企业业务'"/>
         <bsQueryImportPerson v-if="bsImportType === '个人业务'"/>
       </el-tab-pane>
       <el-tab-pane label="出口业务查询" name="export">
         <el-row>
           <el-radio-group v-model="bsExportType">
             <el-radio-button  label="个人业务"></el-radio-button>
             <el-radio-button  label="企业业务"></el-radio-button>
           </el-radio-group>
         </el-row>
         <bsQueryExportEnterprise v-if="bsExportType === '企业业务'"/>
         <bsQueryExportPerson v-if="bsExportType === '个人业务'"/>
       </el-tab-pane>
     </el-tabs>
   </div>

</div>
</template>

<script>
  import './../../assets/css/webManager/userQuery.css'
  import bsQueryExportEnterprise from './businessQuery/bsQueryExportEnterprise'
  import bsQueryExportPerson from './businessQuery/bsQueryExportPerson'
  import bsQueryImportEnterprise from './businessQuery/bsQueryImportEnterprise'
  import bsQueryImportPerson from './businessQuery/bsQueryImportPerson'
    export default {
      data () {
        return {
          bsImportType:'个人业务',
          bsExportType:'个人业务',
          activeName: 'export',
        }
      },
      components:{
        bsQueryExportEnterprise,
        bsQueryExportPerson,
        bsQueryImportEnterprise,
        bsQueryImportPerson
      },
      //定义初始化函数
      mounted(){

      },
      methods:{

      },
    }
</script>

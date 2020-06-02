<template>
  <div >
    <div class="userManage-head">
      <div>
      <el-tabs class="userTab" v-model="activeName" type="border-card">
        <el-tab-pane label="个人用户管理" name="user">
          <personUserManage />
        </el-tab-pane>
        <el-tab-pane label="企业用户管理" name="enterprise">
          <enterpriseUserManage />
        </el-tab-pane>
      </el-tabs>
    </div>

    </div>

  </div>
</template>
<script type="text/javascript">
  import personUserManage from './userManage/personUserManage'
  import enterpriseUserManage from './userManage/enterpriseUserManage'
  export default {
  //定义数据
  data () {
      return {
        activeName:'user',
      }
    },
  //定义组件
  components:{
    enterpriseUserManage,personUserManage
  },
  computed:{

   },
  mounted(){

  },
  methods:{

  }
}
</script>

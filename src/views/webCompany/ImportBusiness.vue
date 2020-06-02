<template>
    <div>
      <el-breadcrumb separator="/" style="font-size: 14px;height: 30px;margin: 0 0 15px 0;line-height: 30px;">
        <el-breadcrumb-item :to="{ path: '/WebCompany/CompanyMainCon' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/WebCompany/BusinessManage/ImportBs/imBusiness' }">业务单查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/WebCompany/BusinessManage/ImportBs/imService' }">服务单查询</el-breadcrumb-item>
        <el-breadcrumb-item >详情</el-breadcrumb-item>
      </el-breadcrumb>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" >
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <!--<importService v-show="isServiceOrBs"/>-->
      <!--<importBsDetail v-show="!isServiceOrBs" ref="importBsDetail"/>-->
    </div>
</template>

<script type="text/ecmascript-6">
  import importService from '././businessManage/component/importService'
  import importBsDetail from '././businessManage/component/importBsDetail'
    export default {
      data() {
        return {
          isServiceOrBs:true
        }
      },
      computed: {
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        }
      },
      components:{
        importService,
        importBsDetail
      },
      activated(){
        this.$router.push({path:'/WebCompany/BusinessManage/ImportBs/imBusiness'})
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>

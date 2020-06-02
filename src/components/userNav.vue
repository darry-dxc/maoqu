<!-- 左侧菜单导航栏组件 -->
<template>
  <div>
    <el-menu :collapse="isCollapse" background-color="#4F6D8C" text-color="#fff">
      <el-menu-item @click="collapseMenu" index="1">
        <i class="el-icon-ump-zhankai" style="color: white;font-size: 18px"/>
        <span style="font-size: 18px;color: white">{{nickManage}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu
      :router="true"
      :default-active="$route.path"
      style="height: 860px;"
      background-color="#4F6D8C"
      text-color="#fff"
      active-text-color="#F2A235"
      :collapse="isCollapse"
    >
      <template v-for="rule in menus">
        <el-submenu
          v-if="rule.children && rule.children.length > 0"
          :index="rule.path"
        >
          <template slot="title" ><i :class="rule.icon" style="color: white;font-size: 18px"></i><span style="font-size: 18px">{{ rule.name }}</span></template>
          <el-menu-item v-for="child in rule.children" :index="child.path" :key="child.path" style="font-size: 18px"><i :class="child.icon"></i>{{ child.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="rule.path"
          style="font-size: 18px"
        >
          <i :class="rule.icon" style="color: white;font-size: 18px"></i>
          <span slot="title">{{ rule.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<style>

</style>
<script>
  export default {
    data () {
      return {
        isCollapse: false,
        menus: [
          { path: '/WebManage/UserManage', name: '用户管理', icon:'el-icon-ump-yonghuguanli'},
          { path: '/WebManage/LimitManage', name: '权限管理', icon:'el-icon-ump-quanxianguanli'},
          { path: '/WebManage/SystemReport', name: '系统报表', icon:'el-icon-ump-xitongbaobiao'},
          { path: '/WebManage/SystemLog', name: '系统日志', icon:'el-icon-ump-xitongrizhi'},
          { path: '/WebManage/ContentLog', name: '内容日志', icon:'el-icon-ump-neirong'},
          { path: '/WebManage/DataBackup', name: '数据安全备份', icon:'el-icon-ump-shujubeifen'},
          { path: '/WebManage/PersonCenter', name: '个人中心', icon:'el-icon-ump-gerenzhongxin'},
          { path: '/WebManage/ManageIdea', name: '意见管理', icon:'el-icon-ump-yijianguanli'},
          { path: '/WebManage/ManageService', name: '客服管理', icon:'el-icon-ump-kefuguanli'},
          { path: '/WebManage/CheckDocuments', name: '单证审核', icon:'el-icon-ump-shequ'},
          { path: '/WebManage/UserQuery', name: '业务查询', icon:'el-icon-ump-yonghuchaxun'}
        ]
      }
    },
    mounted () {

    },
    methods:{
      collapseMenu(){
        this.isCollapse = !this.isCollapse;
        this.$emit('collapseNav');
      },
      refresh(){
        // 刷新时以当前路由做为tab加入tabs
        if (this.$route.path !== '/WebManage/UserManage') {
          this.$store.commit('add_tabs', {route: '/WebManage/UserManage', name: '用户管理'});
          this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
          this.$store.commit('set_active_index', this.$route.path);
        } else {
          this.$store.commit('add_tabs', {route: '/WebManage/UserManage', name: '用户管理'});
          this.$store.commit('set_active_index', '/WebManage/UserManage');
          this.$router.push('/WebManage/UserManage');
        }
      }
    },
    computed: {
      options () {
        return this.$store.state.options;
      },
      nickManage() {
        return this.$store.state.nickManage;
      }
    }
  }
</script>

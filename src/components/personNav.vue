<template>
  <div>
    <!-- 侧边栏内容 -->
    <el-menu :collapse="isCollapse" background-color="#4F6D8C" text-color="#fff">
      <el-menu-item @click="collapseMenu" index="1">
        <i class="el-icon-ump-zhankai" style="color: white;font-size: 18px"/>
        <span style="font-size: 18px;color: white">{{nickName}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu :router="true" :default-active="$route.path" style="height: 860px;"
             background-color="#4F6D8C"
             text-color="#fff"
             active-text-color="#F2A235"
             unique-opened
             :collapse="isCollapse"
    >
      <template v-for="rule in menus">
        <el-submenu v-if="rule.children && rule.children.length > 0"
                    :index="rule.path"
        >
          <template slot="title" ><i :class="rule.icon" style="color: white;font-size: 18px" /><span slot="title" style="font-size: 18px">{{ rule.name }}</span></template>
          <el-menu-item v-for="child in rule.children" :index="child.path" :key="child.path" style="font-size: 18px"><i :class="child.icon" style="color: white;font-size: 18px" />{{ child.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                      :index="rule.path"
                      style="font-size: 18px"
        >
          <i :class="rule.icon" style="color: white;font-size: 18px"/>
          <span slot="title">{{ rule.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isCollapse: false ,
        activeLink: null,
        menus: [
          {path: '/PersonMainCon', name: '个人中心主页',icon:'el-icon-ump-zhuye'},
          {path: '/BusinessManagePerson', name: '业务管理',icon:'el-icon-ump-yewu',
            children:[
              {path:'/personImportBs',name:'进口业务',icon:'el-icon-ump-jinkou1'},
              {path:'/personExportBs',name:'出口业务',icon:'el-icon-ump-chukoucaozuo'},
              {path: '/DataQuery', name: '数据查询',icon:'el-icon-ump-shujuchaxun'},
            ]},
          {path: '/SuperCalendarPerson', name: '超级日程表',icon:'el-icon-ump-richengbiao'},
          {path: '/ShippingQueryPerson', name: '航运查询',icon:'el-icon-ump-hangyunwuliu'},
          {path: '/ToolBoxPerson', name: '工具箱',icon:'el-icon-ump-gongjuxiang'},
          {path: '/PersonCenetr', name: '个人中心',icon:'el-icon-ump-gerenzhongxin',
            children:[
              {path: '/PersonDocumentManage', name: '资料管理',icon:'el-icon-ump-ziliaoguanli'},
              {path: '/AccountSafe1', name: '账户安全',icon:'el-icon-ump-zhanghuanquan'},
              {path: '/PersonSuggestFeedback', name: '反馈意见',icon:'el-icon-ump-yijianguanli'},
            ]
          },
          {path: '/ServiceEcosystemPerson', name: '服务生态圈',icon:'el-icon-ump-shengtaiquan'},
          {path: '/TradeInfoPerson', name: '外贸信息港',icon:'el-icon-ump-zixun'},
          {path: '/MoreTradePerson', name: '贸趣社',icon:'el-icon-ump-shequ'},
        ]
      }
    },
    mounted () {

    },
    computed: {
      options2 () {
        return this.$store.state.options2;
      },
      nickName(){
        return this.$store.state.nickName;
      },
    },
    methods:{
      refresh(){
        // 刷新时以当前路由做为tab加入tabs
        if (this.$route.path !== '/PersonMainCon') {
          this.$store.commit('add2_tabs', {route: '/PersonMainCon', name: '个人中心主页'});
          this.$store.commit('add2_tabs', {route: this.$route.path , name: this.$route.name });
          this.$store.commit('set2_active_index', this.$route.path);
        } else {
          this.$store.commit('add2_tabs', {route: '/PersonMainCon', name: '个人中心主页'});
          this.$store.commit('set2_active_index', '/PersonMainCon');
          this.$router.push('/PersonMainCon');
        }
      },
      //展开收起导航栏
      collapseMenu(){
        this.isCollapse = !this.isCollapse;
        this.$emit('collapseNav');
      }
    }
  }
</script>
<style>

</style>

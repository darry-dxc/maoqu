<template>
  <div style="min-width:1250px">
    <manage-header/>
<!-- 侧边栏内容 -->
    <el-row >
      <el-col :span="isCollapse === false? 4: 1">
        <user-nav ref="nav" @collapseNav="isCollapse = !isCollapse"/>
      </el-col>
      <el-col :span="isCollapse === false? 20 : 23" style="padding-left: 10px">
        <el-row>
          <el-col :span="23">
            <el-tabs
              v-model="activeIndex"
              closable
              @tab-click="tabClick"
              v-if="options.length"
              @tab-remove="tabRemove">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in options"
                :label="item.name"
                :name="item.route">
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="1">
            <el-button type="text" icon="el-icon-close" style="font-size: 28px" @click="closeAll"/>
          </el-col>
        </el-row>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </el-col>
    </el-row>
  <portals-footer/>
</div>
</template>
<script>
  import userNav from './../../components/userNav.vue'
  import manageHeader from './../../components/manageHeader.vue'
  import portalsFooter from './../../components/portalsFooter.vue'
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    components:{
      manageHeader,
      portalsFooter,
      userNav
    },
    //进入个人平台后默认进入主页
    mounted(){
      this.$store.state.options = [];
      this.activeIndex = '/WebManage/UserManage';
      this.$router.push({path: this.activeIndex});
      this.$refs.nav.refresh();
    },
    methods: {
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex;
      this.$router.push({path: path});
    },
    tabRemove (targetName) {
      //首页不可删除
      if(targetName == '/WebManage/UserManage') {
        return;
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/WebManage/UserManage'});
        }
      }
    },
      closeAll(){
        // console.log(this.$store.state.options1)
        this.$store.state.options = [{name:'用户管理',route:'/WebManage/UserManage'}];
        this.$store.commit('set_active_index', '/WebManage/UserManage');
        this.$router.push('/WebManage/UserManage');
      }
  },
  computed: {
    nickManageName(){
      return this.$store.state.nickManageName;
      },
      nickManage(){
        return this.$store.state.nickManage;
      },
    options () {
      return this.$store.state.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set_active_index', to.path);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: to.path, name: to.name});
        this.$store.commit('set_active_index', to.path);
      }
    }
  }
}
</script>

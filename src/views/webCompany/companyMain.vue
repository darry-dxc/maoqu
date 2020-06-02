<template>
  <div style="min-width:1250px">
    <company-header/>
  <!-- 侧边栏内容 -->
<!-- <user-nav/> -->
    <el-row>
      <el-col :span="isCollapse === false? 4: 1">
        <company-nav ref="nav" @collapseNav="collapseNav"/>
      </el-col>
      <el-col :span="isCollapse === false? 20: 23" style="padding-left: 10px">
        <el-row>
          <el-col :span="23">
            <el-tabs
              v-model="activeIndex1"
              closable
              @edit="handleTabsEdit"
              @tab-click="tabClick"
              v-if="options1.length"
              @tab-remove="tabRemove"
              style="background-color: #f2f2f2"
            >
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in options1"
                :label="item.name"
                :name="item.route">
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="1">
            <el-button type="text" icon="el-icon-close" style="font-size: 28px" @click="closeAll"/>
          </el-col>
        </el-row>
        <div style="padding-right:10px ">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" >
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
      </el-col>
    </el-row>
<portals-footer/>
</div>
</template>
<script>
  import './../../assets/css/webCompany/companyMain.css'
  import companyNav from './../../components/companyNav.vue'
  import userNav from './../../components/userNav.vue'
  import companyHeader from './../../components/companyHeader.vue'
  import portalsFooter from './../../components/portalsFooter.vue'
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    components:{
      companyHeader,
      portalsFooter,
      companyNav
    },
     //进入个人平台后默认进入主页
    mounted(){
      this.$store.state.options1 = [];
      this.activeIndex1 = '/WebCompany/CompanyMainCon';
      this.$router.push({path: this.activeIndex1});
      this.$refs.nav.refresh();
    },
    methods: {
       handleTabsEdit(targetName, action) {
       //this.options1=[];
      },
      //收起导航栏
      collapseNav(){
         this.isCollapse = !this.isCollapse;
      },
        // tab切换时，动态的切换路由
      tabClick (tab) {
         // console.log(tab)
        let path = this.activeIndex1;
        this.$router.push({path: path});
      },
      tabRemove (targetName) {
        //首页不可删除
        if(targetName == '/WebCompany/CompanyMainCon') {
          return;
        }
        this.$store.commit('delete1_tabs', targetName);
        if (this.activeIndex1 === targetName) {
          // 设置当前激活的路由
          if (this.options1 && this.options1.length >= 1) {
            this.$store.commit('set1_active_index', this.options1[this.options1.length-1].route);
            this.$router.push({path: this.activeIndex1});
          } else {
            this.$router.push({path: '/WebCompany/CompanyMainCon'});
          }
        }
      },
        closeAll(){
          // console.log(this.$store.state.options1)
          this.$store.state.options1 = [{name:'企业中心主页',route:'/WebCompany/CompanyMainCon'}];
          this.$store.commit('set1_active_index', '/WebCompany/CompanyMainCon');
          this.$router.push('/WebCompany/CompanyMainCon');
        }
  },
  computed: {
    //...mapState(['nickCompanyName','nickCompanyMan','nickCompanyId'])
    nickCompanyName(){
          return this.$store.state.nickCompanyName;
        },
    nickCompanyMan(){
          return this.$store.state.nickCompanyMan;
        },
     nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
    options1() {
      return this.$store.state.options1;
    },
    activeIndex1: {
      get () {
        return this.$store.state.activeIndex1;
      },
      set (val) {
        this.$store.commit('set1_active_index', val);
      }
    }
  },
  //使用watch监听路由的跳转变化
  watch: {
    '$route'(to) {
      if(to.name !== undefined){
        let flag = false;
        for (let option of this.options1 ) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set1_active_index', to.path);
            break
          }
        }
        if (!flag) {
          this.$store.commit('add1_tabs', {route:  to.path, name: to.name});
          this.$store.commit('set1_active_index', to.path);
        }
      }
    }
  }
}
</script>

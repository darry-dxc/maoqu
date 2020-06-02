<template>
	<div>
		<!-- 侧边栏内容 -->
    <el-menu :collapse="isCollapse" background-color="#4F6D8C" text-color="#fff">
      <el-menu-item @click="openCollapse" index="1">
        <i class="el-icon-ump-zhankai" style="color: white;font-size: 18px"/>
        <span style="font-size: 18px;color: white">{{nickCompanyName}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu
      :router="true"
      :default-active="$route.path"
      style="height: 860px;"
      background-color="#4F6D8C"
      text-color="#fff"
      active-text-color="#F2A235"
      unique-opened
      :collapse="isCollapse"
    >
      <template v-for="rule in $router.options.routes[1].children">
        <el-submenu
          v-if="rule.children && rule.children.length > 0"
          :index="'/WebCompany/'+rule.path"
        >
          <template slot="title" ><i :class="rule.icon" style="color: white;font-size: 18px"></i><span slot="title" style="font-size: 18px">{{ rule.name }}</span></template>
          <el-menu-item v-for="child in rule.children" v-if="child.name !== undefined" :index="'/WebCompany/'+rule.path+'/'+child.path" :key="rule.path+'/'+child.path" style="font-size: 18px"><i :class="child.icon" style="color: white;font-size: 18px"></i><span slot="title">{{ child.name }}</span></el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="'/WebCompany/'+rule.path"
          style="font-size: 18px"
        >
          <i :class="rule.icon" style="color: white;font-size: 18px"></i>
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
         isCollapse: false,
      }
    },
    mounted () {
       console.log(this.$router.options.routes[1].children)
    },
    computed: {
      options1 () {
        return this.$store.state.options1;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      },
      nickCompanyMan(){
        return this.$store.state.nickCompanyMan;
      },
    },
    methods:{
    	 // 折叠框的伸缩
       openCollapse(){
        this.isCollapse = !this.isCollapse;
        this.$emit('collapseNav');
      },
      refresh(){
        // 刷新时以当前路由做为tab加入tabs
        if (this.$route.path !== '/WebCompany/CompanyMainCon') {
          this.$store.commit('add1_tabs', {route: '/WebCompany/CompanyMainCon', name: '企业中心主页'});
          this.$store.commit('add1_tabs', {route: this.$route.path , name: this.$route.name });
          this.$store.commit('set1_active_index', this.$route.path);
        } else {
          this.$store.commit('add1_tabs', {route: '/WebCompany/CompanyMainCon', name: '企业中心主页'});
          this.$store.commit('set1_active_index', '/WebCompany/CompanyMainCon');
          this.$router.push('/WebCompany/CompanyMainCon');
        }
      }
    }
  }
</script>

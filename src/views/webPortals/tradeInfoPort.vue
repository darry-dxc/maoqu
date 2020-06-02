<template>
    <div style="min-width: 1200px">
      <portals-header ref="portalsHeader"></portals-header>
      <div style="height: 450px;padding-top: 60px">
        <img src="./../../assets/images/portalsImg/tradeinfoport.jpg" width="100%" height="100%">
      </div>
      <el-container style="height: 800px">
        <el-aside width="200px">
          <el-menu @select="select" style="height: 100%" default-active="外贸资讯" active-text-color="#F49900" background-color="#f4f4f4">
            <el-menu-item index="外贸资讯">外贸资讯</el-menu-item>
            <el-menu-item index="商品讯息">商品讯息</el-menu-item>
            <el-menu-item index="国外资讯">国外资讯</el-menu-item>
            <el-menu-item index="学习提升">学习提升</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="18" style="height: 32px;padding-top: 4px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/WebPortals/TradeInfoPort' }">外贸信息港</el-breadcrumb-item>
                <el-breadcrumb-item><span @click="view = false" class="pointer">{{path}}</span></el-breadcrumb-item>
                <el-breadcrumb-item v-show="view">详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="6">
              <el-input size="small" suffix-icon="el-icon-search"/>
            </el-col>
          </el-row>
          <el-row v-for="news in newsList" :key="news.title" style="border-bottom: 1px solid #f4f4f4" v-show=" !view">
            <el-col :span="3">
              <div style="width: 100px;height: 100px;border-radius: 50%;background-color: #F49900;margin: 30px auto;text-align: center;">
                <el-row>
                  <span style="color: white;font-size: 28px;line-height: 50px">18</span>
                </el-row>
                <el-row>
                  <span style="color: white;font-size: 22px;">9-28</span>
                </el-row>
              </div>
            </el-col>
            <el-col :span="16">
              <h2>{{news.title}}</h2>
              <p><el-tag type="success">{{news.type}}</el-tag></p>
              <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                {{news.content}}
              </p>
              <el-button type="text" @click="viewNews(news)">查看详情</el-button>
            </el-col>
            <el-col :span="4">
              <p style="font-size: 8px;color:#c0c0c0">浏览人数:100&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp来源:新闻网</p>
            </el-col>
          </el-row>
          <el-row v-show="view">
            <h2>{{newsDatail.title}}</h2>
            <p>
              {{newsDatail.content}}
            </p>
          </el-row>
        </el-main>
      </el-container>
      <main-service style="z-index: 9999;position: fixed;right: 20px;bottom: 50px"></main-service>
      <portals-footer />
    </div>
</template>

<script>
  import portalsFooter from './../../components/portalsFooter.vue'
  import portalsHeader from './../../components/portalsHeader.vue'
  import mainService from './../../components/mainService.vue'
    export default {
        data() {
            return {
              newsDatail:'',
              view:false,
              news:{},
              path:'外贸资讯',
              newsList:[]
            }
        },
      components:{
        portalsFooter, portalsHeader, mainService
      },
      created(){
        this.loadNews();
      },
      mounted() {
      },
      methods: {
        loadNews(){
          this.$axios.get('static/news.json')
            .then((res) => {
              // console.log(res.data);
              this.news = res.data;
              this.newsList = this.news.news1;
            }).catch((e) => {
              console.log(e)
          })
        },
        select(index,indexPath){
          this.view = false;
          this.path = index;
          switch (index) {
            case '外贸资讯':this.newsList = this.news.news1;break;
            case '商品讯息':this.newsList = this.news.news2;break;
            case '国外资讯':this.newsList = this.news.news3;break;
            case '学习提升':this.newsList = this.news.news4;break;
          }
        },
        viewNews(news){
          this.view = !this.view;
          this.newsDatail = news;
        }
      }
    }
</script>

<style scoped>
  .pointer:hover{
    cursor: pointer;
    color: #409EFF;
  }
</style>

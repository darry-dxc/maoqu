import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
require('es6-promise').polyfill()

axios.defaults.withCredentials=true;//让ajax携带cookie
// 引入饿了么的组件
import ElementUI, { Message,Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './../src/assets/icon/iconfont.css'
import store from '@/store/index';
import VueHighcharts from 'vue-highcharts';
import App from './App'
import VueParticles from 'vue-particles'

let Base64 = require('js-base64').Base64;//引入Base64
Vue.use(VueParticles)
Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
axios.defaults.timeout = 5000;

//处理需要登录的路由
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    store.commit('updateToken',sessionStorage.getItem('token'));
    if (store.state.token !== '') {  // 通过vuex state获取当前的token是否存在
      axios.defaults.headers.common['access-token'] = store.state.token;
      next();
    }else {
      next({
        path: '/WebPortals/Login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
   next();
  }
});
// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    if(err.response.status === 40102){
      Message.error('操作超时!请重新登录');
    }
    return Promise.reject(err)
  },
)
// http response 拦截器
axios.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      this.endLoading()
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
// Vue.prototype.callbackUrl = 'http://120.77.145.198:9007';
Vue.prototype.callbackUrl = 'https://www.moretrade.com:8888/exportOssFile';
// Vue.prototype.callbackUrl11 = 'http://120.77.255.131:9011';
Vue.prototype.callbackUrl11 = 'https://www.moretrade.com:8888/importOssFile';
Vue.prototype.registerCallbackUrl = 'https://www.moretrade.com:8888/';
Vue.prototype.$axios0 = axios.create({baseURL: 'https://www.moretrade.com:8888'});
Vue.prototype.$axios1 = axios.create({baseURL: 'https://www.moretrade.com:8888/basicService'});
Vue.prototype.$axios2 = axios.create({baseURL: 'https://www.moretrade.com:8888/sysadministrator'});
Vue.prototype.$axios3 = axios.create({baseURL: 'https://www.moretrade.com:8888/commodityEnterprise'});
Vue.prototype.$axios4 = axios.create({baseURL: 'https://www.moretrade.com:8888/exEnterpriseBusiness'});
Vue.prototype.$axios5 = axios.create({baseURL: 'https://www.moretrade.com:8888/statistics'});
Vue.prototype.$axios6 = axios.create({baseURL: 'https://www.moretrade.com:8888/personalExportBusiness'});
Vue.prototype.$axios7 = axios.create({baseURL: 'https://www.moretrade.com:8888/exportOssFile'});
Vue.prototype.$axios8 = axios.create({baseURL: 'https://www.moretrade.com:8888/personalImportBusiness'});
Vue.prototype.$axios9 = axios.create({baseURL: 'https://www.moretrade.com:8888/imEnterpriseBusiness'});
Vue.prototype.$axios10 = axios.create({baseURL: 'https://www.moretrade.com:8888/basicimoperation'});
Vue.prototype.$axios11 = axios.create({baseURL: 'https://www.moretrade.com:8888/importOssFile'});
Vue.prototype.$axios12 = axios.create({baseURL: 'https://www.moretrade.com:8888/basicimoperation'});
Vue.prototype.$axios = axios;
Vue.prototype.$axios0.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios1.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios2.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios4.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios5.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios6.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地登录!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios8.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios9.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios10.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
Vue.prototype.$axios12.interceptors.response.use(
  function(response){
    return response
  },
  function(e){
    if(e.response.status === 40102){
      Message.error('操作超时!请重新登录');
      router.push({
        path: "/WebPortals/Login"
      });
    }else if(e.response.status === 40104){
      Message.error('账号异地下线!请注意密码安全');
      sessionStorage.setItem('token','');
      router.push({
        path: "/WebPortals/Login"
      });
    }
    return Promise.reject(e.response.data)
  },
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  methods:{
    moreChart() {
        var options = this.getMoreOptions(this.type);

        if (this.chart) {
            this.chart.destroy();
        };
    // 初始化 Highcharts 图表
    this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  }
})

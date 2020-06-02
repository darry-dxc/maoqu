import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染管理员平台的tabs的数组
 * activeIndex 设置当前的个人平台活跃的条目
 * @param options1 {Array} 用于渲染企业平台的tabs的数组
 * activeIndex1设置当前的企业平台活跃的条目
 * @param options2 {Array} 用于渲染个人平台的tabs的数组
 * activeIndex1设置当前的企业平台活跃的条目
 * nickName nickPost登录的名字,岗位
 */
const store = new Vuex.Store({
  state: {
    //个人平台全局状态
      nickName:'',
      nickPhone:'',
      nickId:'',
      nickEmail:'',
      nickPost:'报关',
      userInfo:[],//使用人信息
      QuarantineList:[],//检疫检验签证申报要素
      productQualificationList:[],//产品资质信息集合
      licenseVINList:[],//许可证VIN 信息集合
      enterpriseQualificationList:[],//企业资质
    //企业平台
      nickCompanyName:'',
      nickCompanyMan:'',
      nickCompanyId:'',
      nickCompanyEmail:'',
      nickCompanyPhone:'',
      nickCompanyPost:'管理员',
      //管理员
      nickManage:"系统管理员",
      nickManageName:'',

      options: [],
      activeIndex:'/UserManage',
      options1:[],
      activeIndex1:'',
      options2:[],
      activeIndex2:'/PersonMainCon',
      businessId:'',
      businessNo:'',

      //登录token
      token:''
  },
  mutations: {
     //更新业务单号
     updateToken(state, token) {
      state.token = token;
    },
     //更新业务单号
    updateBusinessNo(state, businessNo) {
      state.businessNo = businessNo;
    },
    //更新业务单号
    updateBusinessId(state, businessId) {
      state.businessId = businessId;
    },
   //更新用户信息
    updateName(state, nickName) {
      state.nickName = nickName;
    },
    updatePhone(state, nickPhone) {
      state.nickPhone = nickPhone;
    },
    updateId(state,nickId){
      state.nickId=nickId;
    },
    updateEmail(state,nickEmail){
      state.nickEmail=nickEmail;
    },
    updatePost(state,nickPost){
      state.nickPost=nickPost;
    },
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo;
    },
    updateQuarantineList(state,QuarantineList){
      state.QuarantineList=QuarantineList;
    },
    updateProductQualificationList(state,productQualificationList){
      state.productQualificationList=productQualificationList;
    },
    updateLicenseVINList(state,licenseVINList){
      state.licenseVINList=licenseVINList;
    },
    updateEnterpriseQualificationList(state,enterpriseQualificationList){
      state.enterpriseQualificationList=enterpriseQualificationList;
    },
    //更新企业的
    updateCompanyName(state,nickCompanyName){
      state.nickCompanyName=nickCompanyName;
    },
    updateCompanyMan(state,nickCompanyMan){
      state.nickCompanyMan=nickCompanyMan;
    },
    updateCompanyId(state,nickCompanyId){
      state.nickCompanyId=nickCompanyId;
    },
    updateCompanyEmail(state,nickCompanyEmail){
      state.nickCompanyEmail=nickCompanyEmail;
    },
    updateCompanyPhone(state,nickCompanyPhone){
      state.nickCompanyPhone=nickCompanyPhone;
    },
    updateCompanyPost(state,nickCompanyPost){
      state.nickCompanyPost=nickCompanyPost;
    },
    //更新管理员
    updateManage(state,nickManage){
      state.nickManage=nickManage;
    },
    updateManageName(state,nickManageName){
      state.nickManageName=nickManageName;
    },

    // 添加管理员tabs
    add_tabs (state, data) {
      this.state.options.push(data);
    },
    // 删除管理员tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的管理员tabs
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
    // 添加企业tabs
    add1_tabs (state, data) {
      this.state.options1.push(data);
    },
    // 删除企业tabs
    delete1_tabs (state, route) {
      let index = 0;
      for (let option of state.options1) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options1.splice(index, 1);
    },
    // 设置当前激活的企业tabs
    set1_active_index (state, index) {
      this.state.activeIndex1 = index;
    },
     // 添加个人tabs
    add2_tabs (state, data) {
      this.state.options2.push(data);
    },
    // 删除个人tabs
    delete2_tabs (state, route) {
      let index = 0;
      for (let option of state.options2) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options2.splice(index, 1);
    },
    // 设置当前激活的个人tabs
    set2_active_index (state, index) {
      this.state.activeIndex2 = index;
    },
    set_options2 (state,data) {
      state.options2 = data;
    }
  }
});

export default store;

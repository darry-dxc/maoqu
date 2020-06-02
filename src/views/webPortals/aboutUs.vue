<template>
	<div id="aboutUs">
		<portals-header ref="portalsHeader"></portals-header>
		<div id="aboutUs-head">
			<img src="../../assets/images/portalsImg/aboutUs.jpg" height="100%" width="100%" />
		</div>
    <el-tabs tab-position="left" style="height: 700px;margin-left: 100px;margin-top: 20px">
      <el-tab-pane label="公司介绍">
        <div>
          <p class="text"><strong>贸趣智能综合服务平台，</strong>是深圳市贸趣网络科技股份有限公司旗下网站,运用创新联盟模式专业服务于外贸行业的领军者。</p>
          <p class="text">{{cont1}}</p>
          <p class="text"><strong>贸趣智能综合服务平台，</strong>{{cont2}}</p>
          <p class="text">联系地址：深圳市福田区福田保税区广兰道6号深装总大厦A座3楼<br/>联系电话：0755-82828592  邓小姐</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="加入我们">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="item in joinus" :name="item.title" :key="item.title">
            <template slot="title">
              <span style="font-size: 16px;color: #f49900;font-weight: bold;font-family: font-awesome">{{item.title}}</span>
              <span style="float: right;color: #C0C4CC">{{item.time}}</span>
            </template>
            <div style="white-space:pre-wrap" v-html="item.content"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <main-service style="z-index: 9999;position: fixed;right: 20px;bottom: 50px"></main-service>
		<portals-footer></portals-footer>
	</div>
</template>
<script>
  import './../../assets/css/webPortals/aboutUs.css'
  import portalsFooter from './../../components/portalsFooter.vue'
  import portalsHeader from './../../components/portalsHeader.vue'
  import mainService from './../../components/mainService.vue'
export default {
	//定义数据
  data () {
    return {
      activeNames:'',
      catalog: '目录',
      introd:'公司介绍',
      decatalog:'公司介绍',
      cont1:'贸趣首创的地区产业联盟模式，整合各地区的各项外贸服务资源和金融机构资源，为全产业提供平台，促使有能力的组织机构互相对接，形成多样化的合作纽带关系，为企业提供低成本、高保障的物流、外汇、通关、退税服务，并通过线上化的操作，掌握真实的贸易数据，建立有效的企业信用系统，联合金融机构，为外贸企业提供纯信用贷款的金融服务，为地方政府制定产业升级发展规划和扶持政策提供依据。未来，贸趣平台的贸易大数据及企业信用数据将应用于国际信用保障体系，为双边贸易保驾护航。',
      cont2:'将始终秉持“用户需求第一、拥抱市场变化、团队创新合作”的价值观，致力成为卓越创新的外贸智能综合服务平台。',
      joinus:[
        {
          title:'报关业务员3名（男女不限）',
          time:'2018-10-18',
          content:'职位要求：\n' +
            '1、20周岁以上，具有1年以上外贸业务经验优先； \n' +
            '2、熟悉外贸流程及各个环节；\n' +
            '3、具备较好的沟通、协调及执行能力，工作踏实认真、应对快捷敏锐，责任心强；\n' +
            '4、部门领导交办工作事项。\n'
        },
        {
          title:'项目助理1名（男女不限）',
          time:'2018-10-18',
          content:'工作内容：\n' +
            '1、拟定外贸客户调研工作计划，汇总调研工作结果； \n' +
            '2、不定期拜访外贸客户收集客户使用需求信息和要求；\n' +
            '3、汇总客户调研结果有针对性的提交IT部进行功能完善补充开发；\n' +
            '4、部门领导交办工作事项。\n' +
            '职位要求：\n' +
            '1、年龄25-35岁，男女不限，专科以上学历； \n' +
            '2、具有1年以上外贸综合服务平台工作经验；\n' +
            '3、熟悉外贸进出口操作流程，熟悉商检报关；\n' +
            '4、思维活跃执行力强有创新意识。\n' +
            '5、有外贸项目调研和开发工作经验优先；\n' +
            '6、较好沟通能力能把外贸企业客户的需求与平台建设对接好服务。\n'
        },
        {
          title:'报关业务总监1名（男女不限）',
          time:'2018-10-18',
          content:'职位要求：\n' +
            '1、年龄：28岁-40岁，专科以上学历，年薪25-30万； \n' +
            '2、具有5年以上报关或外贸从业经验。熟悉外贸流程及各个环节；\n' +
            '3、具备较好的沟通、协调及执行能力，工作踏实认真、应对快捷敏锐，责任心强；\n' +
            '4、有丰富的客户资源。\n'+
            '工作时间：周一至周五（早上9：00-12：00，13：30-18：00）    周六、日休息\n' +
            '公司福利： \n' +
            '1、购买社保；定期企业文体活动；\n' +
            '2、工作环境优雅，高档写字楼园区上班；\n'+
            '3、每日城区往返巴士；年假、法定假等工作福利；\n'
        }
      ]
    }
  },
  //定义组件
  components:{
			portalsFooter,
			portalsHeader,
			mainService
		},
    //定义初始化函数
  mounted(){
        this.showHead();
    },
    //定义方法
  methods:{
  	showHead(){
      	this.$refs.portalsHeader.navnum="/AboutUs";
      }
  }
}
</script>
<style >
  #aboutUs {
    background-color: white;
    min-width: 1200px;
  }
  #aboutUs .el-tabs__item{
    font-size: 24px !important;
  }
  #aboutUs .el-tabs__content{
    padding-left: 30px !important;
  }
</style>

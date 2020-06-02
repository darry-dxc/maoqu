<template>
	<div id="homePage">
   <portals-header ref="portalsHeader"></portals-header>
		<!--首页轮播图-->
    <div style="min-width: 1000px;height: 768px">
      <el-carousel :interval="5000" arrow="always" indicator-position="outside" height="768px ">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>
		<!--首页展示模块2-->
		<div class="showMod2">
			<h1 class="font-size-48 showModTitile">为你提供全方位的外贸工作和服务平台</h1>
      <div class="bigbox">
        <div class="show1">
          <div class="box1">
            <p class="p1">报关单证</p><p class="p2">生成导出</p>
          </div>
          <div class="box1">
            <p class="p1">单证校对</p><p class="p2">自动同步</p>
          </div>
          <div class="box1">
            <p class="p1">汇总统计</p><p class="p2">快速查询</p>
          </div>
        </div>
        <div class="show2">
          <div class="box2">
            <p class="p1">提醒设置</p><p class="p2">状态通知</p>
          </div>
          <div class="box2">
            <p class="p1">商品管理</p><p class="p2">编码维护</p>
          </div>
          <div class="box2">
            <p class="p1">业务台账</p><p class="p2">资金分配</p>
          </div>
          <div class="box2">
            <p class="p1">分享交流</p><p class="p2">提问讨论</p>
          </div>
        </div>
        <div class="show3">
          <div class="box3">
            <p class="p1">找服务</p><p class="p2">查报价</p>
          </div>
          <div class="box3">
            <p class="p1">发需求</p><p class="p2">等抢单</p>
          </div>
          <div class="box3">
            <p class="p1">结售汇</p><p class="p2">有优惠</p>
          </div>
          <div class="box3">
            <p class="p1">融资便利</p><p class="p2">量身定制</p>
          </div>
          <div class="box3">
            <p class="p1">权限管理</p><p class="p2">多人协作</p>
          </div>
        </div>
      </div>
		</div>
		<!--首页展示模块3-->
		<div class="showMod3">
			<div class="top">
				<h1 class="font-size-48">外贸从未如此轻松</h1>
				<p class="p-white font-size-24">无论你想制作报关单证、跟踪工作日程、统计数据还是寻找物流服务商，在贸趣的工作台<br />都将变成简单的几个操作，鼠标轻点，工作轻松完成。</p>
			</div>
			<div class="contain1">
        <div class="cardbox">
          <div class="card">
            <div class="card-icon1"></div>
            <h1>外贸工作台</h1>
            <p>
              矩阵式跟单界面，业务进程一目了然，随时跟踪，随时操作，您不再需要为了翻查一笔业务的当前进度，翻箱倒柜，或者到处打电话了。自动化跟单，你不再需要考验自己的记忆力。
            </p>
          </div>
          <div class="card">
            <div class="card-icon2"></div>
            <h1>零经验报关操作自如</h1>
            <p>
              随时下单随时申报，提交资料即可安心等候服务，10分钟内为您匹配优质报关员，报关情况透明可见。
            </p>
          </div>
          <div class="card">
            <div class="card-icon3"></div>
            <h1>自动化单证制作</h1>
            <p>
              选择模板导入数据，可根据使用习惯自定义设置，几秒生成需求订单，为您节省时间成本。
            </p>
          </div>
        </div>
			</div>
      <div class="top">
        <h1 class="font-size-48">移动跟单，掌控业务</h1>
        <p class="p-white font-size-24">
          现在，您在手机上，也可以快速了解业务进展的状态，在手机上下载和查看单证，一键转发给相关工作人员。
          <br />还能通过快速KPI查看，对业绩情况了然在心。更有消息提醒，让你不再错过出货的关键时间节点。
        </p>
      </div>
      <div class="mobile" />
		</div>
    <!-- 首页展示模块4-->
    <div class="security">
      <h1 class="font-size-48 showModTitile">六大安全措施 让你安心“触网”</h1>
      <div class="showBox4">
        <div class="sicon">
          <div class="s-left">
            <div class="l11" />
            <div class="l12">
              <h3>物理安全</h3>
              <p>采用高性能、高安全级别的腾讯云服务</p>
            </div>
            <div class="l21" />
            <div class="l22">
              <h3>数据安全</h3>
              <p>企业数据隔离释放互不可见</p>
            </div>
            <div class="l31" />
            <div class="l32">
              <h3>容灾保障</h3>
              <p>双活运行模式异地实时备份</p>
            </div>
          </div>
          <div class="s-right">
            <div class="r11" />
            <div class="r12">
              <h3>服务安全</h3>
              <p>安全团队7X24小时待命</p>
            </div>
            <div class="r21" />
            <div class="r22">
              <h3>访问安全</h3>
              <p>基于角色单独授权密码强度自动判断</p>
            </div>
            <div class="r31" />
            <div class="r32">
              <h3>传输安全</h3>
              <p>银行级信息加密链接</p>
            </div>
          </div>
        </div>
        <div class="simg"></div>
      </div>
    </div>
    <main-service style="z-index: 9999;position: fixed;right: 20px;bottom: 50px"></main-service>
    <portals-footer></portals-footer>
	</div>
</template>

<script>
	import './../../../src/assets/css/homePage.css';
	import pic1 from './../../../src/assets/images/portalsImg/homeRotationMap1.jpg'
  import pic2 from './../../../src/assets/images/portalsImg/homeRotationMap2.jpg'
  import pic3 from './../../../src/assets/images/portalsImg/homeRotationMap3.jpg'
  import pic4 from './../../../src/assets/images/portalsImg/homeRotationMap4.jpg'
  import portalsFooter from './../../components/portalsFooter.vue'
  import portalsHeader from './../../components/portalsHeader.vue'
  import mainService from './../../components/mainService.vue'
	export default {
		//定义数据
		data () {
			return {
				imgList:[
				  pic1,pic2,pic3,pic4
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
        this.$refs.portalsHeader.navnum="/HomePage";
      },
		}
	}
</script>

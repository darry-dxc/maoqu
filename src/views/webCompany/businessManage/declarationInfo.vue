<template>
  <div style="height: 800px;overflow: auto">
    <el-row  style="padding: 10px;">
      <el-col :span="20" style="font-size: 22px">
        <label>业务单号：<span style="color:#F49900;">{{businessNo}}</span></label>
      </el-col>
       <el-col :span="4"><el-button round type="warning"  @click="backMsg"><i class="el-icon-back" />返回服务单信息</el-button></el-col>
    </el-row>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="service">
        <template slot="title">
          <span style="font-size: 18px;margin-left: 12px;color:#409EFF"><i class="el-icon-menu" /> 展开相关服务单</span>
        </template>
        <el-row style="padding: 0 20px;line-height: 40px;font-size: 14px">
          <el-col :span="7">
            <span>服务单:</span>
            <span style="color:#F49900;" v-if="serviceNo !== ''">
              {{serviceNo}}【{{serviceStatus}}】
            </span>
          </el-col>
          <el-tooltip placement="right" effect="dark" content="Right">
            <div slot="content">Phone:{{receiverPhone}}<br/>Email:{{receiverMail}}</div>
            <el-col :span="5"  class="servicedeclarationformMid" >报关员：<span style="color:#F49900;">{{author1}}</span> </el-col>
          </el-tooltip>
          <el-col :span="10">
            <el-button type="danger" v-show="isDel" @click="delServiceOrder" >删除</el-button>
            <el-button  :disabled="sendFlag" @click="sendDeclareBtn" type="primary" >派单</el-button>
            <el-dialog
              title="向指定业务员派单"
              :visible.sync="sendDeclare"
              width="40%"
            >
              <el-form :model="postForm" :rules="postRules" ref="postForm">
                <el-form-item prop="userName">
                  <el-select v-model="postForm.userName" @change="userSelect" clearable placeholder="请选择报关员" style="width: 50%">
                    <el-option
                      v-for="item in userOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-row style="margin-top: 40px">
                  <el-col :span="6" style="line-height: 32px">
                    指定接单时限:
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="limitDay">
                      <el-input v-model.number="postForm.limitDay" size="small">
                        <template slot="append">天</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="limitHour">
                      <el-input v-model.number="postForm.limitHour" size="small" >
                        <template slot="append">时</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="limitMinute">
                      <el-input v-model.number="postForm.limitMinute" size="small">
                        <template slot="append">分</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="sendDeclare = false">取 消</el-button>
                  <el-button type="primary" @click="postDeclaration('postForm')">确 定</el-button>
                </span>
            </el-dialog>
            <el-button  class="undoService" :disabled="cancelFlag" @click="cancelExport" type="primary" >撤销服务</el-button>
            <el-button  class="downloadService" v-show="loadFlag" @click="download" type="primary" >下载</el-button>
            <el-button  class="assessService" :disabled="true" type="primary" >评价服务</el-button></el-col>
        </el-row>
        <el-row >
          <el-col :span="3" style="text-align: center">
            <img src="./../../../assets/images/companyIcon/customClearance.png" @click="showSerFrom" height="80px" width="80px" style="margin-top: 20px"/>
          </el-col>
            <el-dialog title="报关单" :visible.sync="dialogTableVisible1" width="1200px">
            
            </el-dialog>
          <el-col :span="18">
            <el-steps :active="status" finish-status="success" class="customSchedule">
              <el-step title="未派单"></el-step>
              <el-step title="受理中"></el-step>
              <el-step title="制单中 "></el-step>
              <el-step title="审核中 "></el-step>
              <el-step title="申报中"></el-step>
              <el-step title="已完成"></el-step>
            </el-steps>
          </el-col>
          <el-col :span="3" >
            <el-button class="auditOpinion" style="margin: 40px" @click="dialogTableVisible = true">审核意见</el-button>
          </el-col>
          </el-row>
          <el-dialog title="审核意见" :visible.sync="dialogTableVisible" >
            <el-table :data="gridData">
              <el-table-column property="opinionNo" label="序号" width="150"></el-table-column>
              <el-table-column property="opinionState" label="审核状态" width="200"></el-table-column>
              <el-table-column property="opinionTime" label="审核时间"></el-table-column>
              <el-table-column property="opinionCheck" label="审核意见"></el-table-column>
            </el-table>
          </el-dialog>
      </el-collapse-item>
      <el-collapse-item name="business">
        <template slot="title">
          <span style="font-size: 18px;margin-left: 12px;color:#409EFF"><i class="el-icon-menu" /> 展开业务单信息</span>
        </template>
        <el-row>
            <el-col :span="10"><span>公司名称：<span style="color:#F49900;">{{enterpriseName}}</span></span></el-col>
            <el-col :span="4"><span class="textRight">合同号:<span style="color:#F49900;">{{contractNo}}</span></span></el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span>创建人：<span style="color:#F49900;">{{author}}</span></span></el-col>
            <el-col :span="4"><span class="textRight">建单日期：{{createTime}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-radio-group v-model="radio" style="height: 16px;line-height: 16px">
              <el-radio label="订舱" disabled >订舱</el-radio>
              <el-radio label="拖车" disabled >拖车</el-radio>
              <el-radio label="熏蒸" disabled >熏蒸</el-radio>
              <el-radio label="报关">报关</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-button  @click="editCancle" v-show="cancle" size="small">取消</el-button>
            <el-button type="primary"  @click="btnChange" size="small" :disabled="isOrderUnSend">{{editInfo}}</el-button>
          </el-col>
        </el-row>
        <Declarationdeclarationform ref="Decdeclarationform" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="text/javascript">
import './../../../assets/css/webCompany/declarationInfo.css';
import Declarationdeclarationform from './component/declarationform.vue'
import { mapState } from 'vuex'
  export default {
  //定义数据
  data () {
    return {
      activeNames:[],
      receiverPhone:'',
      receiverMail:'',
      sendFlag:true,
      userOptions:[],
      userName:'',
      allUser:[],
      sendDeclare:false,
      cancelFlag:true,
      loadFlag:false,
      show1:true,
      cancle:false,
      decShow:false,
      showHead:true,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      isDel:false,//是否可以删除
      gridData:[],
      editInfo:"修改",
      buttonInfo:"收起业务单信息",
      buttonDecInfo:"收起相关服务单",
      isOrderUnSend:false,//订单未派单可以修改
      enterpriseName:'',
      contractNo:'',
      author:'',
      author1:'',
      createTime:'',
      status: 0,
      serviceNo:'',
      serviceStatus:'',
      radio:'报关',
       postForm:{
                userName:'',
                limitDay:0,
                limitHour:0,
                limitMinute:10
              },
              postRules:{
                userName:[{ required: true, message: '请选择派单员',trigger: 'change'}],
                limitDay:[
                  { required: true, message: '请输入天数', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitHour:[
                  { required: true, message: '请输入小时', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitMinute:[
                  { required: true, message: '请输入分钟', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
              }
    }
  },
  props:['infoFlag'],
  //定义组件
  components:{
    Declarationdeclarationform,
    
  },
  computed:{
     ...mapState(['businessNo','businessId','nickCompanyName'])
     },
  mounted(){
    this.queryAllUserName();
    console.log(this.businessId);
     },
  //定义方法
  methods:{
     //获取所有报关员
        queryAllUserName(){
          this.userOptions = [];
            this.$axios4.post('/getAllDeclareUserInfo')
              .then((res) => {
                for(let i = 0;i<res.data.length;i++){
                  this.userOptions.push({
                    value:res.data[i].userId,
                    label:res.data[i].userName
                  })
                }
              }).catch((e) => {
                console.log(e);
            })
        },
        //选取派单员
        userSelect(id){
          let userSelect = this.userOptions.find((item) => {
            return item.value === id;
          });
          this.receiverName = userSelect.label;
        },
    //派单按钮
    sendDeclareBtn(){
      this.sendDeclare = true;
      this.postForm.userName = '';
      this.postForm.limitDay = 0;
      this.postForm.limitHour = 0;
      this.postForm.limitMinute = 10;
    },
    //派单(暂定最少派单时间为10分钟)
        postDeclaration(formName){
          /*派单*/
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.postForm.limitDay !== 0 || this.postForm.limitHour !== 0 || this.postForm.limitMinute >= 10){
                let params = {
                  'businessId':this.businessId,
                  'receiverId':this.postForm.userName,
                  'receiverName':this.receiverName,
                  'day':this.postForm.limitDay,
                  'hour':this.postForm.limitHour,
                  'minute':this.postForm.limitMinute,
                  'enterpriseName':this.nickCompanyName,
                };
                console.log(params);
                this.$axios4.post('/dispatchOrCancelExportDeclare',params)
                  .then((res) => {
                    console.log(res);
                    if(res.data.state === 1){
                      this.$message.success('派单成功!');
                      this.isDel= false;
                      this.cancelFlag = false;//撤销服务可用
                      this.sendFlag=true;
                      this.serviceStatus='受理中';
                      this.author1=this.receiverName;
                      this.status=1;
                      this.sendDeclare = false;
                    }else if(res.data.state === 2){
                      this.$message.error('报关员不存在!');
                    }else{
                      this.$message.error('派单失败!');
                    }
                  }).catch((e) => {
                  console.log(e);
                })
              }else {
                this.$message.error('最小接单时限为10分钟!');
                return false;
              }
            } else {
              return false;
            }
          });

        },
    //点击报关单图片
    showSerFrom(){
      if( this.serviceStatus == "未派单"){
        this.$message.warning("该服务未派单,无法查看报关单")
      }else if(this.serviceStatus == "受理中"){
        this.$message.warning("该服务受理中,无法查看报关单")
        this.dialogTableVisible1=true;

      }else{
         this.$refs.Export.orderCon();
        //查看报关单
      }
    },
    //点击返回服务单单
        backMsg(){
          this.$parent.infoFlag=false;
          this.$parent.exportFlag=false;
          this.$parent.customFlag=true;
          this.$parent.queryFlag=true;
          this.$parent.queryFlag2=true;
          this.$parent.exportDivFlag=true;
          this.$parent.radio = '报关';
          this.editInfo="修改";
          this.$refs.Decdeclarationform.isEdit=true;
          this.cancle=false;
        },
    //点击其他服务
    btn1(){
      this.$message.warning('暂时只支持报关功能！');
    },
    //下载事件
    download(){
      this.$refs.Export.printForm();
    },
    //撤销服务
      cancelExport(){
          let param={
            businessId:this.businessId,
          };
          console.log(param);
          this.$axios4.post('/dispatchOrCancelExportDeclare',param)
          .then((response) =>{
            console.log(response);
            let res = response.data;
           if(res.state==1){
            this.$message.success('恭喜您，撤销成功！');
            this.serviceStatus = "未派单";
            this.status =0;
            this.sendFlag=false;//派单按钮可用
            this.cancelFlag = true;//撤销服务可用
           }else if(res.state==0){
            this.$message('派单中,撤销失败');
           }else{
             console.log("请求失败");
          }
          })
          .catch(function (error) {
            console.log(error);
          });
       },
    // 展开收起业务单
    showInfo(){
    if(this.buttonInfo=="显示业务单信息"){
      this.show1=true;
      this.decShow=true;
      this.buttonInfo="收起业务单信息";
    }
    else if(this.buttonInfo=="收起业务单信息"){
      this.show1=false;
      this.decShow=false;
      this.editInfo="修改";
      this.$refs.Decdeclarationform.isEdit=true;
      this.cancle=false;
      this.buttonInfo="显示业务单信息";
    }
    },
    //显示服务单信息
    showDecInfo(){
    if(this.buttonDecInfo=="显示相关服务单"){
      this.showHead=true;
      this.buttonDecInfo="收起相关服务单";
    }
    else if(this.buttonDecInfo=="收起相关服务单"){
      this.showHead=false;
      this.buttonDecInfo="显示相关服务单";
    }

    },
    //修改和确定按钮切换
    btnChange(){
      if(this.editInfo=="修改"){
        this.cancle=true;
        this.$refs.Decdeclarationform.isEdit=false;
        this.editInfo="确定";
      }
      else if(this.editInfo=="确定"){
        this.editInfo="修改";
        this.$refs.Decdeclarationform.isEdit=true;
        this.cancle=false;
        //修改报关单
        this.$refs.Decdeclarationform.updateExportService();
      }
    },
    //点击取消按钮之后的按钮组显示操作
    editCancle(){
      this.cancle=false;
      this.$refs.Decdeclarationform.isEdit=true;
      this.editInfo="修改";
      this.$refs.Decdeclarationform.findExportService(this.businessId);
      console.log("点击取消之后执行一遍查询函数");
    },
    //点击报关 显示业务单详情
    showDecFrom(val){
      this.decShow=true;
      this.$refs.Decdeclarationform.findExportService(val);
    },
    //删除服务单
    delServiceOrder(){
      this.$confirm('此操作将永久删除该服务单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios4.post('/deleteExDecService',{ businessId:this.businessId })
          .then((response) => {
            console.log(response);
            if(response.data.state === 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit('backBsOrder');
            }else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

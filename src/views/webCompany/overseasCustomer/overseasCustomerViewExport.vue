<template>
  <div>
    <el-dialog title="境外收发货人" :visible.sync="dialogFormVisible" width="800px">
        <el-form :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="境外收发货人代码" label-width="150px" class="form-item">
                <el-input v-model="form.ovRsCode" size="small" placeholder="境外收发货人代码" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称" label-width="150px" class="form-item" required>
                <el-input v-model="form.customerName" size="small" placeholder="企业名称(外文)" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属企业" label-width="150px"  class="form-item" required>
                <el-input v-model="form.ownedEnterpriseName" size="small" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运抵国(地区)" label-width="150px" class="form-item" required>
                <el-select v-model="form.arrivalCountry" size="small" :filter-method="arrivalCountrysFilter" filterable clearable style="width: 100%">
                  <el-option
                    v-for="item in arrivalCountrysAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="指运港" label-width="150px" class="form-item" required>
                <el-select v-model="form.arrivalPort" size="small" style="width: 100%" :filter-method="originPortsFilter" filterable clearable>
                  <el-option
                    v-for="item in originPortsAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贸易国别(地区)" label-width="150px" class="form-item" required>
                <el-select v-model="form.tradeCountry" size="small" :filter-method="tradeCountrysFilter" style="width: 100%" filterable clearable >
                  <el-option
                    v-for="item in tradeCountrysAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="离境口岸" label-width="150px" class="form-item" required>
                <el-select v-model="form.exportPort" size="small" style="width: 100%" :filter-method="entrytPortsFilter" filterable clearable >
                  <el-option
                    v-for="item in entrytPortsAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位电话" label-width="150px"  class="form-item">
                <el-input v-model="form.customerPhone" size="small"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位传真" label-width="150px" class="form-item">
                <el-input v-model="form.customerFax" size="small"/>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="单位地址" label-width="150px" class="form-item">
                <el-input v-model="form.customerAddress" size="small"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="特殊关系确认" label-width="150px"  class="form-item">
                <el-select v-model="form.relationshipCon" size="small" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格影响确认" label-width="120px"  class="form-item">
                <el-select v-model="form.priceCon" size="small" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="特许费确认" label-width="120px" class="form-item">
                <el-select v-model="form.franchiseFeeCon" size="small" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="上传附件" label-width="150px" class="form-item">
              <el-col :span="12"><el-upload
                class="upload-demo"
                ref="upload"
                :action="postURL"
                :accept='acceptType'
                :multiple="false"
                :auto-upload="false"
                :data="postData"
                :limit='1'
                :file-list="fileList1"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-change="getName1"
                >
               <label class="uploadlable1">商标登记证<br></label>
               <el-button size="small" type="primary">点击上传</el-button>
               </el-upload>
             </el-col>
              <el-col :span="12"><el-upload
              class="upload-demo"
              ref="upload2"
              :action="postURL"
              :accept='acceptType'
              :multiple="false"
              :auto-upload="false"
              :data="postData"
              :limit='1'
              :file-list="fileList2"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-change="getName2"
              >
               <label class="uploadlable1">商品授权书<br></label>
               <el-button size="small" type="primary">点击上传</el-button>
               </el-upload>
             </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建人" label-width="150px" class="form-item">
                <el-input v-model="form.author" disabled size="small"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间" label-width="150px" class="form-item" >
                <el-input v-model="form.createTime" disabled size="small"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="修改人" label-width="150px" class="form-item">
                <el-input v-model="form.editor" disabled size="small"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="修改时间" label-width="150px" class="form-item">
                <el-input v-model="form.lastEditTime" disabled size="small"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="updateImOvSeasCustomer" size="small">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webCompany/overseasCustomerEdit/overseasCustomerEdit.css';
  export default {
    data() {
      return {
        dialogFormVisible: false,//弹出框显示
        successFlag:0,//上传文件成功标志，用于文件有动作时获取名字函数中排除上传成功动作，0为非，1为是
        name1:'',
        name2:'',//用于保存两个文件的名称
        customerId:'',//客户Id
        ownedEnterpriseId:this.nickCompanyId,//客户所属公司ID
        postURL:'',//上传服务器的请求地址
        acceptImgType:'.png,.jpg,.jpeg',//上传图片允许的文件类型
        acceptType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
        postData:{},
        fileList1:[],
        fileList2:[],
        postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
        uploadFilePrams:[],//上传文件回调参数的callbackbody
        postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
        //详见接口文档 回调插入业务附件表数据
        form: {
          ovRsCode:'',//速记代码
          customerName:'',//境外客户名称
          arrivalCountry:'',//运抵国
          arrivalPort:'',//指运港
          tradeCountry:'',//贸易国
          originPort:'',
          entrytPort:'',
          stopOverPort:'',
          author:this.nickCompanyMan,//创建人
          createTime:'',
          editor:this.nickCompanyMan,
          lastEditTime:'',
          ownedEnterpriseId:this.nickCompanyId,//客户所属公司ID
          ownedEnterpriseName:this.nickCompanyName,//所属公司名称
          customerAddress:'',
          customerPhone:'',//客户电话
          customerFax:'',
          relationshipCon:'',//特殊关系确认
          priceCon:'',//价格影响确认
          franchiseFeeCon:'',//特许费确认
          trademarkRegistrateCertificate:'',//商标登记证
          trademarkAttorney:'',//商标授权书
        },
        arrivalCountrys:[],//运抵国
        arrivalCountrysAll:[],
        arrivalPorts:[],//指运港
        tradeCountrys:[],//贸易国
        tradeCountrysAll:[],
        entrytPortsAll:[],
        entrytPorts:[],
        originPortsAll:[],
        stopOverPortsAll:[],
        ports:[],
        options: [{
          value:'0',
          label:'否'
        },{
          value:'1',
          label:'是'
        },{
          value:'9',
          label:'空'
        }],
        value:'选项3',
      }
    },
    //定义初始化函数
    mounted(){
      this.form.author=this.nickCompanyMan;
      this.form.editor=this.nickCompanyMan;
      this.form.ownedEnterpriseName=this.nickCompanyName;
      this.loadStaticData();
      this.$nextTick(function () {
        this.getUpload();
      });
    },
    computed:{
      nickCompanyMan(){
        return this.$store.state.nickCompanyMan;
      },
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      }
    },
    methods:{
      editOvCustomer(id){
        this.dialogFormVisible = true;
        this.customerId = id;
        this.$axios3.post('/exOvCustomerDetailSearch',{
          customerId:id
        }).then((res) => {
          if(res.data.code === 200){
            this.form = res.data.data;
            if(this.form.trademarkAttorney !== undefined && this.form.trademarkAttorney !== ''){
              let trademarkAttorney = this.form.trademarkAttorney.split('/');
              this.fileList2 = [{ name:trademarkAttorney[trademarkAttorney.length - 1] }];
            }else {
              this.fileList2 = [];
              this.name2 = '';
            }
            if(this.form.trademarkRegistrateCertificate !== undefined && this.form.trademarkRegistrateCertificate !== ''){
              let trademarkRegistrateCertificate = this.form.trademarkRegistrateCertificate.split('/');
              this.fileList1 = [{ name:trademarkRegistrateCertificate[trademarkRegistrateCertificate.length - 1] }];
            }else {
              this.fileList1 = [];
              this.name1 = '';
            }
            this.form.ownedEnterpriseName = this.nickCompanyName;
            setTimeout(() => {
              this.getInitData();
            },200)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      updateImOvSeasCustomer() {
        if(this.form.customerName === ''){
          this.$message.error('请输入企业名称!')
        }else {
          if(this.name1 === ''){
            this.form.trademarkRegistrateCertificate = ''
          }
          if(this.name2 === ''){
            this.form.trademarkAttorney = ''
          }
          let param = {
            ownedEnterpriseId: this.nickCompanyId,
            customerId: this.customerId,
            customerName: this.form.customerName,
            ovRsCode: this.form.ovRsCode,
            arrivalCountry: this.form.arrivalCountry,
            arrivalPort: this.form.arrivalPort,
            exportPort: this.form.exportPort,
            stopOverPort: this.form.stopOverPort,
            tradeCountry: this.form.tradeCountry,
            customerFax:this.form.customerFax,
            customerAddress: this.form.customerAddress,
            customerPhone: this.form.customerPhone,
            relationshipCon: this.form.relationshipCon,
            priceCon: this.form.priceCon,
            franchiseFeeCon: this.form.franchiseFeeCon,
            trademarkRegistrateCertificate: this.form.trademarkRegistrateCertificate,
            trademarkAttorney: this.form.trademarkAttorney,
            editor: this.form.editor,
          };
          console.log(param)
          this.$axios3.post('/updateOverseasCustomer', param)
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 200){
                this.$message.success('境外收发货人修改成功');
                this.dialogFormVisible = false;
                this.$emit('query');
                this.upload();
              }else {
                this.$message.error(res.data.msg);
              }
            }).catch((e) => {
            console.log(e);
          });
        }
      },
      /*获取上传文件的临时秘钥及相关签名字段*/
      getUpload(){
        this.$axios7.get('file/Upload',{
          params:{
            'Bucket':'enterprise'
          }
        }).then((res) => {
          this.postURL = res.data.host;//对应bucket的公网访问地址
          this.postExpire = res.data.expire;
          this.uploadData=res.data;//将返回的签名等存储起来
          this.postState=1;//标志获取上传文件签名等数据成功
          return 1;
        }).catch((e) => {
          this.postState=0;//标志获取上传文件签名等数据失败；
          this.$message({
            showClose:true,
            message:'获取上传文件权限出错，请稍后刷新页面再试！',
            type:'error',
          });
          return 0;
        });
      },
      /*设置上传文件的地址，因用数据绑定方式不生效，因此用函数返回方式*/
      postUrl(){
        return this.postURL;
      },
      /*文件上传成功时钩子绑定的方法*/
      fileUploadSuccess(response,file,fileList){
        console.log(response)
        this.name1="";
        this.name2="";
        this.fileList1 = [];
        this.fileList2 = [];
      },
      /*文件上传失败时钩子绑定的方法*/
      fileUploadError(response,file,fileList){
        console.log(response)
        this.name1="";
        this.name2="";
        this.fileList1 = [];
        this.fileList2 = [];
      },
      //上传之前获取文件名
      getName1(file){
        this.name1=file.name;
      },
      getName2(file){
        this.name2=file.name;
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning("当前限制只能选择1个文件！第2个文件上传失败！");
      },
      /*上传文件函数*/
      upload(){
        /*获取当前时间判断签名是否过期，过期则重新获取，3s缓冲*/
        let now = Date.parse(new Date())/1000;
        if (parseInt(this.postExpire) <(now+3) || this.postState !== 1 ){//即将过期或初始化时获取失败
          this.getUpload();
          setTimeout(function () {
            this.setUpload();
          }.bind(this),600);
        }else {
          this.setUpload();//不需要重新获取则直接配置参数并上传
        }
      },
      /*上传文件的配置参数及上传动作*/
      setUpload(){
        if (this.postState === 1){
          this.postData = {
            'policy':this.uploadData.policy,
            'OSSAccessKeyId':this.uploadData.accessid,
            'success_action_status':'200',
            'x-oss-security-token' : this.uploadData["security-token"],
            'signature': this.uploadData.signature,
            'key':this.customerId+'/'+this.ownedEnterpriseId+'/oversea'+'/${filename}',//上传文件的object名称。
          };
          let callback = this.setCallbackData();
          this.postData["callback"]=callback;
          this.$nextTick(function(){
            this.$refs.upload.submit();
            this.$refs.upload2.submit();
          })
        } else{//获取密钥失败
          this.$message({
            showClose:true,
            message:'注册表单信息上传成功，文件上传失败！',
            type:'error',
          });
        }
      },
      /*设置回调时给服务器的参数*/
      setCallbackData(){
        this.uploadFilePrams = [];
        let param = {
          "customerId":this.customerId,
          "businessType":'export',
          "ownedEnterpriseId": this.nickCompanyId,
        }
        if(this.name1 !== '')
          param.trademarkRegistrateCertificate = this.customerId+'/'+this.nickCompanyId+'/overseaCustomer/'+this.name1;
        if(this.name2 !== '')
          param.trademarkAttorney = this.customerId+'/'+this.nickCompanyId+'/overseaCustomer/'+this.name2;
        this.uploadFilePrams = [param]
        console.log('参数',param)
        this.postCallback={
          "callbackUrl":this.callbackUrl+"/file/callback?Type=2",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify(this.uploadFilePrams),
        };
        return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          this.$axios.get('static/pub_domesticport.json'),//入境口岸
          this.$axios.get('static/pub_checkout_organization.json'),//机关
          this.$axios.get('static/pub_levynature.json'),//征免性质
          this.$axios.get('static/pub_supervisemode.json'),//监管方式
          this.$axios.get('static/pub_transportationport.json'),//经停港/启运港
        ]).then(this.$axios.spread((
          res_countryregion,
          res_domesticport,
          res_checkout_organization,
          res_levynature,
          res_supervisemode,
          res_transportationport
        ) => {
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
          this.entrytPorts = res_domesticport.data.RECORDS;
          this.entrytPortsAll = this.entrytPorts.slice(0,19);
          this.organizations = res_checkout_organization.data.RECORDS;
          this.inspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
          this.portInspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
          this.desInspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
          this.portInspectOrgansAll = this.organizations.slice(0,19);
          this.exemptionNatures = res_levynature.data.RECORDS;
          this.exemptionNaturesAll = this.exemptionNatures.slice(0,19);
          this.supervisionModes = res_supervisemode.data.RECORDS;
          this.supervisionModesAll = this.supervisionModes.slice(0,19);
          this.ports = res_transportationport.data.RECORDS;
          this.originPortsAll = this.ports.slice(0,19);
          this.stopOverPortsAll = this.ports.slice(0,19);
        })).catch((e) => {
          console.log(e);
        })
      },
      getInitData(){
        this.tradeCountrysFilter(this.form.tradeCountry);
        this.arrivalCountrysFilter(this.form.arrivalCountry);
        this.entrytPortsFilter(this.form.exportPort);
        this.originPortsFilter(this.form.arrivalPort);
      },
      //贸易国
      tradeCountrysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.tradeCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      arrivalCountrysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.arrivalCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      entrytPortsFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.entrytPortsAll = this.entrytPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.entrytPortsAll = this.entrytPorts.slice(0,19);
        }
      },
      originPortsFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.originPortsAll = this.ports.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.originPortsAll = this.ports.slice(0,19);
        }
      }
    },
  }
</script>

<style scoped>
  .form-item {
    margin: 1px 0;
  }
</style>

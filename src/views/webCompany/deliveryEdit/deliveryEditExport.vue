<template>
  <div>
    <el-dialog title="编辑收发货单位信息" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="form" >
        <el-row>
          <el-form-item label="单位名称" label-width="150px" required class="form-item">
            <el-col :span="6">
              <el-input size="small" auto-complete="off" placeholder="社会信用代码"  v-model="form.enterpriseCreditCode"/>
            </el-col>
            <el-col :span="6">
              <el-input size="small" auto-complete="off" placeholder="海关代码"  v-model="form.enterpriseCustomsCode"/>
            </el-col>
            <el-col :span="6">
              <el-input size="small" auto-complete="off" placeholder="检疫编码"  v-model="form.enterpriseQuarantineCode"/>
            </el-col>
            <el-col :span="6">
              <el-input size="small" auto-complete="off" placeholder="企业名称"  v-model="form.enterpriseName"/>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="单位性质" label-width="150px" class="form-item" required>
              <el-checkbox-group v-model="enterpriseNatureCheck" :min="1" size="small" >
                <el-checkbox :label='0' disabled>境内收发货人</el-checkbox>
                <el-checkbox :label='1'>生产销售单位</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监管方式" label-width="150px" class="form-item" required>
              <el-select v-model="form.supervisionMode" size="small" :filter-method="supervisionModesFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in supervisionModesAll"
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
            <el-form-item label="征免性质" label-width="150px" class="form-item">
              <el-select v-model="form.exemptionNature" size="small" :filter-method="exemptionNaturesFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in exemptionNaturesAll"
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
            <el-form-item label="检验检疫受理机关" label-width="150px" class="form-item">
              <el-select v-model="form.inspectionAndQuarantineOrgan" :filter-method="inspectionAndQuarantineOrgansFilter" size="small" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in inspectionAndQuarantineOrgansAll"
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
            <el-form-item label="领证机关" label-width="150px" class="form-item">
              <el-select v-model="form.certificationAuthority" size="small" :filter-method="certificationAuthoritysFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in certificationAuthoritysAll"
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
            <el-form-item label="口岸检验检疫机关" label-width="150px" class="form-item">
              <el-select v-model="form.portInspectionAndQuarantineOrgan" size="small" :filter-method="portInspectionAndQuarantineOrgansFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in portInspectionAndQuarantineOrgansAll"
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
            <el-form-item label="目的地检验检疫机关" label-width="150px" class="form-item">
              <el-select v-model="form.desInspectionAndQuarantineOrgan" size="small" :filter-method="desInspectionAndQuarantineOrgansFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in desInspectionAndQuarantineOrgansAll"
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
            <el-form-item label="单位电话" label-width="150px" class="form-item">
              <el-input  auto-complete="off" size="small" v-model="form.enterprisePhone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位传真" label-width="150px" class="form-item">
              <el-input  auto-complete="off" size="small" v-model="form.enterpriseFax"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生产厂家" label-width="150px" class="form-item">
              <el-input  auto-complete="off" size="small" v-model="form.manufacturer"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产地址" label-width="150px" class="form-item">
              <el-input  auto-complete="off" size="small" v-model="form.productionAddress"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="上传附件" label-width="150px" class="form-item">
            <el-col :span="8">
              <el-upload
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
                :on-remove="handleRemove1"
                :on-exceed="handleExceed"
                :on-change="getName1"
              >
              <label class="uploadlable1">营业执照<br></label>
              <el-button type="primary" size="small">点击上传</el-button>
            </el-upload>
            </el-col>
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                ref="upload3"
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
                :on-remove="handleRemove2"
                :on-exceed="handleExceed"
                :on-change="getName2"
            >
              <label class="uploadlable1">报关单位注册登记证书<br></label>
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </el-col>
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                ref="upload2"
                :action="postURL"
                :accept='acceptType'
                :multiple="false"
                :auto-upload="false"
                :data="postData"
                :limit='1'
                :file-list="fileList3"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove3"
                :on-exceed="handleExceed"
                :on-change="getName3"
            >
              <label class="uploadlable1">对外贸易经营者备案登记表<br></label>
              <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人" label-width="150px"  class="form-item">
              <el-input  size="small" v-model="form.author" disabled = "disabled"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" label-width="150px"  class="form-item">
              <el-input size="small"  v-model="form.createTime" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="修改人" label-width="150px"  class="form-item">
              <el-input size="small" v-model="form.editor" disabled = "disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修改时间" label-width="150px"  class="form-item">
              <el-input size="small"  v-model="form.lastEditTime" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveInfo" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    data() {
      return {
        deliveryId:'',
        dialogFormVisible: false,
        enterpriseId:null,
        enterpriseNatureCheck:[0],
        exemptionNatures:[],
        exemptionNaturesAll: [],//征免性质
        supervisionModes:[],
        supervisionModesAll: [],//监管方式
        organizations:[],
        inspectionAndQuarantineOrgansAll:[],
        certificationAuthoritysAll:[],
        portInspectionAndQuarantineOrgansAll:[],
        desInspectionAndQuarantineOrgansAll:[],
        author:'',
        editor:'',
        ownedEnterpriseId:this.nickCompanyId,
        name1:'',
        name2:'',
        name3:'',
        postURL:'',//上传服务器的请求地址
        acceptImgType:'.png,.jpg,.jpeg',//上传图片允许的文件类型
        acceptType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
        postData:{},
        fileList:[],//待上传文件列表，element自动生成
        fileList1:[],
        fileList2:[],
        fileList3:[],
        postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
        uploadFilePrams:[],//上传文件回调参数的callbackbody
        postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
        //详见接口文档 回调插入业务附件表数据
        form: {
          enterpriseNature:'',
          supervisionMode:'',
          enterpriseName:'',
          enterpriseQuarantineCode:'',
          enterpriseCustomsCode:'',
          enterpriseCreditCode:''
        },
        sizeForm: {
          name: '',
          type: [],
        },
      }
    },
    //定义初始化函数
    mounted(){
      this.form.author=this.nickCompanyMan;
      this.form.editor=this.nickCompanyMan;
      this.author=this.nickCompanyMan;
      this.editor=this.nickCompanyMan;
      this.loadStaticData();
      this.getUpload();
    },
    computed:{
      nickCompanyMan(){
        return this.$store.state.nickCompanyMan;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      },
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      }
    },
    methods:{
      //根据id查询境内收发货人详情
      editDelivery(val){
        this.dialogFormVisible = true;
        this.deliveryId = val;
        this.$axios3.post('/deliveryDetailSearch',{
          deliveryId:val
        }).then((res) => {
          if(res.data.code === 200){
            this.form = res.data.data;
            console.log(this.form)
            if(this.form.enterpriseNature === 0){
              this.enterpriseNatureCheck = [0];
            }else{
              this.enterpriseNatureCheck = [0,1];
            }
            if(this.form.businessLicense !== undefined && this.form.businessLicense !== '' && this.form.businessLicense !== null){
              let businessLicense = this.form.businessLicense.split('/');
              this.fileList1 = [{ name:businessLicense[businessLicense.length - 1] }];
              this.name1 = businessLicense[businessLicense.length - 1];
            }else {
              this.fileList1 = [];
              this.name1 = '';
            }
            if(this.form.registrateCertificate !== undefined && this.form.registrateCertificate !== '' && this.form.businessLicense !== null){
              let registrateCertificate = this.form.registrateCertificate.split('/');
              this.fileList2 = [{ name:registrateCertificate[registrateCertificate.length - 1] }];
              this.name2 = registrateCertificate[registrateCertificate.length - 1];
            }else {
              this.fileList2 = [];
              this.name2 = ''
            }
            if(this.form.recordForm !== undefined && this.form.recordForm !== '' && this.form.businessLicense !== null){
              let recordForm = this.form.recordForm.split('/');
              this.fileList3 = [{ name:recordForm[recordForm.length - 1] }];
              this.name3 = recordForm[recordForm.length - 1];
            }else {
              this.fileList3 = [];
              this.name3 = ''
            }
            setTimeout(() => {
              this.getInitData();
            },200)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //请求图片访问链接
      getImageUrl(fileName){
        this.$axios7.post('file/Download',{
          BucketName:'maoqu-enterprise',
          FileName:fileName
        }).then((res) => {
          return res.data.url;
        }).catch((e) => {
          console.log(e)
        })
      },
      //编辑境内收发货人
      saveInfo(){
        this.form.author=this.author;
        this.form.editor=this.editor;
        if(this.enterpriseNatureCheck.length === 2){
          this.form.enterpriseNature = 2
        }else {
          this.form.enterpriseNature = 0
        }
        if(this.form.enterpriseCreditCode === ''){
          this.$message.error('社会信用代码不能为空!');
          return;
        }
        if(this.form.enterpriseCustomsCode === ''){
          this.$message.error('海关代码不能为空!');
          return;
        }
        if(this.form.enterpriseQuarantineCode === ''){
          this.$message.error('检疫编码不能为空!');
          return;
        }
        if(this.form.enterpriseName === ''){
          this.$message.error('企业名称不能为空!');
          return;
        }
        if(this.form.supervisionMode === ''){
          this.$message.error('监管方式不能为空!');
          return;
        }
        let param = {
          deliveryId:this.deliveryId,
          ownedEnterpriseId:this.nickCompanyId,
          ownedEnterpriseName:this.nickCompanyName,
          enterpriseName:this.form.enterpriseName,
          enterpriseCustomsCode:this.form.enterpriseCustomsCode,
          enterpriseCreditCode:this.form.enterpriseCreditCode,
          enterpriseQuarantineCode:this.form.enterpriseQuarantineCode,
          enterpriseNature:this.form.enterpriseNature,
          supervisionMode:this.form.supervisionMode,
          exemptionNature:this.form.exemptionNature,
          inspectionAndQuarantineOrgan:this.form.inspectionAndQuarantineOrgan,
          certificationAuthority:this.form.certificationAuthority,
          portInspectionAndQuarantineOrgan:this.form.portInspectionAndQuarantineOrgan,
          desInspectionAndQuarantineOrgan:this.form.desInspectionAndQuarantineOrgan,
          enterprisePhone:this.form.enterprisePhone,
          enterpriseFax:this.form.enterpriseFax,
          productionAddress:this.form.productionAddress,
          manufacturer:this.form.manufacturer,
          businessLicense:this.name1,
          registrateCertificate:this.name2,
          recordForm:this.name3,
          editor:this.editor
        }
        this.$axios3.post('/updateDeliveryEnterprise',param)
          .then((res) => {
            console.log(res.data);
            if(res.data.code === 200){
              this.$message.success('境内收发货人修改成功!');
              this.upload();//上传文件
              this.deleteFile();
              this.dialogFormVisible = false;
              this.$emit('query');
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((error)=> {
            console.log(error);
          this.$message('操作失败！');
        });
      },
      handleRemove1(file, fileList) {
        this.name1 = '';
      },
      handleRemove2(file, fileList) {
        this.name2 = '';
      },
      handleRemove3(file, fileList) {
        this.name3 = '';
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning("当前限制只能选择1个文件！第2个文件上传失败！");
      },
      //上传之前获取文件名
      getName1(file){
        this.name1=file.name;
        console.log("文件有变化"+this.name1);
      },
      getName2(file){
        this.name2=file.name;
        console.log("文件有变化"+this.name2);
      },
      getName3(file){
        this.name3=file.name;
        console.log("文件有变化"+this.name3);
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
            console.log(e);
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
      /*设置回调时给服务器的参数*/
      setCallbackData(){
        let param = {
          "deliveryId": this.deliveryId,
          "businessType":'export',
        }
        if(this.name1 !== ''){
          param.bsLicense = this.deliveryId+'/'+this.nickCompanyId+'/delivery/'+this.name1
        }
        if(this.name2 !== ''){
          param.registrateCertificate = this.deliveryId+'/'+this.nickCompanyId+'/delivery/'+this.name2
        }
        if(this.name3 !== ''){
          param.recordForm = this.deliveryId+'/'+this.nickCompanyId+'/delivery/'+this.name3
        }
        this.uploadFilePrams = [param];
        console.log('回调参数',this.uploadFilePrams)
        this.postCallback={
          "callbackUrl":this.callbackUrl+"/file/callback?Type=1",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify(this.uploadFilePrams),
        };
        return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
      },
      /*上传文件函数*/
      upload(){
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
            'key':this.deliveryId+'/'+this.nickCompanyId+'/delivery'+'/${filename}',//上传文件的object名称。
          };
          let callback = this.setCallbackData();
          this.postData["callback"]=callback;
          this.$nextTick(function(){
            this.$refs.upload.submit();
            this.$refs.upload2.submit();
            this.$refs.upload3.submit();
          })
        } else{//获取密钥失败
          this.$message({
            showClose:true,
            message:'注册表单信息上传成功，文件上传失败！',
            type:'error',
          });
        }
      },
      //删除文件
      deleteFile(){
        this.$axios7.post('bsFile/Delivery/Delete',{
          deliveryId:this.deliveryId,
          businessType:'export',
          bsLicense:this.name1,
          registrateCertificate:this.name2,
          recordForm:this.name3,
        }).then((res) => {
          console.log(res.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      /*文件上传成功时钩子绑定的方法*/
      fileUploadSuccess(response,file,fileList){
        console.log(response)
        this.name1="";
        this.name2="";
        this.name3="";
      },
      /*文件上传失败时钩子绑定的方法*/
      fileUploadError(response,file,fileList){
        console.log(response)
        this.name1="";
        this.name2="";
        this.name3="";
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_checkout_organization.json'),//机关
          this.$axios.get('static/pub_levynature.json'),//征免性质
          this.$axios.get('static/pub_supervisemode.json'),//监管方式
        ]).then(this.$axios.spread((
          res_checkout_organization,
          res_levynature,
          res_supervisemode,
        ) => {
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
        })).catch((e) => {
          console.log(e);
        })
      },
      getInitData(){
        this.supervisionModesFilter(this.form.supervisionMode);
        this.exemptionNaturesFilter(this.form.exemptionNature);
        this.inspectionAndQuarantineOrgansFilter(this.form.inspectionAndQuarantineOrgan);
        this.certificationAuthoritysFilter(this.form.certificationAuthority);
        this.portInspectionAndQuarantineOrgansFilter(this.form.portInspectionAndQuarantineOrgan);
        this.desInspectionAndQuarantineOrgansFilter(this.form.desInspectionAndQuarantineOrgan);
      },
      //监管方式搜索
      supervisionModesFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.supervisionModesAll = this.supervisionModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.supervisionModesAll = this.supervisionModes.slice(0,19);
        }
      },
      //征免性质搜索建议
      exemptionNaturesFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.exemptionNaturesAll = this.exemptionNatures.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.exemptionNaturesAll = this.exemptionNatures.slice(0,19);
        }
      },
      inspectionAndQuarantineOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.inspectionAndQuarantineOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.inspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
        }
      },
      certificationAuthoritysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.certificationAuthoritysAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
        }
      },
      portInspectionAndQuarantineOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.portInspectionAndQuarantineOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.portInspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
        }
      },
      desInspectionAndQuarantineOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.desInspectionAndQuarantineOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.desInspectionAndQuarantineOrgansAll = this.organizations.slice(0,19);
        }
      },
    }
  }
</script>
<style scoped>
  .form-item {
    margin: 1px 0 !important;
  }
</style>

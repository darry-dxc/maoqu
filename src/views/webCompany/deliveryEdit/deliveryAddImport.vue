<template>
    <div>
      <el-button type="primary"  @click="addBtn">新增</el-button>
      <el-dialog title="新增收发货单位信息" :visible.sync="dialogFormVisible" width="800px">
        <el-form :model="form" >
          <el-row>
            <el-form-item label="单位名称" label-width="150px" required class="form-item">
              <el-col :span="6">
                <el-input size="small" auto-complete="off" placeholder="社会信用代码"  v-model="form.enterprisecreditcode"/>
              </el-col>
              <el-col :span="6">
                <el-input size="small" auto-complete="off" placeholder="海关代码"  v-model="form.enterprisecustomscode"/>
              </el-col>
              <el-col :span="6">
                <el-input size="small" auto-complete="off" placeholder="检疫编码"  v-model="form.enterprisequarantinecode"/>
              </el-col>
              <el-col :span="6">
                <el-input size="small" auto-complete="off" placeholder="企业名称"  v-model="form.enterprisename"/>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="单位性质" label-width="150px" class="form-item" required>
                <el-checkbox-group v-model="enterpriseNatureCheck" :min="1" size="small" >
                  <el-checkbox :label='0' disabled>境内收发货人</el-checkbox>
                  <el-checkbox :label='1'>消费使用单位</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监管方式" label-width="150px" class="form-item" required>
                <el-select v-model="form.supervisionmode" size="small" :filter-method="supervisionModesFilter" filterable clearable style="width: 100%;">
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
                <el-select v-model="form.exemptionnature" size="small" :filter-method="exemptionNaturesFilter" filterable clearable style="width: 100%;">
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
                <el-select v-model="form.inspectionandquarantineorgan" :filter-method="inspectionAndQuarantineOrgansFilter" size="small" filterable clearable style="width: 100%;">
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
                <el-select v-model="form.certificationauthority" size="small" :filter-method="certificationAuthoritysFilter" filterable clearable style="width: 100%;">
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
                <el-select v-model="form.portinspectionandquarantineorgan" size="small" :filter-method="portInspectionAndQuarantineOrgansFilter" filterable clearable style="width: 100%;">
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
                <el-select v-model="form.desinspectionandquarantineorgan" size="small" :filter-method="desInspectionAndQuarantineOrgansFilter" filterable clearable style="width: 100%;">
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
              <el-input  auto-complete="off" size="small" v-model="form.enterprisephone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位传真" label-width="150px" class="form-item">
              <el-input  auto-complete="off" size="small" v-model="form.enterprisefax"/>
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
              <el-input  auto-complete="off" size="small" v-model="form.productionaddress"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="上传附件" label-width="150px" class="form-item">
            <el-col :span="8"><el-upload
              class="upload-demo"
              ref="upload"
              :action="postURL"
              :accept='acceptType'
              :multiple="false"
              :auto-upload="false"
              :data="postData"
              :limit='1'
              :file-list="fileList"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-change="getName1"
              >
             <label class="uploadlable1">营业执照<br></label>
             <el-button type="primary" size="small">点击上传</el-button>
           </el-upload>
           </el-col>
            <el-col :span="8"><el-upload
            class="upload-demo"
            ref="upload3"
            :action="postURL"
            :accept='acceptType'
            :multiple="false"
            :auto-upload="false"
            :data="postData"
            :limit='1'
            :file-list="fileList"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="getName3"
            >
             <label class="uploadlable1">报关单位注册登记证书<br></label>
             <el-button size="small" type="primary">点击上传</el-button>
             </el-upload>
           </el-col>
            <el-col :span="8"><el-upload
            class="upload-demo"
            ref="upload2"
            :action="postURL"
            :accept='acceptType'
            :multiple="false"
            :auto-upload="false"
            :data="postData"
            :limit='1'
            :file-list="fileList"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="getName2"
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
                <el-input size="small"  v-model="form.createtime" disabled/>
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
                 <el-input size="small"  v-model="form.lastedittime" disabled/>
               </el-form-item>
             </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="AddDelivery" size="small">确 定</el-button>
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
          dialogFormVisible: false,
          enterpriseId:null,
          receiveEnterpriseId:'',
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
          successFlag:0,//上传文件成功标志，用于文件有动作时获取名字函数中排除上传成功动作，0为非，1为是
          ownedEnterpriseId:this.nickCompanyId,
          name1:'',
          name2:'',
          name3:'',
          postURL:'',//上传服务器的请求地址
          acceptImgType:'.png,.jpg,.jpeg',//上传图片允许的文件类型
          acceptType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
          postData:{},
          fileList:[],//待上传文件列表，element自动生成
          postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
          uploadFilePrams:[],//上传文件回调参数的callbackbody
          postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
          form: {
            enterpriseNature:[],
            supervisionmode:'',
            enterprisename:'',
            enterprisequarantinecode:'',
            enterprisecustomscode:'',
            enterprisecreditcode:''
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
        this.$nextTick(function () {
          this.getUpload();
        });
          this.loadStaticData();
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
        //单位性质选择
        getEnterpriseNature(val){
          if(val.length === 2){
            this.form.enterprisenature = 2
          }else {
            this.form.enterprisenature = 0
          }
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
        //添加境内收发货人
        AddDelivery(){
          if(this.enterpriseNatureCheck.length === 2){
            this.form.enterprisenature = 2
          }else {
            this.form.enterprisenature = 0
          }
          if(this.form.enterprisecreditcode === ''){
            this.$message.error('社会信用代码不能为空!');
            return;
          }
          if(this.form.enterprisecustomscode === ''){
            this.$message.error('海关代码不能为空!');
            return;
          }
          if(this.form.enterprisequarantinecode === ''){
            this.$message.error('检疫编码不能为空!');
            return;
          }
          if(this.form.enterprisename === ''){
            this.$message.error('企业名称不能为空!');
            return;
          }
          if(this.form.supervisionmode === ''){
            this.$message.error('监管方式不能为空!');
            return;
          }
          this.form.author=this.author;
          this.form.editor=this.editor;
          let param = {
            enterpriseName:this.form.enterprisename,
            enterpriseCustomsCode:this.form.enterprisecustomscode,
            enterpriseCreditCode:this.form.enterprisecreditcode,
            enterpriseQuarantineCode:this.form.enterprisequarantinecode,
            enterpriseNature:this.form.enterprisenature,
            supervisionMode:this.form.supervisionmode,
            exemptionNature:this.form.exemptionnature,
            inspectionAndQuarantineOrgan:this.form.inspectionandquarantineorgan,
            certificationAuthority:this.form.certificationauthority,
            portInspectionAndQuarantineOrgan:this.form.portinspectionandquarantineorgan,
            desInspectionAndQuarantineOrgan:this.form.desinspectionandquarantineorgan,
            enterprisePhone:this.form.enterprisephone,
            enterpriseFax:this.form.enterprisefax,
            productionAddress:this.form.productionaddress,
            manufacturer:this.form.manufacturer,
            businessLicense:this.form.businesslicense,
            registrateCertificate:this.form.registratecertificate,
            recordForm:this.form.recordform
          }
          console.log(param)
          this.$axios3.post('/addReceiveEnterprise',param)
          .then((res) => {
            console.log(res.data);
            if(res.data.code === 200){
              this.$message.success('境内收发货人添加成功!')
              this.receiveEnterpriseId=res.data.data.receiveEnterpriseId;
              this.enterpriseNatureCheck = [0];
              for(let i in this.form) {
                this.form[i] = ''
              }
              // 调用上传附件函数
              setTimeout(() => {
                this.upload()
              },300)
              this.$emit('query');
              this.loadStaticData();
              this.dialogFormVisible = false
            }
          }).catch((e)=> {
            console.log(e);
            this.$message('新增失败！');
          });
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
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
        },
        getName2(file){
          this.name2=file.name;
        },
        getName3(file){
          this.name3=file.name;
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
              console.log(e)
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
          this.uploadFilePrams = [];
          let param = {
            "deliveryId": this.receiveEnterpriseId,
            "businessType":'import',
          }
          if(this.name1 !== ''){
            param.bsLicense = this.receiveEnterpriseId+'/'+this.nickCompanyId+'/receiveEnterprise/'+this.name1
          }
          if(this.name2 !== ''){
            param.recordForm = this.receiveEnterpriseId+'/'+this.nickCompanyId+'/receiveEnterprise/'+this.name2
          }
          if(this.name3 !== ''){
            param.registrateCertificate = this.receiveEnterpriseId+'/'+this.nickCompanyId+'/receiveEnterprise/'+this.name3
          }
          this.uploadFilePrams = [param];
          console.log(this.uploadFilePrams)
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
              'key':this.receiveEnterpriseId+'/'+this.nickCompanyId+'/receiveEnterprise'+'/${filename}',//上传文件的object名称。
            };
            let callback = this.setCallbackData();
            this.postData["callback"]=callback;
            this.$refs.upload.submit();
            this.$refs.upload2.submit();
            this.$refs.upload3.submit();
          } else{//获取密钥失败
            this.$message({
              showClose:true,
              message:'注册表单信息上传成功，文件上传失败！',
              type:'error',
            });
          }
        },
        /*文件上传成功时钩子绑定的方法*/
        fileUploadSuccess(response,file,fileList){
          console.log(response)
          this.fileList1 = [];
          this.fileList2 = [];
          this.fileList3 = [];
          this.name1="";
          this.name2="";
          this.name3="";
        },
        /*文件上传失败时钩子绑定的方法*/
        fileUploadError(response,file,fileList){
          console.log(response)
          this.fileList1 = [];
          this.fileList2 = [];
          this.fileList3 = [];
          this.name1="";
          this.name2="";
          this.name3="";
        },
        addBtn(){
          this.dialogFormVisible = true;
          this.fileList1 = [];
          this.fileList2 = [];
          this.fileList3 = [];
          this.name1="";
          this.name2="";
          this.name3="";
        }
      }
 }
</script>
<style scoped>
  .form-item {
    margin: 1px 0 !important;
  }
</style>

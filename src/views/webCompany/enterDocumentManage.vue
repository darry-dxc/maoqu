<template>
	<div style="background-color: white">
    <el-row style="height: 60px;font-size: 20px;line-height: 60px;padding-left: 20px;box-shadow: 0 2px 6px 0 #C0C4CC;color: #303133">
      <i class="el-icon-document"/>
      <span>企业基本信息</span>
    </el-row>
    <el-form :model="form" ref="form" style="padding: 20px 30px" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户类型:" class="doc-form-item">
            <el-input v-model="form.enterpriseType" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司电话:" class="doc-form-item">
            <el-input v-model="form.enterprisePhone">
              <el-button slot="suffix" circle type="success" icon="el-icon-check" @click="updateInfo" size="mini"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业名称:" class="doc-form-item">
            <el-input v-model="form.enterpriseName" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业地址:" class="doc-form-item">
            <el-input v-model="form.address">
              <el-button slot="suffix" circle type="success" icon="el-icon-check" @click="updateInfo" size="mini"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人名称:" class="doc-form-item">
            <el-input v-model="form.legalPerson" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人:" class="doc-form-item">
            <el-input v-model="form.contact">
              <el-button slot="suffix" circle type="success" icon="el-icon-check" @click="updateInfo" size="mini"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海关注册编码:" class="doc-form-item">
            <el-input v-model="form.customsNo" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单号前缀:" class="doc-form-item">
            <el-input v-model="form.businessPrefix">
              <el-button slot="suffix" circle type="success" icon="el-icon-check" @click="updateInfo" size="mini"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="统一信用代码" class="doc-form-item">
            <el-input v-model="form.creditCode" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱:" class="doc-form-item">
            <el-input v-model="form.mailbox" readonly/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="纳税人识别号:" class="doc-form-item">
            <el-input v-model="form.taxpayerNo" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:" class="doc-form-item">
            <el-input v-model="form.phone" readonly>
              <div slot="suffix">修改手机和邮箱请至
                <el-button type="text" @click="toSecurity">账户安全</el-button>
              </div>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="经营范围" class="doc-form-item">
          <el-checkbox-group v-model="form.type" >
            <el-checkbox label="定舱" name="type" disabled></el-checkbox>
            <el-checkbox label="拖车" name="type" disabled></el-checkbox>
            <el-checkbox label="熏蒸" name="type" disabled></el-checkbox>
            <el-checkbox label="报关" name="type" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row style="height: 60px;font-size: 20px;line-height: 60px;padding-left: 20px;box-shadow: 0 2px 6px 0 #C0C4CC;color: #303133">
      <i class="el-icon-upload"/>
      <span>上传附件信息</span>
    </el-row>
    <el-form :model="attachment" style="padding: 20px 30px" label-width="220px">
      <el-form-item label="营业执照:" class="doc-form-item">
        <el-col :span="12">
          <el-input v-model="form.bsLicense" readonly>
            <el-button slot="suffix" type="text" @click="submitUpload" >点击上传</el-button>
          </el-input>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="postData.host"
            :data="postParams"
            :before-upload="getUpload"
            :multiple="false"
            :limit="1"
            :show-file-list='false'
            :on-change="getBsLicense"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="primary" size="small">下载</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="对外贸易经营者备案登记表:" class="doc-form-item">
        <el-col :span="12">
          <el-input v-model="attachment.name" readonly/>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-upload
            :action="postData.host"
            :data="postParams"
            :before-upload="getUpload"
            :multiple="false"
            :limit="1"
            :file-list="fileList">
            <el-button type="success" size="small">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="primary" size="small">下载</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="报关单位注册登记证书:" class="doc-form-item">
        <el-col :span="12">
          <el-input v-model="attachment.name" readonly/>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-upload
            :action="postData.host"
            :data="postParams"
            :before-upload="getUpload"
            :multiple="false"
            :limit="1"
            :file-list="fileList">
            <el-button type="success" size="small">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="primary" size="small">下载</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="其他:" class="doc-form-item">
        <el-col :span="12">
          <el-input v-model="attachment.name" readonly/>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-upload
            :action="postData.host"
            :data="postParams"
            :before-upload="setpostParams"
            :multiple="false"
            :limit="1"
            :file-list="fileList">
            <el-button type="success" size="small">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="primary" size="small">下载</el-button>
        </el-col>
      </el-form-item>
    </el-form>
	</div>
</template>
<script>
	export default {
	//定义数据
	  data () {
	    return {
        form:{
          bsLicense:''
        },
        bsLicense:'',
        attachment:{

        },
        postData:{
          host:'',
        },
        postParams:{

        },
        postCallback:{},
        fileList:[],
        enterpriseId:'',
	    }
	  },
	  //定义初始化函数
	  mounted(){

    },
    activated() {
      this.queryInfo();
      this.getUpload();
      console.log(this.nickCompanyId)
    },
	  computed:{
      nickCompanyId(){
        return this.$store.state.nickCompanyId
      }
	  },
	  methods:{
	    queryInfo(){
	      this.$axios1.post('getInfoForUpdate')
          .then((res) => {
            console.log(res.data);
            if(res.data.code === 200){
              let resData = res.data.data;
              this.form = resData;
            }
          }).catch((e) => {
            console.log(e)
        })
      },
      updateInfo(){
        if(this.form.businessPrefix !== ''){
          this.$axios1.post('updateInfo',{
            contact:this.form.contact,
            businessPrefix:this.form.businessPrefix,
            enterprisePhone:this.form.enterprisePhone,
            address:this.form.address,
          }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200){
                this.$message.success('修改成功!');
                this.queryInfo();
                setTimeout(()=>{
                  //更新企业信息
                  localStorage.setItem('Name2',JSON.stringify(this.form.enterpriseName));
                  localStorage.setItem('Name22',JSON.stringify(this.form.contact));
                  localStorage.setItem('Phone2',JSON.stringify(this.form.phone));
                  localStorage.setItem('Email2',JSON.stringify(this.form.mailbox));
                  this.$store.commit("updateCompanyName",this.form.enterpriseName );
                  this.$store.commit("updateCompanyMan",this.form.contact);
                  this.$store.commit("updateCompanyEmail",this.form.mailbox);
                  this.$store.commit("updateCompanyPhone",this.form.phone);
                },200)
              }
          }).catch((e) => {
            console.log(e)
          })
        }else{
           this.$message.error('单号前缀不能为空!') 
           this.queryInfo()
        }  
      },
      toSecurity(){
	      this.$router.push({ path: '/WebCompany/EnterpriseCenter/AccountSafe'})
      },
      /*获取上传文件的临时秘钥及相关签名字段*/
      getUpload(){
        this.$axios7.get('file/Upload?Bucket=enterprise')
          .then((res) => {
            // console.log(res.data)
            this.postData = res.data;
        }).catch((e) => {
          console.log(e);
        });
      },
      setpostParams(){
        console.log(this.form.bsLicense)
        this.postParams = {
          'policy':this.postData.policy,
          'OSSAccessKeyId':this.postData.accessid,
          'success_action_status':'200',
          'x-oss-security-token' : this.postData["security-token"],
          'signature': this.postData.signature,
          'key':'123133131321321'+'/'+this.nickCompanyId+'/enterprise'+'/${filename}',//上传文件的object名称。
        };
        //回调参数
        let postCallback = {
          "callbackUrl":this.callbackUrl+"/file/callback?Type=3",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify([{
            enterpriseId: this.nickCompanyId,
            bsLicense:this.nickCompanyId+'/'+this.nickCompanyId+'/enterprise'+this.form.bsLicense,
            recordForm:'',
            registrateCertificate:'',
            otherFile:'',
          }]),
        };
        console.log('callback',postCallback)
        console.log('params',this.postParams)
        this.postParams.callback = Base64.encode(JSON.stringify(postCallback));
      },
      submitUpload() {
        this.setpostParams();
        this.$refs.upload.submit();
      },
      uploadSuccess(res){
        console.log(res)
      },
      uploadError(res){
        console.log(res)
      },
      getBsLicense(file,fileList){
        console.log(file)
        this.form.bsLicense = file.name;
        console.log(this.form.bsLicense)
        this.bsLicense = file.name
      }
    }
	}
</script>
<style scoped>
  .doc-form-item {
    border: 1px solid #dcdfe6;
    margin: 1px 0;
  }
</style>

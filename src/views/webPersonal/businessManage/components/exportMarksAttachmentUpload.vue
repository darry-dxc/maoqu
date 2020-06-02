<template>
  <el-dialog title="标记唛码附件上传" :visible.sync="dialogAttachmentVisible" width="700px" append-to-body>
    <el-row style="margin-bottom: 20px">
      <el-col :span="3" :offset="6">
        <span style="line-height: 30px;font-size: 16px">附件名称：</span>
      </el-col>
      <el-col :span="10">
        <el-input v-model="markName" placeholder="附件名称"  size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="6">
        <el-button type="primary" icon="el-icon-view" size="small">预览</el-button>
      </el-col>
      <el-col :span="3">
        <el-upload
          class="upload-demo"
          ref="upload"
          :accept = 'acceptFileType'
          :action="postURL"
          :file-list="fileList"
          :auto-upload="false"
          :data="postData"
          :on-change="fileChange"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :on-remove="fileUploadRemove"
          :show-file-list='false'
          style="width:100px;float:left">
          <el-button type="primary" icon="el-icon-upload" size="small">上传</el-button>
        </el-upload>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-download" @click="uploadAttach" size="small">下载</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-delete" @click="deleteAttach" size="small">删除</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        markName:'',
        attachmentAddress:'',
        dialogAttachmentVisible:false,
        exDeclareDetailId:'',
        acceptFileType:'.JPG,.GIF,.PNG,.BMP',//上传允许的文件类型
        postURL:'',//上传服务器请求地址
        fileList:[],//待上传文件列表，element自动生成
        fileListData:[],//待上传文件列表数据
        uploadFilePrams:[],//上传文件回调参数的callbackbody
        uploadData:{},//存储请求回来的上传签名等数据
        postHeaders:{},
        postData:{},
        postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
        postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
        //详见接口文档 回调插入业务附件表数据
        postState:1,//标志获取上传文件签名接口是否成功调用；
      }
    },
    computed:{
      /*获取当前用户的id和名称，用来上传文件时参数*/
      nickId(){
        return this.$store.state.nickId;
      },
      nickName(){
        return this.$store.state.nickName;
      }
    },
    //定义初始化函数
    mounted(){
      //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入Vue.nextTick/vm.$nextTick
      this.$nextTick(function () {
        this.getUpload();
      });
    },

    //定义方法
    methods:{
      //出口标记唛码附件
      dialogMarksAttachment(exDeclareDetailId){
        this.exDeclareDetailId = exDeclareDetailId;
        if(this.exDeclareDetailId != undefined){
          let params = {
            'exDeclareDetailId':exDeclareDetailId,
          };
          console.log('附件参数',params)
          this.$axios7.post('export/marks/getbyid',params)
            .then((res) => {
              console.log('附件查询',res)
              if(res.data.length != 0){
                this.markName = res.data[0].markName;
                this.attachmentAddress = res.data[0].markAddress;
              }
            }).catch((e) => {
            console.log(e);
          });
        }
        this.dialogAttachmentVisible = true;
      },
      //删除
      deleteAttach(){
        console.log(this.exDeclareDetailId)
        if('undefined' != typeof this.exDeclareDetailId){
          let param = {
            'exDeclareDetailId':this.exDeclareDetailId,
          };
          this.$axios7.post('export/marks/delete',param)
            .then((res) => {
              console.log('删除',res)
              if(res.data.Status == 1){
                this.markName = '';
                this.$message.success('标记唛码附件删除成功！');
              }

            }).catch((e) => {
            this.$message.error('标记唛码附件删除失败！');
            console.log(e);
          })
        }
        else {
          this.markName = '';
        }
      },
      /*获取上传文件的临时秘钥及相关签名字段*/
      getUpload(){
        this.$axios7.get('file/Upload',{
          params:{
            'Bucket':'business'
          }
        })
          .then((res) => {
            console.log("获取到上传的签名:");
            console.log(res.data);
            this.postURL = res.data.host;//对应bucket的公网访问地址
            console.log("上传文件的地址:"+this.postURL);
            this.postExpire = res.data.expire;
            this.uploadData=res.data;//将返回的签名等存储起来
            this.postState=1;//标志获取上传文件签名等数据成功
            return 1;
          }).catch((e) => {
          console.log("获取上传文件权限出错：");
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
      /*此处主要为添加文件后更新相应信息*/
      fileChange(file,fileList){
        //fileList =[];
        console.log("有变化的文件：");
        console.log(file);
        console.log("当前文件列表");
        console.log(fileList);
        console.log("存储当前列表的变量");
        this.fileList = fileList;
        console.log(this.fileList);
        /*对比现有文件数据，若不存在则新增*/
        /*uploadTable长度为0时则先新增*/
        console.log('markName',this.markName,typeof this.markName)
        if (this.markName == ''){
          this.markName = file.name;
          this.upload();
        }
      },
      /*文件状态改变时没有包含文件被移除，因此增加文件移除时更新fileList*/
      fileUploadRemove(file,fileList){
        this.fileList = fileList;
        console.log(this.fileList);
      },
      /*点击文件预览时的事件*/
      handleEdit(){
        this.$message({
          showClose:true,
          message:'文件预览功能尚在开发中',
          type:'error',

        });
      },
      /*设置回调时给服务器的参数*/
      setCallbackData(){
        /*取出文件列表的名称*/
        this.uploadFilePrams=[];//先清空原有的
        console.log("ownerId:"+this.nickId);
        this.uploadFilePrams.push({
          "exDeclareDetailId": this.exDeclareDetailId,
          "markName": this.markName,
          "ownerId": this.nickId,
          "ownerName": this.nickName,
          "ownerType": '1',
          "markAddress": this.exDeclareDetailId+"/"+this.markName,//文件路径，先写死。//"fileSize":
        });
        this.postCallback={
          "callbackUrl":this.callbackUrl+"/export/marks/callback",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify(this.uploadFilePrams),
        };
        console.log("body："+JSON.stringify(this.uploadFilePrams));
        console.log("设置回调参数");
        console.log(JSON.stringify(this.postCallback));
        return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
      },
      /*上传文件函数*/
      upload(){
        /*获取当前时间判断签名是否过期，过期则重新获取，3s缓冲*/
        console.log("exDeclareDetailId:"+this.exDeclareDetailId);
        let now = Date.parse(new Date())/1000;
        console.log(parseInt(this.postExpire));
        console.log(now);
        /*if (this.fileList.length === 0) {
            /!*不需要上传文件，终止函数*!/
            return false;
          }*/
        if (parseInt(this.postExpire) <(now+3) || this.postState !== 1 ){//即将过期或初始化时获取失败
          this.getUpload();
          setTimeout(function () {
            //重新获取上传签名为异步执行，因此等待0.5秒后继续执行配置参数及上传动作
            //正常情况下0.6秒足够。
            // 后期可改成等待异步执行完成之后再执行，使用Promise（之前使用有问题因此暂时放弃）
            this.setUpload();
          }.bind(this),600);
        }else {
          this.setUpload();//不需要重新获取则直接配置参数并上传
        }
      },
      /*文件上传成功时钩子绑定的方法*/
      fileUploadSuccess(response,file,fileList){
        console.log("上传文件成功");
        console.log(response);
      },
      /*文件上传失败时钩子绑定的方法*/
      fileUploadError(response,file,fileList){
        console.log("上传文件不成功");
        console.log(response);
      },
      /*文件上传前钩子绑定的方法，每次上传一个文件时会调用*/
      beforeUploadFile(file){
      },
      /*上传文件的配置参数及上传动作*/
      setUpload(){
        if (this.postState === 1){//获取密钥成功
          /*上传文件*/
          console.log("即将进入上传文件前操作");
          /*在上传前设置上传参数data，之前在别的函数内上传无法在上传第一个时就上传绑定后的数据*/
          this.postData = {
            'policy':this.uploadData.policy,
            'OSSAccessKeyId':this.uploadData.accessid,
            'success_action_status':'200',
            'x-oss-security-token' : this.uploadData["security-token"],
            'signature': this.uploadData.signature,
            'key':this.exDeclareDetailId+'/${filename}',//上传文件的object名称。
          };
          console.log("即将进入设置回调参数");
          let callback = this.setCallbackData();

          this.postData["callback"]=callback;
          console.log("即将上传文件");
          console.log(this.postData);
          this.$nextTick(()=>{//防止第一次请求带不上表单其他参数
            console.log("上传文件的地址:"+this.postURL);
            this.$refs.upload.submit();
          });
        } else{//获取密钥失败
          this.$message({
            showClose:true,
            message:'文件上传失败！',
            type:'error',
          });
        }
      },
      //下载附件信息
      uploadAttach(){
        let param = {
          'BucketName':"moretrade-business",
          'FileName':this.attachmentAddress,
        }
        console.log('下载参数',param)
        this.$axios11.post('file/Download',param)
          .then((response) =>{
            window.location.href=response.data.url
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>

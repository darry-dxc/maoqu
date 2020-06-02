<template>
  <el-dialog title="随附单据上传" :visible.sync="dialogOperationVisible" width="50%">
    <div>
      <el-form :model="form" label-width="160px">
        <el-form-item label="随附单据文件类别" >
          <el-select v-model="form.accompanyDocType" placeholder="请选择" size="small" style="width: 60%;" @change="accompanyDocTypeChange">
            <el-option
              v-for="item in accompanyDocTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style="width: 400px"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随附单据编号" >
          <el-input v-model="form.accompanyDocNo" :disabled="isEdit" size="small" @keyup.enter.native="newAttachment" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="选择随附单据文件" >
          <el-upload
            class="upload-demo"
            ref="upload"
            :accept = 'acceptFileType'
            :action="postURL"
            :file-list="fileList"
            :auto-upload="false"
            :data="postData"
            :on-change="fileChange"
            :on-remove="fileUploadRemove"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :before-upload="beforeUploadFile"
            :show-file-list='false'
            style="width:100px;float:left"
            :disabled="isAdd">
            <el-button type="text" :disabled="isAdd"><i class="el-icon-circle-plus el-icon--left" ></i>添加附件</el-button>
          </el-upload>
          <label class="font-size-12 font-color-red">（提示：只可上传后缀名为pdf的文件，单个文件大小不能超过4M，每页不超过200k）</label>
        </el-form-item>
        <el-form-item label="标记唛码附件" >
          <el-button type="text" @click="showMarksAttachment"><i class="el-icon-circle-plus el-icon--left" ></i>标记唛码上传</el-button>
        </el-form-item>
        <marksAttachment ref="marksAttachment"></marksAttachment>
      </el-form>
    </div>

    <div>
      <el-table :data="attachmentTableDataAll" stripe style="width: 100%">
        <el-table-column prop="accompanyDocType" label="类别" >
        </el-table-column>
        <el-table-column prop="documentName" label="文件名称">
        </el-table-column>
        <el-table-column prop="accompanyDocNo" label="单据编号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="el-icon-download" :disabled="scope.row.attachmentAddress == undefined" @click ="uploadAttach(scope.$index, scope.row)"></el-button>
            <el-button size="mini" type="text" icon="el-icon-close" @click="deleteAttachInfo(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogOperationVisible = false" class="cancel" size="small"><strong>取 消</strong></el-button>
      <el-button type="primary" @click="uploadAttachAndSave" class="sure" size="small"><strong>上传/保存</strong></el-button>
    </div>
  </el-dialog>
</template>

<script>
  import marksAttachment from './components/marksAttachmentUpload'
  export default {
    //定义数据
    data () {
      return {
        isEdit:true,
        isAdd:true,
        dialogOperationVisible:false,
        dialogAttachment:false,
        attachmentTableData:[],//需上传文件的随附单据
        attachment:[],//不需要上传文件的随附单据
        attachmentTableDataAll:[],//所有随附单据
        form:{},
        DocType:'',
        imDeclareDetailId:'',
        acceptFileType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
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
        accompanyDocTypes:[
          {value:'00000001',label:'00000001-发票',title:'发票'},
          {value:'00000002',label:'00000002-装箱单',title:'装箱单'},
          {value:'00000003',label:'00000003-提运单',title:'提运单'},
          {value:'00000004',label:'00000004-合同',title:'合同'},
          {value:'00000005',label:'00000005-其他1',title:'其他1'},
          {value:'00000006',label:'00000006-其他2',title:'其他2'},
          {value:'00000007',label:'00000007-其他3',title:'其他3'},
          {value:'00000008',label:'00000008-纸质代理报关委托协议扫描件',title:'纸质代理报关委托协议扫描件'},
          {value:'00000009',label:'00000009-原产地证据文件',title:'原产地证据文件'},
          {value:'10000001',label:'10000001-电子代理报关委托协议编号',title:'电子代理报关委托协议编号'},
          {value:'10000002',label:'10000002-减免税货物税款担保证明',title:'减免税货物税款担保证明'},
          {value:'10000003',label:'10000003-减免税货物税款担保延期证明',title:'减免税货物税款担保延期证明'},
          {value:'20000011',label:'20000011-兽医(卫生)证书',title:'兽医(卫生)证书'},
          {value:'20000012',label:'20000012-动物检疫证书',title:'动物检疫证书'},
          {value:'20000013',label:'20000013-植物检疫证书',title:'植物检疫证书'},
          {value:'20000014',label:'20000014-装运前检验证书',title:'装运前检验证书'},
          {value:'20000015',label:'20000015-重量证书',title:'重量证书'},
          {value:'20000016',label:'20000016-TCK检验证书（美国小麦）',title:'TCK检验证书（美国小麦）'},
          {value:'20000017',label:'20000017-熏蒸证书',title:'熏蒸证书'},
          {value:'20000018',label:'20000018-放射性物质检测合格证明',title:'放射性物质检测合格证明'},
          {value:'20000019',label:'20000019-木材发货检验码单',title:'木材发货检验码单'},
          {value:'20000020',label:'20000020-水果预检验证书',title:'水果预检验证书'},
          {value:'20000021',label:'20000021-中转进境确认证明文件（经港澳地区中转入境水果）',title:'中转进境确认证明文件（经港澳地区中转入境水果）'},
          {value:'20000022',label:'20000022-检测报告',title:'检测报告'},
          {value:'20000023',label:'20000023-危险特性分类鉴别报告',title:'危险特性分类鉴别报告'},
          {value:'20000024',label:'20000024-型式试验报告',title:'型式试验报告'},
          {value:'20000025',label:'20000025-动物检疫合格证明（国产原料）；进境货物检疫证明、原产国检验证书（进口原料）',title:'动物检疫合格证明（国产原料）；进境货物检疫证明、原产国检验证书（进口原料）'},
          {value:'20000026',label:'20000026-微生物检测报告（沙门氏菌、产志贺毒素大肠杆菌、金黄色葡萄球菌、单增李斯特菌）',title:'微生物检测报告（沙门氏菌、产志贺毒素大肠杆菌、金黄色葡萄球菌、单增李斯特菌）'},
          {value:'20000027',label:'20000027-出口水产品成品检验报告',title:'出口水产品成品检验报告'},
          {value:'50000001',label:'50000001-企业提供的证明材料',title:'企业提供的证明材料'},
          {value:'50000002',label:'50000002-企业提供的声明',title:'企业提供的声明'},
          {value:'50000003',label:'50000003-企业提供的标签标识',title:'企业提供的标签标识'},
          {value:'50000004',label:'50000004-企业提供的其他',title:'企业提供的其他'},
          {value:'50000005',label:'50000005-农业转基因生物安全证书',title:'农业转基因生物安全证书'},
          {value:'50000006',label:'50000006-引进种子、苗木检疫审批单',title:'引进种子、苗木检疫审批单'},
          {value:'50000007',label:'50000007-远洋自捕水产品的确认通知（文件）和远洋渔业项目确认表、农业部远洋渔业企业资格证书',title:'远洋自捕水产品的确认通知（文件）和远洋渔业项目确认表、农业部远洋渔业企业资格证书'},
          {value:'50000008',label:'50000008-特种设备制造许可证',title:'特种设备制造许可证'},
          {value:'50000009',label:'50000009-进口化妆品卫生许可批件',title:'进口化妆品卫生许可批件'},
          {value:'50000010',label:'50000010-特殊医学用途配方食品注册证书',title:'特殊医学用途配方食品注册证书'},
          {value:'50000011',label:'50000011-保健食品注册证书/备案凭证',title:'保健食品注册证书/备案凭证'},
          {value:'50000013',label:'50000013-化妆品生产许可证(仅限首次出口时提供)',title:'化妆品生产许可证(仅限首次出口时提供)'},
          {value:'50000014',
            label:'50000014-特殊用途销售包装化妆品成品应当提供相应的卫生许可批件或者具有相关资质的机构出具的是否存在安全性风险物质的有关安全性评估资料(仅限首次出口时提供)',
            title:'特殊用途销售包装化妆品成品应当提供相应的卫生许可批件或者具有相关资质的机构出具的是否存在安全性风险物质的有关安全性评估资料(仅限首次出口时提供)'},
          {value:'50000015',label:'50000015-重量证书',title:'重量证书'},
          {value:'60000001',label:'60000001-民用爆炸品进口审批单',title:'民用爆炸品进口审批单'},
          {value:'60000002',label:'60000002-民用爆炸品出口审批单',title:'民用爆炸品出口审批单'},
          {value:'60000003',label:'60000003-军品出口许可证',title:'军品出口许可证'},
          {value:'60000004',label:'60000004-人类遗传资源材料出口、出境证明',title:'人类遗传资源材料出口、出境证明'},
          {value:'60000005',label:'60000005-古生物化石出口、出境批件',title:'古生物化石出口、出境批件'},
          {value:'60000006',label:'60000006-密码出口许可证',title:'密码出口许可证'},
          {value:'60000007',label:'60000007-援外项目任务通知单',title:'援外项目任务通知单'},
          {value:'60000008',label:'60000008-医疗用毒性药品进出口批件',title:'医疗用毒性药品进出口批件'},
          {value:'60000009',label:'60000009-放射性药品进出口批件',title:'放射性药品进出口批件'},
          {value:'60000010',label:'60000010-血液出口批件',title:'血液出口批件'},
          {value:'60000011',label:'60000011-化学品进出口环境管理登记证明',title:'化学品进出口环境管理登记证明'},
        ],
        multipleSelection: [],
      }
    },
    components:{
      marksAttachment,
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
      accompanyDocTypeChange(val){
        this.DocType = val;
        this.form.accompanyDocType = this.accompanyDocTypes.find((item)=>{ return item.value === val }).title;
        if(val === '10000001' || val === '10000002' || val === '10000003'){
          this.isEdit = false;
          this.isAdd = true;
        }
        else{
          this.isEdit = true;
          this.isAdd = false;
        }
      },
      //标记唛码附件
      showMarksAttachment(){
        this.$refs.marksAttachment.dialogMarksAttachment(this.imDeclareDetailId);
      },
      //根据服务单号查询业务单号
      bussinessIdQuery(imDeclareDetailId){
        console.log(imDeclareDetailId)
        this.attachmentTableData = [];
        this.attachment = [];
        this.attachmentTableDataAll = [];
        this.imDeclareDetailId = imDeclareDetailId;
        if(this.imDeclareDetailId != undefined){
          let params = {
            'imDeclareDetailId':imDeclareDetailId,
          };
          console.log('随附单据参数',params)
          this.$axios11.post('import/AccompanyDoc/getbyid',params)
            .then((res) => {
              console.log('随附单据查询',res)
              for(let i = 0;i<res.data.length;i++){
                this.attachmentTableDataAll.push({
                  imDeclareDetailId:res.data[i].imDeclareDetailId,
                  accompanyDocType:res.data[i].accompanyDocType,
                  accompanyDocId:res.data[i].accompanyDocId,
                  documentName:res.data[i].accompanyDocName,
                  accompanyDocNo:res.data[i].accompanyDocNo,
                  ownerId:res.data[i].ownerId,
                  ownerName:res.data[i].ownerName,
                  uploadTime:res.data[i].uploadTime,
                  attachmentAddress:res.data[i].accompanyDocAddress,
                  isDeleted:res.data[i].isDeleted,
                });
              }
            }).catch((e) => {
            console.log(e);
          });
        }
        this.dialogOperationVisible = true;
      },
      //上传随附单据并保存
      uploadAttachAndSave(){
        console.log('查看',this.attachmentTableData,this.attachment)
        if(this.attachmentTableData.length == 0){
          if(this.attachment.length == 0){
            this.$message.error('没有文件可以上传！');
          }
          else {
            console.log('attachment',this.attachment)
            var param = [];
            for(let i = 0;i<this.attachment.length;i++){
              param[i]={
                'imDeclareDetailId':this.imDeclareDetailId,
                'accompanyDocType':this.attachment[i].accompanyDocType,
                'accompanyDocNo':this.attachment[i].accompanyDocNo,
              }
            };
            var params = {'accompanyDocList':param}
            console.log('上传参数',params)
            this.$axios11.post('import/AccompanyDoc/insertAccompanyDoc',params)
              .then((res) => {
                console.log('上传状态',res)
                if(res.data.status == 'true'){
                  this.dialogOperationVisible = false;
                  this.form ={};
                }
              }).catch((e) => {
              console.log(e);
            })
          }
        }
        else
        {
          if(this.attachment.length == 0){
            //调用上传函数
            this.upload();
            this.dialogOperationVisible = false;
          }
          else {
            //调用上传函数
            this.upload();
            console.log('attachment',this.attachment)
            var param = [];
            for(let i = 0;i<this.attachment.length;i++){
              param[i]={
                'imDeclareDetailId':this.imDeclareDetailId,
                'accompanyDocType':this.attachment[i].accompanyDocType,
                'accompanyDocNo':this.attachment[i].accompanyDocNo,
              }
            };
            var params = {'accompanyDocList':param}
            console.log('上传参数',params)
            this.$axios11.post('import/AccompanyDoc/insertAccompanyDoc',params)
              .then((res) => {
                console.log('上传状态',res)
                if(res.data.status == 'true'){
                  this.dialogOperationVisible = false;
                  this.form ={};
                }
              }).catch((e) => {
              console.log(e);
            })
          }
        }
      },
      newAttachment(){
        this.attachmentTableDataAll.push({
          accompanyDocType:this.form.accompanyDocType,
          accompanyDocNo:this.form.accompanyDocNo,
        });
        this.attachment.push({
          accompanyDocType:this.form.accompanyDocType,
          accompanyDocNo:this.form.accompanyDocNo,
        });
        this.form = {};
      },
      //删除随附单据
      deleteAttachInfo(index,row){
        console.log(this.imDeclareDetailId,row)
        if(row.accompanyDocId != undefined){
          let param = {
            'imDeclareDetailId':this.imDeclareDetailId,
            'accompanyDocType':row.accompanyDocType,
          };
          this.$axios11.post('import/AccompanyDoc/delete',param)
            .then((res) => {
              console.log('删除',res)
              if(res.data.Status > 0){
                this.attachmentTableDataAll.splice(row,1);
                this.$message.success('随附单据删除成功！');
              }
            }).catch((e) => {
            this.$message.error('随附单据删除失败！');
            console.log(e);
          })
        }
        else {
          this.attachmentTableDataAll.splice(row,1);
          if(row.accompanyDocNo == undefined){
            this.attachmentTableData.splice(row,1);
          }
          else if(row.documentName == undefined){
            this.attachment.splice(row,1)
          }
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
      /*文件状态改变时调用的函数，添加文件、上传成功和上传失败时都会被调用*/
      /*此处主要为添加文件后更新相应信息*/
      fileChange(file,fileList){
        /*对比现有文件数据，若不存在则新增*/
        this.fileList = fileList;
        /*uploadTable长度为0时则先新增*/
        if (this.attachmentTableData.length === 0){
          file.documentName=file.name;
          file.attchmentId=file.attchmentId;
          file.accompanyDocType=this.form.accompanyDocType;
          file.ownerName=file.ownerName;
          file.uploadTime=file.uploadTime;
          file.attachmentAddress=file.attachmentAddress;
          this.attachmentTableData.push(file);
          this.attachmentTableDataAll.push(file);
        }else {
          for (let i=0;i<this.attachmentTableData.length;i++){
            if (file.uid === this.attachmentTableData[i].uid ){
              break;
            }
            else if (i === (this.attachmentTableData.length-1)) {
              file.documentName=file.name;
              file.attchmentId=file.attchmentId;
              file.accompanyDocType=this.form.accompanyDocType;
              file.ownerName=file.ownerName;
              file.uploadTime=file.uploadTime;
              file.attachmentAddress=file.attachmentAddress;
              this.attachmentTableData.push(file);
              this.attachmentTableDataAll.push(file);
              break;
            }
          }
        }
      },
      /*文件状态改变时没有包含文件被移除，因此增加文件移除时更新fileList*/
      fileUploadRemove(file,fileList){
        this.fileList = fileList;
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
        for (let i=0;i<this.attachmentTableData.length;i++){
          this.uploadFilePrams.push({
            "imDeclareDetailId": this.imDeclareDetailId,
            "ownerId": this.nickId,
            "ownerName": this.nickName,
            "ownerType": '1',
            "accompanyDocName": this.attachmentTableData[i].documentName,//当前文件的名称
            "accompanyDocType": this.attachmentTableData[i].accompanyDocType,//当前文件的类型
            "accompanyDocAddress": this.imDeclareDetailId+"/"+this.attachmentTableData[i].documentName,//文件路径，先写死。//"fileSize":
          });
        };
        this.postCallback={
          "callbackUrl":this.callbackUrl11+"/import/AccompanyDoc/callback",
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
        let now = Date.parse(new Date())/1000;
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
        console.log("上传文件成功",fileList);
        this.$refs.upload.clearFiles();
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
            'key':this.imDeclareDetailId+'/${filename}',//上传文件的object名称。
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
      uploadAttach(index,row){
        let param = {
          'BucketName':"maoqu-business",
          'FileName':row.attachmentAddress,
        }
        this.$axios7.post('file/Download',param)
          .then((response) =>{
            console.log('kkk',response)
            window.open(response.data.url)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>

<template>
  <div id="container">
    <div class="data-head">
      <!--<div class="data-top"><strong>数据安全备份</strong></div>-->
      <div class="data-head-label">查询:</div>
      <div id="data-head-select">
        <el-select v-model="selectValue" size="small" placeholder="请选择" @change="showBackupselect">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
       </div>
      <div id="data-head-search">
        <el-select  v-show="inputShow" v-model="fileName" size="small" filterable clearable @focus="loadFileNames" placeholder="请输入文件名" style="width: 100%">
          <el-option
            v-for="item in fileNames"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-show="dateShow" size="small" v-model="dateValue" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="起始时间" end-placeholder="结束时间" >
        </el-date-picker>
        <el-select  v-show="backupShow" size="small" v-model="backupType" filterable clearable @focus="loadBackupTypeOptions" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in backupTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div id="data-head-look">
      <el-button type="primary" size="small" name="dataQuery" @click="queryBackup">查 询</el-button>
      </div>
      <div class="data-head-right">
        <el-button class="queryFullBtn" size="small" @click="queryBackupInfoAll"  type="primary" name="dataQueryFull" >查 询 全 部</el-button>
        <el-button @click="backup" size="small" class="backupBtn"  style="margin-left: 0"  type="primary" name="dataQueryFull" >备 份</el-button>
      </div>
      <el-select class="backupSelect" size="small" v-model="backupValue" placeholder="请选择">
        <el-option
          v-for="item in backupOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="backupLabel" >备份:</div>

    <div class="idea-body">
      <el-table :data="backupData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="50"/>
         <el-table-column prop="backupContent" label="备份类型" width="280"/>
        <el-table-column prop="fileName" label="文件名" width="300"/>
        <el-table-column prop="time" label="备份时间"width="300"/>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="backupDownload(scope.$index, scope.row)">下载</el-button>
            <el-button
              size="mini"
              type="danger"
              @click=" backupDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="idea-buttom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="sizes, total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
    </div>
  </div>
  </div>
  </template>

<script>
  import './../../assets/css/webManager/dataBackup.css'
  export default {
    //定义数据
    data () {
      return {
        inputShow:false,
        dateShow:false,
        backupShow:true,
        pageSize:10,
        currentPage:1,
        total:0,
        selectValue:'backupType',
        fileInput:'',
        backupType:'',//备份类型
        backupValue:'',
        backupData:[],
        fileName:'',
        selectOptions: [{
          value: 'backupType',
          label: '备份类型'
        }, {
          value: 'fileName',
          label: '文件名'
        }, {
          value: 'backupTime',
          label: '备份时间'
        }],
        backupTypeOptions: [],
        value1: '',
        backupOptions: [{value:'数据库'},{value:'应用程序'}],
        dateValue:[],
        fileNames:[],
        timeout: null
      }
    },
    //定义组件
    components:{

    },
    //定义初始化函数
    mounted(){
      this.queryBackupInfoAll();
    },
    //定义方法
    methods:{
      //获取所有文件文件名
      loadFileNames(){
        this.fileNames = [];
        this.$axios2.post('backup/getBackupFileNames')
          .then(response => {
            // console.log(response.data);
            for(let i in response.data.data){
              this.fileNames.push({
                value:response.data.data[i],
                label:response.data.data[i]
              })
            }
        }).catch((error) => {
          console.log(error);
        })
      },
      //获取所有备份文件的类型
      loadBackupTypeOptions(){
        this.backupTypeOptions = [];
        this.$axios2.post('backup/getBackupFileCategory')
          .then(response => {
            // console.log(response.data);
            for(let i in response.data.data){
              this.backupTypeOptions.push({
                value:response.data.data[i],
                label:response.data.data[i]
              })
            }
          }).catch((error) => {
          console.log(error);
        })
      },
      //下载备份文件
     backupDownload(index,row){
        console.log('p',row)
       let params = {
         'BucketName':'maoqu-backup',
         'FileName':row.fileUrl
       };
       this.$axios7.post('file/Download',params)
         .then(response => {
           if(response.data.url != ''){
             window.open(response.data.url);
           }
       }).catch((error) => {
          console.log(error)
       })
     },
      //删除
     backupDelete(index,row){
       this.$confirm('此操作将永久删除该备份文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         let params = {
           'fileName':row.fileName,
           'backupContent':row.backupContent,
         };
         console.log('hhh',params)
         this.$axios2.post('backup/deleteBackupFile',params)
           .then((res) => {
             console.log('kkk',res);
             if(res.data.state == true){
               this.$message.success('删除成功');
               this.timeout = setTimeout(() => {
                 this.queryBackupInfoAll();
               }, 500);
             }
             else {
               this.$message.error(res.data.data);
             }
           }).catch((error) => {
           console.log(error);
           this.$message.error('请求失败');
         });
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

     },
      //页码点击查询
     handleCurrentChange(val) {
       console.log(`当前页: ${val}`);
       this.queryBackup();
     },
     showBackupselect(){
       if(this.selectValue==='backupType'){
         this.backupShow = true;
         this.dateShow = false;
         this.inputShow = false;
       }else if(this.selectValue==='fileName'){
         this.inputShow = true;
         this.dateShow = false;
         this.backupShow = false;
       }else {
         this.dateShow = true;
         this.inputShow = false;
         this.backupShow = false;
       }
     },
      //改变单页数据显示条数查询
      handleSizeChange(val){

      },
      queryBackup(){
        switch (this.selectValue){
          case 'backupType':this.queryBackupByCategory();break;
          case 'fileName':this.queryBackupByFileName();break;
          case 'backupTime':this.queryBackupByBackupTime();break;
          default:break;
        }
      },
      //初始化查询备份数据
      queryBackupInfoAll(){
        this.backupData = [];
        let params = {
          'pageNum':this.currentPage,
          'pageSize':this.pageSize,
        };
        this.$axios2.post('backup/findBackupInfoByPage',params)
          .then((res) => {
            if(res.data.data.state === true){
              this.$message.success('查询成功');
              this.total = res.data.data.data.total;
              let resData = res.data.data.data.list;
              for(let i=0;i<resData.length;i++){
                this.backupData.push({
                  'backupContent':resData[i].backupContent,
                  'fileName':resData[i].fileName,
                  'time':resData[i].backupTime,
                  'fileUrl':resData[i].fileUrl
                });
              }
            }else {
              this.$message.error('数据库无文件');
            }
          }).catch((error) => {
          console.log(error);
          this.$message.error('请求失败');
        });
      },
      //备份类型查询
      queryBackupByCategory(){
        this.backupData = [];
        let params = {
          'pageNum':this.currentPage,
          'pageSize':this.pageSize,
          'category':this.backupType,
        };
        if(params.category === ''){
          this.$message.error('请选择备份类型');
        }else {
          this.$axios2.post('backup/findBackupInfoByPageAndCategory',params)
            .then((res) => {
              if(res.data.state === true){
                this.$message.success('查询成功');
                this.total = res.data.data.total;
                let resData = res.data.data.list;
                for(let i=0;i<resData.length;i++){
                  this.backupData.push({
                    'backupContent':resData[i].backupContent,
                    'fileName':resData[i].fileName,
                    'time':resData[i].backupTime,
                    'fileUrl':resData[i].fileUrl
                  });
                }
              }else {
                this.$message.error('数据库无该类型文件');
              }
            }).catch((error) => {
            console.log(error);
            this.$message.error('请求失败');
          });
        }
      },
      //文件名查询
      queryBackupByFileName(){
        this.backupData = [];
        let params = {
          'pageNum':this.currentPage,
          'pageSize':this.pageSize,
          'fileName':this.fileName,
        };
        if(params.fileName === ''){
          this.$message.error('请输入文件名');
        }else {
          this.$axios2.post('backup/findBackupInfoByPageAndName',params)
            .then((res) => {
              if(res.data.state === true){
                this.$message.success('查询成功');
                this.total = res.data.data.total;
                let resData = res.data.data.list;
                for(let i=0;i<resData.length;i++){
                  this.backupData.push({
                    'backupContent':resData[i].backupContent,
                    'fileName':resData[i].fileName,
                    'time':resData[i].backupTime,
                    'fileUrl':resData[i].fileUrl
                  });
                }
              }else {
                this.$message.error('数据库无该名称文件');
              }
            }).catch((error) => {
            console.log(error);
            this.$message.error('请求失败');
          });
        }
      },
      //备份时间查询
      queryBackupByBackupTime(){
        this.backupData = [];
        let params = {
          'pageNum':this.currentPage,
          'pageSize':this.pageSize,
          'startTime':this.dateValue[0],
          'endTime':this.dateValue[1],
        };
        console.log(params)
        if(this.dateValue === []){
          this.$message.error('请选择查询时间范围');
        }else {
          this.$axios2.post('backup/findBackupInfoByPageAndTime',params)
            .then((res) => {
              console.log(res.data)
              if(res.data.state === true){
                this.$message.success('查询成功');
                this.total = res.data.data.total;
                let resData = res.data.data.list;
                for(let i=0;i<resData.length;i++){
                  this.backupData.push({
                    'backupContent':resData[i].backupContent,
                    'fileName':resData[i].fileName,
                    'time':resData[i].backupTime,
                    'fileUrl':resData[i].fileUrl
                  });
                }
              }else {
                this.$message.error('数据库无该时间范围文件');
              }
            }).catch((error) => {
            console.log(error);
            this.$message.error('请求失败');
          });
        }
      },
      //备份到本地
      backup(){
       let params = {
         'backupContent':this.backupValue
       };
       console.log(params);
       this.$axios2.post('backup/backupByCategory',params)
         .then((res) =>{
           console.log(res);
           this.$message.success('备份成功');
         }).catch(error => {
           console.log(error);
           this.$message.error('备份失败');
       })
      }
    }
  }
</script>

<template>
  <el-dialog title="编辑使用人信息" :visible.sync="dialogUserVisible" width="50%" append-to-body>
    <div>
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用单位联系人"  label-width="110px" class="formItem">
              <el-input v-model="form.useEntitiesContact"  size="small" :disabled="isDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用单位联系电话"  label-width="140px" class="formItem">
              <el-input v-model="form.useEntitiesContactPhone"  size="small" :disabled="isDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="mini" @click="addUserInfo" :disabled="isDisabled">新  增</el-button>
      <el-button type="primary" size="mini" @click="saveUserInfo" :disabled="isDisabled">保  存</el-button>
      <!--<el-button type="primary" size="mini" @click="deleteUserInfo" :disabled="isDisabled">删  除</el-button>-->
    </div>
    <div>
      <el-table :data="userTableData" :disabled="isDisabled" stripe style="width: 100%" @cell-click="handleSelectionChange">
        <el-table-column type="index" label="序号" width="90">
        </el-table-column>
        <el-table-column prop="useEntitiesContact" label="使用单位联系人">
        </el-table-column>
        <el-table-column prop="useEntitiesContactPhone" label="使用单位联系电话">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteUserInfo(scope.$index)" style="color: #ff4d51;" type="text" size="small">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      //定义数据
      data () {
        return {
          isDisabled:false,
          dialogUserVisible:false,
          userTableData:[],
          form:{},
          selection:'',
          editFlag:false
        }
      },
      //定义组件
      components:{

      },
      //定义初始化函数
      mounted(){

      },

      //定义方法
      methods:{
        //显示使用人对话框
        showUserInfoDialog(val){
          this.userTableData = [];
          if(val != undefined){
            for(var i = 0;i<val.length;i++){
              this.userTableData.push({
                useEntitiesContact:val[i].useEntitiesContact,
                useEntitiesContactPhone:val[i].useEntitiesContactPhone,
              })
            }
          }
          this.dialogUserVisible = true;
        },
        //新增按钮
        addUserInfo(){
          this.form = {};
        },
        //保存按钮
        saveUserInfo(){
          if(this.form.useEntitiesContact !== undefined
            && this.form.useEntitiesContactPhone !== undefined
            && this.form.useEntitiesContact !== ''
            && this.form.useEntitiesContactPhone !== ''){
            if(this.editFlag == false){
              this.userTableData.push(
                {
                  useEntitiesContact:this.form.useEntitiesContact,
                  useEntitiesContactPhone:this.form.useEntitiesContactPhone,
                }
              );
            }
            this.editFlag = false;
            this.form = {};
            this.$store.commit("updateUserInfo",this.userTableData);
            this.$emit("listenUserInfo",this.userTableData);
          }
          else {
            this.$message.error('使用单位联系人或使用单位联系电话不能为空!');
          }
        },
        handleSelectionChange(row,col){
          if(col.label != '操作'){
            this.form = row;
            this.editFlag = true;
          }
        },
        //删除按钮
        deleteUserInfo(index){
          this.userTableData.splice(index,1);
          this.$store.commit("updateUserInfo",this.userTableData);
          this.$emit("listenUserInfo",this.userTableData);
        },
      }
    }
</script>

<style scoped>

</style>

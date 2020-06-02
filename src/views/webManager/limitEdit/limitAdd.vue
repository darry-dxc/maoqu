<template>
    <div>
      <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">新建</el-button>
      <el-dialog title="新建角色" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-row>
          <el-form-item label="角色名称" :label-width="formLabelWidth" required>
            <el-input v-model="form.limitName" auto-complete="off" />
          </el-form-item>
          </el-row>
          <el-row>
          <el-form-item label="角色类型" :label-width="formLabelWidth" required>
            <el-select v-model="form.limitType" placeholder="报关" style="width: 100%">
              <el-option label="报关" value="1"></el-option>
              <el-option label="拖车" value="2"></el-option>
              <el-option label="订舱" value="3"></el-option>
              <el-option label="等等" value="4"></el-option>
            </el-select>
          </el-form-item>
          </el-row>
          <el-row>
          <el-form-item label="显示序号" :label-width="formLabelWidth" required>
            <el-input v-model="form.displayNo" />
          </el-form-item>
          </el-row>
          <el-row>
          <el-form-item label="角色状态" :label-width="formLabelWidth"required>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
          </el-row>
          <el-row>
          <el-form-item label="角色说明" :label-width="formLabelWidth" >
            <el-input v-model="form.roleExplain" auto-complete="off"  type="textarea" rows="10" placeholder="请输入内容..." />
          </el-form-item>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="AddLimit" class="sure" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webManager/limitEdit/limitAdd.css';
    export default {
        data() {
            return {
              dialogFormVisible: false,
              //商品要素
              radio: '1',
              flag:'',
              form: {
                limitName:'',
                limitType:'',
                displayNo:'',
                roleState:'',
                roleExplain:'',
              },
              formLabelWidth: '100px',
              notNull:'11'
            }
        },
  methods:{
        //新增角色
      AddLimit(){
         if(this.radio==='1'){
         this.flag=true;
        }else if(this.radio==='2'){
          this.flag=false;
        }
        let params={
        "type":1,
        "roleName":this.form.limitName,
        "isDeleted":this.flag,
        "roleNo":this.form.displayNo,
        "description":this.form.roleExplain,
        "author":'xiaofang'
      };
      console.log(params);
          this.$axios1.post("/admin/audRole",params).then((response)=>{
        let res = response.data;
        console.log(res);
        if(res.state=="1"){
        this.$parent.findAllRoles();
        this.$message.success('新增成功');
         this.dialogFormVisible=false;
          }else{
          console.log("请求失败");
          }
         });
        this.dialogFormVisible = false;
        }
      }
    }
</script>

<style scoped>

</style>

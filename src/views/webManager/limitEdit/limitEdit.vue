<template>
  <div>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" width="1000px">
      <el-form :model="form">
        <el-row>
          <el-form-item label="角色名称" :label-width="formLabelWidth" :label-suffix="notNull" class="label" required>
            <el-input v-model="form.limitName" auto-complete="off" class="input" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="角色类型" :label-width="formLabelWidth" class="label" required>
            <el-select v-model="form.limitType"  auto-complete="off"  placeholder="报关" >
              <el-option label="报关" value="baoguan"></el-option>
              <el-option label="拖车" value="tuoche"></el-option>
              <el-option label="订舱" value="dingchang"></el-option>
              <el-option label="等等" value="dengdeng"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="显示序号" :label-width="formLabelWidth" class="label" required>
            <el-input v-model="form.displayNo" auto-complete="off" class="input" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="角色状态" :label-width="formLabelWidth" class="label" required>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="角色说明" :label-width="formLabelWidth" class="label">
            <el-input v-model="form.roleExplain" auto-complete="off"  type="textarea" rows="10" placeholder="请输入内容..." class="input" />
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
        <el-button type="primary" class="sure" @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webManager/limitEdit/limitAdd.css';
  export default {
    data() {
      return {
        AddLimit:'',
        dialogFormVisible: false,
        oldName:'',
        radio: '1',
        flag:'',
        form: {
          limitName:'',
          limitType:'',
          displayNo:'',
          roleState:'',
          roleExplain:'',
        },
        formLabelWidth: '150px',
        notNull:'11'
      }
    },
    methods:{
       //关闭
    close(){
      this.dialogFormVisible=false;
    },
      //编辑权限管理
      editRole(){
        if(this.radio==='1'){
          this.flag=true;
        }else if(this.radio==='2'){
          this.flag=false;
        }
        let params={
        "type":3,
        "roleName":this.oldName,
        "newRoleName":this.form.limitName,
        "isDeleted": this.flag,
        "roleNo":this.form.displayNo,
        "description":this.form.roleExplain,
        "author":'xiaofang'
      };

    console.log(params);
      this.$axios1.post("basicService/admin/audRole",params).then((response)=>{
        let res = response.data;
        console.log(res);
        if(res.state=="1"){
          console.log("请求成功");
         this.$message.success('编辑成功');
         this.$parent.findAllRoles();
         this.dialogFormVisible=false;
          }else if(res.state=="0"){
          console.log("添加失败");
          }else if(res.state=="2"){
          console.log("操作的该角色不存在");
          }else if(res.state=="3"){
          console.log("newRoleName已存在");
          this.$message('newRoleName已存在');
          }else{
          console.log("请求失败");
          }
         }).catch((error) =>{
          console.log(error);
        })
        this.dialogFormVisible = false;
        },
      //查看当前信息
    showLimit(val){
        this.dialogFormVisible=true;
        this.oldName = val.roleName;
        this.form.limitName = val.roleName;
        this.form.limitType = val.roleType;
        this.form.displayNo = val.limitNumber;
        this.form.roleState = val.roleState;
        this.form.roleExplain = val.roleInstruction;
      }
    }
  }
</script>

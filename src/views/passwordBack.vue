<template>
  <div class="passwordContent">
    <div class="passwordBack">
      <h2 class="passwordtitle">找回密码</h2>
      <el-form :model="password" :rules="rules" label-width="100px" class="passwordForm">
        <el-form-item  label="手机号码:" class="passwordInput"  required>
          <el-input />
        </el-form-item>
        <el-form-item  label="验证码:" class="passwordInput"  required>
          <el-input >
            <template slot="append"><el-button>获取验证码</el-button></template>
          </el-input>
        </el-form-item>
        <el-form-item  label="设置新密码:" class="passwordInput" prop="pass"  required>
          <el-input />
        </el-form-item>
        <el-form-item  label="确认新密码:" class="passwordInput" prop="checkPass"  required>
          <el-input />
        </el-form-item>
        <el-form-item  class="passwordBtn" >
          <el-button type="primary" class="conPassword" >重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import './../../src/assets/css/passwordBack.css';
  export default {
    //定义数据
    data () {
      return {

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
    }
  }
</script>


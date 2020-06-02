<template>
  <div>
    <!--<div class="accountSafe-head">-->
      <!--<span class="infoText1">安全级别：</span>-->
      <!--<el-progress class="account-grade" :percentage="70" :stroke-width="18" color="green" :show-text="false"></el-progress>-->
    <!--</div>-->
    <div style="height: 100%;background-color: white">
      <el-collapse v-model="activeName" @change="activeNameChange" accordion align-center>
        <el-collapse-item name="1">
          <template slot="title">
            <i class="el-icon-success" style="color: green; font-size: 20px; padding-left: 20px"></i>
            <span style="font-size: 20px; font-weight: 700; padding-left: 50px">登录密码</span>
            <span style="color: #ff0000; padding-left: 100px">互联网账号存在被盗风险，建议定期更换密码以保护账户安全</span>
            <span style="float: right; font-size: 16px">修改</span>
          </template>
          <div class="stepsDiv">
            <el-steps :active="activePass" finish-status="success" style="width: 800px">
              <el-step title="验证身份"></el-step>
              <el-step title="修改密码"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <div class="conDiv">
            <!-- 通过登录密码验证身份表单 -->
            <el-form v-model="passwordVerifyForm" v-if="passwordflag=='A'" label-width="130px" >
              <el-form-item prop="password" label="请输入登录密码:">
                <el-row>
                  <el-col :span="8">
                    <el-input type="password" v-model="passwordVerifyForm.password" ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-col :span="5">
                  <el-input v-model="passwordVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="3" >
                  <div @click="refreshCode">
                    <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='P1'" style="margin-left: 5px;" />
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPass" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证邮箱身份表单 -->
            <el-form v-model="mailVerifyForm"  v-if="passwordflag=='B'" label-width="120px" >
              <el-form-item prop="password" label="已验证邮箱:">
                <el-row>
                  <el-col :span="8">
                    <span>{{email}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-col :span="5">
                  <el-input v-model="mailVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="3">
                  <div @click="refreshCode">
                    <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='E1'" style="margin-left: 5px" />
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendVerifyByEmail" size="small">发送验证邮件</el-button>
              </el-form-item>
              <el-form-item label="邮件验证码:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="mailVerifyForm.emailCode" ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByEmail" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证手机身份表单 -->
            <el-form v-model="phoneVerifyForm" v-if="passwordflag=='C'" label-width="150px" >
              <el-form-item prop="password" label="已验证手机:">
                <el-row>
                  <el-col :span="8">
                    <span>{{phoneNumber}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="请填写手机验证码:">
                <el-col :span="8">
                  <el-input v-model="phoneVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button type="primary" size="small" v-if="show1" @click="sendIdentifyCode1">获取短信校验码</el-button>
                  <el-button id="timer1" type="button" v-if="!show1" disabled>{{count1}} s</el-button>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPhone" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 设置新密码 -->
            <el-form v-model="newPasswordForm" :rules="rulesNewPass"  label-width="100px" v-if="passwordflag=='D'">
              <el-form-item  label="设置新密码:" prop="newpassword">
                <el-row>
                  <el-col :span="8">
                    <el-input type="password" v-model="newPasswordForm.newpassword"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="确认新密码:"prop="newpasswordCheck">
                <el-row>
                  <el-col :span="8">
                    <el-input type="password" v-model="newPasswordForm.newpasswordCheck" ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveNewPass" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!--登录密码修改成功  -->
            <div class="passSuc" v-if="passwordflag=='E'">
              <i class="el-icon-success" style="color: green; font-size: 20px;"></i><span class="text2" style="text-align: center">恭喜您，密码修改成功！</span><br><span>即将返回登录界面，</span><span style="color: red">请重新登录！</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="el-icon-success" style="color: green; font-size: 20px; padding-left: 20px"></i>
            <span style="font-size: 20px; font-weight: 700; padding-left: 50px">邮箱验证</span>
            <span style="padding-left: 100px">您验证的邮箱：{{email}}</span>
            <span style="float: right; font-size: 16px">修改</span>
          </template>
          <div class="stepsDiv">
            <el-steps :active="activeEmail" finish-status="success">
              <el-step title="验证身份"></el-step>
              <el-step title="修改邮箱"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <div class="conDiv">
            <!-- 通过登录密码验证身份表单 -->
            <el-form v-model="passwordVerifyForm" v-if="emailflag=='A'" label-width="130px" >
              <el-form-item prop="password" label="请输入登录密码:">
                <el-row>
                  <el-col :span="8">
                    <el-input type="password" v-model="passwordVerifyForm.password" ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-col :span="5">
                  <el-input v-model="passwordVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="3">
                  <div @click="refreshCode">
                    <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='P2'" style="margin-left: 5px" />
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPass" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证邮箱身份表单 -->
            <el-form v-model="mailVerifyForm" v-if="emailflag=='B'" label-width="120px" >
              <el-form-item prop="password" label="已验证邮箱:">
                <el-row>
                  <el-col :span="8">
                    <span>{{email}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-row>
                  <el-col :span="5">
                    <el-input v-model="mailVerifyForm.passCode" ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <div @click="refreshCode">
                      <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='E2'" style="margin-left: 5px" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendVerifyByEmail" size="small">发送验证邮件</el-button>
              </el-form-item>
              <el-form-item label="邮件验证码:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="mailVerifyForm.emailCode" ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByEmail" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证手机身份表单 -->
            <el-form v-model="phoneVerifyForm" v-if="emailflag=='C'" label-width="150px" >
              <el-form-item prop="password" label="已验证手机:">
                <el-row>
                  <el-col :span="8">
                    <span>{{phoneNumber}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="请填写手机验证码:">
                <el-col :span="8">
                  <el-input v-model="phoneVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button type="primary" size="small" v-if="show2" @click="sendIdentifyCode1">获取短信校验码</el-button>
                  <el-button id="timer2" type="primary" v-if="!show2" disabled>{{count2}} s</el-button>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPhone" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 设置新邮箱 -->
            <el-form v-model="newEmailForm" :rules="rulesNewMail" label-width="100px" v-if="emailflag=='D'">
              <el-form-item  label="我的邮箱:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="newEmailForm.newEmail"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="验证码：">
                <el-row>
                  <el-col :span="5">
                    <el-input v-model="newEmailForm.passCode" ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <div @click="refreshCode">
                      <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='NE'" style="margin-left: 5px" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveNewEmail" size="small">保存</el-button>
              </el-form-item>
            </el-form>
            <!--发送邮件  -->
            <div class="passSuc" v-if="emailflag=='E'">
              <i class="el-icon-success" style="color: green; font-size: 20px"></i><span class="text2">已发送验证邮件至：{{this.newEmailForm.newEmail}}</span>
              <p style="color: red">（请立即完成验证，邮箱验证不通过则修改邮箱失败）</p>
              <p>验证邮箱24小时内有效，请尽快登录您的邮箱点击验证链接完成验证</p>
              <el-button type="danger" @click="queryNewEmail" size="small">发送验证邮件</el-button>
            </div>
            <!--邮箱验证成功  -->
            <div class="passSuc" v-if="emailflag=='F'">
              <i class="el-icon-success" style="color: green; font-size: 20px"></i><span class="text2" style="text-align: center">恭喜您，邮箱修改成功！</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <i class="el-icon-success" style="color: green; font-size: 20px; padding-left: 20px"></i>
            <span style="font-size: 20px; font-weight: 700; padding-left: 50px">手机验证</span>
            <span style="padding-left: 100px">您验证的手机：{{phoneNumber}}   若已丢失或停用，请立即更换，</span>
            <span style="color: #ff0000;">避免账户被盗</span>
            <span style="float: right; font-size: 16px">修改</span>
          </template>
          <div class="stepsDiv">
            <el-steps :active="activePhone" finish-status="success">
              <el-step title="验证身份"></el-step>
              <el-step title="修改手机"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <div class="conDiv">
            <!-- 通过登录密码验证身份表单 -->
            <el-form v-model="passwordVerifyForm"  v-if="phoneflag=='A'" label-width="130px" >
              <el-form-item prop="password" label="请输入登录密码:">
                <el-row>
                  <el-col :span="8">
                    <el-input type="password" v-model="passwordVerifyForm.password" ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-col :span="5">
                  <el-input v-model="passwordVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="3">
                  <div @click="refreshCode">
                    <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='P3'" style="margin-left: 5px" />
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPass" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证邮箱身份表单 -->
            <el-form v-model="mailVerifyForm" v-if="phoneflag=='B'" label-width="120px" >
              <el-form-item prop="password" label="已验证邮箱:">
                <el-row>
                  <el-col :span="8">
                    <span>{{email}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByPhone">通过已验证手机验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="验证码:">
                <el-row>
                  <el-col :span="5">
                    <el-input v-model="mailVerifyForm.passCode" ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <div @click="refreshCode">
                      <identify :identifyCode="identifyCode" v-if="identifyCodeflag=='E3'" style="margin-left: 5px" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendVerifyByEmail" size="small">发送验证邮件</el-button>
              </el-form-item>
              <el-form-item label="邮件验证码:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="mailVerifyForm.emailCode" ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByEmail" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 通过已验证手机身份表单 -->
            <el-form v-model="phoneVerifyForm" v-if="phoneflag=='C'" label-width="150px" >
              <el-form-item prop="password" label="已验证手机:">
                <el-row>
                  <el-col :span="8">
                    <span>{{phoneNumber}}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="verifyByEmail">通过已验证邮箱验证</el-button>
                    <el-button type="text" @click="verifyByPass">通过登录密码验证</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="passCode" label="请填写手机验证码:">
                <el-col :span="8">
                  <el-input v-model="phoneVerifyForm.passCode" ></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button type="primary" size="small" v-if="show3" @click="sendIdentifyCode1">获取短信校验码</el-button>
                  <el-button id="timer3" type="primary" v-if="!show3" disabled>{{count3}} s</el-button>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitVerifyByPhone" size="small">提交</el-button>
              </el-form-item>
            </el-form>
            <!-- 设置新手机号 -->
            <el-form v-model="newPhoneForm" :rules="rulesNewPhone" label-width="100px" v-if="phoneflag=='D'">
              <el-form-item  label="我的手机:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="newPhoneForm.newphone"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="手机验证码:">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="newPhoneForm.phoneNumberCode" ></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" @click="sendIdentifyCode" v-if="show" size="small">获取短信校验码</el-button>
                    <el-button id="timer" type="primary" v-if="!show" disabled>{{count}} s</el-button>
                  </el-col>
                  <el-col>
                    <el-button type="primary" @click="saveNewPhone" size="small">提交</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <!--手机修改成功  -->
            <div class="passSuc" v-if="phoneflag=='E'">
              <i class="el-icon-success" style="color: green; font-size: 20px"></i><span class="text2" style="text-align: center">恭喜您，手机修改成功！</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import './../../assets/css/webCompany/accountSafe.css'
  import identify from './../../../src/components/identify';
  import { mapState } from 'vuex'
  export default {
    //定义数据
    data() {
      //判断两次输入的密码是否一致
      var newpasswordVericy = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('！请再次输入密码'));
        }
        else if (value !== this.newPasswordForm.newpassword) {
          callback(new Error('！输入密码不正确'));
        }
        else {
          callback();
        }
      };
      return {
        email: '',
        phoneNumber: '',
        activeName: '',
        activePass: 0,
        activeEmail: 0,
        activePhone: 0,
        passwordVerifyForm: {},
        mailVerifyForm: {},
        phoneVerifyForm: {},
        newPasswordForm: {},//设置新密码
        newEmailForm: {},//设置新邮箱
        newPhoneForm: {},//设置新手机
        identifyCodes: "1234567890",
        identifyCode: '',//验证码
        identifyCodeflag:'P1',//验证码显示标志位
        passwordflag: 'A',
        emailflag: 'B',
        phoneflag: 'C',
        show: true,
        count: 0,//倒计时
        show1: true,
        count1: 0,//倒计时
        show2: true,
        count2: 0,//倒计时
        show3: true,
        count3: 0,//倒计时
        passTaken: '',
        //设置新密码表单验证规则
        rulesNewPass: {
          newpassword: [
            {required: true, message: '！密码不能为空', trigger: 'blur'},
          ],
          newpasswordCheck: [
            {required: true, validator: newpasswordVericy, trigger: 'blur'}
          ],
        },
        // 设置新手机号表单验证规则
        rulesNewPhone: {
          newphone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            //手机校验
            {
              validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                  callback(new Error("请输入正确的手机号"));
                } else {

                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          phoneNumberCode: [
            {required: true, message: '！手机验证码不能为空', trigger: 'blur'},
          ],
        },

        // 设置新邮箱表单验证规则
        rulesNewMail: {
          newEmail: [
            {required: true, message: '！邮箱不能为空', trigger: 'blur'},
            {type: "email", message: '！请输入有效的邮箱地址', trigger: 'blur'}
          ],
        },
      }

    },
    components: {
      identify
    },
    activated() {
      let dataCompanyPhone=JSON.parse(localStorage.getItem('Phone2'));
      this.$store.commit("updateCompanyPhone",dataCompanyPhone);
      let dataCompanyEmail=JSON.parse(localStorage.getItem('Email2'));
      this.$store.commit("updateCompanyEmail",dataCompanyEmail);
      let dataCompanyName=JSON.parse(localStorage.getItem('Name2'));
      this.$store.commit("updateCompanyName",dataCompanyName);
      this.email = this.nickCompanyEmail.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2');//隐藏邮箱中间数字
      this.phoneNumber = this.nickCompanyPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');//隐藏手机号中间数字
      this.activeName = '';
      this.activePass = 0;
      this.activeEmail = 0;
      this.activePhone = 0;
      this.passwordflag = 'A';
      this.emailflag = 'B';
      this.phoneflag = 'C';
    },
    destroyed() {
      this.identifyCode = "";
      this.identifyCodeflag = 'P1';
    },
    //定义初始化函数
    mounted() {
      let dataCompanyPhone=JSON.parse(localStorage.getItem('Phone2'));
      this.$store.commit("updateCompanyPhone",dataCompanyPhone);
      let dataCompanyEmail=JSON.parse(localStorage.getItem('Email2'));
      this.$store.commit("updateCompanyEmail",dataCompanyEmail);
      let dataCompanyName=JSON.parse(localStorage.getItem('Name2'));
      this.$store.commit("updateCompanyName",dataCompanyName);
      this.email = this.nickCompanyEmail.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2');//隐藏邮箱中间数字
      this.phoneNumber = this.nickCompanyPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');//隐藏手机号中间数字
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    computed: {
      nickCompanyPhone(){
        return this.$store.state.nickCompanyPhone;
      },
      nickCompanyEmail(){
        return this.$store.state.nickCompanyEmail;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      },
    },
    //定义方法
    methods: {
      //更新验证码
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);

      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      //生成验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },
      activeNameChange(val) {
        this.activeName = val;
        if (this.activeName === '1') {
          this.identifyCodeflag = 'P1';
        }
        else if (this.activeName === '2') {
          this.identifyCodeflag = 'E2';
        }
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      verifyByPhone() {
        if (this.activeName === '1') {
          this.passwordflag = 'C';
        }
        else if (this.activeName === '2') {
          this.emailflag = 'C';
        }
        else if (this.activeName === '3') {
          this.phoneflag = 'C';
        }
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      verifyByEmail() {
        if (this.activeName === '1') {
          this.identifyCodeflag = 'E1';
          this.passwordflag = 'B';
        }
        else if (this.activeName === '2') {
          this.identifyCodeflag = 'E2';
          this.emailflag = 'B';
        }
        else if (this.activeName === '3') {
          this.identifyCodeflag = 'E3';
          this.phoneflag = 'B';
        }
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      verifyByPass() {
        if (this.activeName === '1') {
          this.identifyCodeflag = 'P1';
          this.passwordflag = 'A';
        }
        else if (this.activeName === '2') {
          this.identifyCodeflag = 'P2';
          this.emailflag = 'A';
        }
        else if (this.activeName === '3') {
          this.identifyCodeflag = 'P3';
          this.phoneflag = 'A';
        }
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      //使用登录密码验证身份
      submitVerifyByPass() {
        if (this.passwordVerifyForm.passCode === this.identifyCode) {
          this.$axios1.post("/passwordAuth", {
            "password": this.passwordVerifyForm.password,
          }).then((response) => {
            let res = response.data;
            if (res.code == 200) {
              this.passTaken = res.data;
              if (this.activeName === '1') {
                this.passwordflag = 'D';
                this.activePass = 1;
              }
              else if (this.activeName === '2') {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
                this.identifyCodeflag = 'NE';
                this.emailflag = 'D';
                this.activeEmail = 1;

              }
              else if (this.activeName === '3') {
                this.phoneflag = 'D';
                this.activePhone = 1;
              }
            }
            else if(res.code == 40109){
              this.$message.error("登录密码错误，请求失败！");
              this.identifyCode = "";
              this.makeCode(this.identifyCodes, 4);
            }else {
              this.$message.error("请求失败！请重试");
            }
          });
        }
        else {
          this.$message.error("验证码错误！");
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        }
      },
      //使用邮件验证身份
      submitVerifyByEmail() {
        this.$axios1.post("/emailCodeAuth", {
          "identifyCode": this.mailVerifyForm.emailCode,
        }).then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.passTaken = res.data;
            if (this.activeName === '1') {
              this.passwordflag = 'D';
              this.activePass = 1;
            }
            else if (this.activeName === '2') {
              this.identifyCode = "";
              this.makeCode(this.identifyCodes, 4);
              this.identifyCodeflag = 'NE';
              this.emailflag = 'D';
              this.activeEmail = 1;
            }
            else if (this.activeName === '3') {
              this.phoneflag = 'D';
              this.activePhone = 1;
            }
          } else {
            this.$message.error(res.msg);
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
          }
        });

    },
    //使用手机号验证身份
    submitVerifyByPhone() {
      this.$axios1.post("/phoneAuth", {
        "identifyCode": this.phoneVerifyForm.passCode,
      }).then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.passTaken = res.data;
          if (this.activeName === '1') {
            this.passwordflag = 'D';
            this.activePass = 1;
          } else if (this.activeName === '2') {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
            this.identifyCodeflag = 'NE';
            this.emailflag = 'D';
            this.activeEmail = 1;
          } else if (this.activeName === '3') {
            this.phoneflag = 'D';
            this.activePhone = 1;
          }
        }
        else if(res.code === 40108){
          this.$message.error("手机验证码错误!");
        }else {
          this.$message.error("请求失败!请稍后重试!");
        }
      });

    },
    // 保存密码
    saveNewPass() {
      this.$axios1.post("/updatePsw", {
        "token": this.passTaken,
        "newPsw": this.newPasswordForm.newpassword,
      }).then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.activePass = 2;
          this.activePass = 3;
          this.passwordflag = 'E';
          this.$message.success('密码修改成功！即将跳转到登录页面！')
          setTimeout(() => {
            this.$router.push({path:'/WebPortals/Login'});
          },1000)
        }
        else {
          this.$message.error("密码修改失败！");
        }
      });
    },
    //发送验证邮件，保存邮箱
    saveNewEmail() {
      let param = {
        "newEMail": this.newEmailForm.newEmail,
        "token": this.passTaken,
      };
      if(this.newEmailForm.passCode ===this.identifyCode){
        this.$axios1.post("/updateEmail", param)
          .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.$message.success('邮箱修改成功!')
            this.activeEmail = 2;
            // this.emailflag = 'E';
            this.emailflag = 'F';
            this.activeEmail = 3;
            localStorage.setItem('Email2',JSON.stringify(this.newEmailForm.newEmail));
            this.$store.commit("updateCompanyEmail",this.newEmailForm.newEmail);
          }
          else {
            this.$message.error("邮箱修改失败！");
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
          }
        });
      } else{
        this.$message.error(res.msg);
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      }
    },
      //保存新手机号
      saveNewPhone(){
        this.$axios1.post("/updatePhone", {
          "token": this.passTaken,
          "newPhone": this.newPhoneForm.newphone,
          "identifyCode": this.newPhoneForm.phoneNumberCode,
        }).then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.activePhone = 2;
            this.phoneflag = 'E';
            this.activePhone = 3;
            this.$message.success('手机号码修改成功!')
            localStorage.setItem('Phone2',JSON.stringify(this.newPhoneForm.newphone));
            this.$store.commit("updateCompanyPhone",this.newPhoneForm.newphone);
          }
          else {
            this.$message.error(res.msg);
          }
        });
      },
    //查看验证邮件
    queryNewEmail() {
      this.emailflag = 'F';
      this.activeEmail = 3;
    },
    //发送手机验证码事件
    sendIdentifyCode() {
      //60秒倒计时
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
      this.$axios1.post("/getIdentifyCode", {
        "phone": this.newPhoneForm.newphone
      }).then((response) => {
        let res = response.data;
        if (res.code === 200) {
          this.$message.success("手机校验码发送成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    sendIdentifyCode1() {
      //60秒倒计时
      const TIME_COUNT = 60;
      if (this.activeName === '1') {
        if (!this.timer1) {
          this.count1 = TIME_COUNT;
          this.show1 = false;
          this.timer1 = setInterval(() => {
            if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
              this.count1--;
            } else {
              this.show1 = true;
              clearInterval(this.timer1);
              this.timer1 = null;
            }
          }, 1000)
        }
      }
      else if (this.activeName === '2') {
        if (!this.timer2) {
          this.count2 = TIME_COUNT;
          this.show2 = false;
          this.timer2 = setInterval(() => {
            if (this.count2 > 0 && this.count2 <= TIME_COUNT) {
              this.count2--;
            } else {
              this.show2 = true;
              clearInterval(this.timer2);
              this.timer2 = null;
            }
          }, 1000)
        }

      }
      else if (this.activeName === '3') {
        if (!this.timer3) {
          this.count3 = TIME_COUNT;
          this.show3 = false;
          this.timer3 = setInterval(() => {
            if (this.count3 > 0 && this.count3 <= TIME_COUNT) {
              this.count3--;
            } else {
              this.show3 = true;
              clearInterval(this.timer3);
              this.timer3 = null;
            }
          }, 1000)
        }
      }
      this.$axios1.post("/getIdentifyCode", {
        "phone": this.nickCompanyPhone
      }).then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.$message.success("手机校验码发送成功");
        } else {
          this.$message.error("请求失败！");
        }
      });
    },
    sendVerifyByEmail() {
      if (this.mailVerifyForm.passCode === this.identifyCode) {
        this.$axios1.post("/getEmailIdentifyCode", {
          "email": this.nickCompanyEmail
        }).then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.$message.success("验证邮件发送成功");
          } else {
            this.$message.error(res.msg);
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
          }
        });
      }
      else {
        this.$message.error(res.msg);
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      }
    },
  }
}
</script>



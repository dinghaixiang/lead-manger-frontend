<template>
  <div class="login-wrapper">

    <div class="af-col-12 login-input-wrapper" v-show="state===1">
      <div class="login-input">
        <label class="login-input-title">用户登录</label>
        <input class="staff-account" type="text" placeholder="用户名" v-model="staffCode"/>
        <input class="staff-password" type="password" placeholder="密码" v-model="password"/>
        <span class="login-error">
          <label @click="switchBtn">注册</label>
          <label>{{loginErrorTips}}</label>
          <router-link tag="label" to="/login/forget-pwd" style="cursor: pointer;">忘记密码?</router-link>
          <!--<label v-if="supportForgetPassword" >忘记密码?</label>-->
        </span>
        <input type="button" value="登录" @click="submit" @keyup.enter="submit"/>
      </div>
    </div>
    <div class="af-col-12 login-input-wrapper" v-show="state===2">
      <div class="login-input">
        <label class="login-input-title">用户注册</label>
        <input class="staff-account" type="text" placeholder="请输入用户名" v-model="staffCode"/>
        <input class="staff-password" type="password" placeholder="请输入密码" v-model="password"/>
        <input class="staff-password" type="password" placeholder="请再次输入密码" v-model="password2"/>
        <span class="login-error">
          <label @click="switchBtn">登录</label>
          <label>{{loginErrorTips}}</label>
          <router-link tag="label" to="/login/forget-pwd" style="cursor: pointer;">忘记密码?</router-link>
          <!--<label v-if="supportForgetPassword" >忘记密码?</label>-->
        </span>
        <input type="button" value="注册" @click="register"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import auth from '../../auth';
  export default {
    name: 'login',

    data () {
      return {
        loginError: null,
        // supportForgetPassword: true,
        staffCode: '',
        password: '',
        password2: '',
        state: 1
      };
    },

    computed: {
      loginErrorTips () {
        if (this.loginError === null) {
          return '';
        }
        if (typeof this.loginError === 'string') {
          return this.loginError;
        }
        // 业务级失败
        if (this.loginError.status === 200) {
          return this.loginError.data.message;
        }
        // 服务端异常
        return '系统异常';
      }
    },

    methods: {
      check: function () {
        if (this.staffCode === '' || this.password === '') {
          this.loginError = this.staffCode === '' ? '请输入用户名' : '请输入密码';
          return false;
        }
        return true;
      },
      register: function () {
        let param={'userName':this.staffCode,'userPwd':this.password};
        axios.post('/free-api/register',param).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
            this.state = 1;
          }else {
            this.loginError=response.data.message;
          }
        })
      },
      switchBtn: function () {
       this.state = this.state ===1?2:1;
      },
      submit: function () {
        let credentials = {
          userName: this.staffCode,
          userPwd: this.password
        };
       this.check() && auth.login(this, credentials, '/lead/list');
      },

      clearLoginError: function () {
        this.loginError = null;
      },

      enterListener: function (e) {
        let key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          this.submit();
        }
      }
    },

    watch: {
      staffCode: function (val, oldVal) {
        this.clearLoginError();
      },

      password: function (val, oldVal) {
        this.clearLoginError();
      }
    },

    mounted: function () {
      document.body.style['background-color'] = '#fff';
      window.addEventListener('keyup', this.enterListener);
    },

    destroyed: function () {
      document.body.style['background-color'] = null;
      window.removeEventListener('keyup', this.enterListener);
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base';
  .login-wrapper {
    height: 560px;
    font-size: 16px;
    padding: 9% 3% 0 60%;
    background-color: #daf3fa;
  }

  .login-wrapper .login-logo-wrapper {
    margin-top: 80px;
    height: 420px;
    line-height: 420px;
  }

  #login-logo {
    height: 100%;
    vertical-align: middle;
  }

  .login-wrapper .login-input-wrapper {
    width: 300px;
    margin-left: 80px;
    background-color: #fff;
    text-align: center;
    /*border-radius: 7px;*/
  }

  .login-input {
    padding: 24px 20px;
  }

  .login-input-title {
    font-size: 18px;
    color: @blue-color;
  }

  .login-input input {
    width: 170px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    outline: none;
    font-size: 16px;
    border: 1px solid #ccc;
  }

  .staff-account, .staff-password {
    padding: 0 44px;
    background-size: 20px 20px;
    background: no-repeat 12px center;
  }

  .staff-account {
    margin-top: 20px;
    background-image: url(./icon-user.png);
  }

  .staff-password {
    margin-top: 12px;
    background-image: url(./icon-passwd.png);
  }
  .email {
    margin-top: 12px;
    background-image: url(./icon-email.png);
  }

  .login-error {
    width: 260px;
    margin-top: 20px;
    display: inline-block;
  }
  .login-error label:nth-child(1) {
    color: @blue-color;
    margin-left: 10px;
    float: left;
    cursor: pointer;
  }
  .login-error label:nth-child(2) {
    color: #dd3e06;
    float: left;
    margin-left: 10px;
  }

  .login-error label:nth-child(3) {
    color: @blue-color;
    float: right;
  }

  .login-input input[type=button] {
    width: 260px;
    font-size: 18px;
    color: #fff;
    border: none;
    margin-top: 16px;
    cursor: pointer;
    background-color: @blue-color;
  }
</style>

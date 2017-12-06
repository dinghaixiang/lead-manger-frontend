<template>
  <div class="account-bind">
    <MaskLayer v-show="layerShow"></MaskLayer>
    <div class="title">帐号信息</div>
    <div class="item-box">
      <div class="left">
        <i class="iconfont icon-yuzhanghao"></i>
      </div>
      <div class="center">
        <p><span class="font1">帐号</span> <span>{{name}}</span></p>
        <p class="font2">可用于登录社区系统</p>
      </div>
    </div>
    <div class="item-box">
      <div class="left">
        <i class="iconfont icon-youxiang"></i>
      </div>
      <div class="center">
        <p><span class="font1">邮箱</span> <span v-show="realEmail">{{realEmail}}</span><span class="red" v-show="!realEmail">未绑定</span></p>
        <p class="font2">可用邮箱找回密码</p>
      </div>
      <div class="right" v-show="!realEmail">
         <p @click="showEmail">立即绑定</p>
      </div>
    </div>
    <div class="item-box">
      <div class="left">
        <i class="iconfont icon-anquan"></i>
      </div>
      <div class="center">
        <p><span class="font1">密码</span> <span>已设置</span></p>
        <p class="font2">用于保护账号信息和登录安全</p>
      </div>
      <div class="right">
        <p @click="changePwd">修改</p>
      </div>
    </div>
    <div class="bind-email" v-show="bindEmailShow">
      <div class="bind-email-title">
        <div>
          <span>绑定邮箱</span>
          <span class="close" @click="closeBox"><i class="iconfont icon-guanbi"></i></span>
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <span class="email-label">邮箱:</span>
          <input class="email-input" placeholder="输入您的邮箱" v-model="email">
        </div>
        <div class="form-group">
          <span class="email-label">邮箱验证码:</span>
          <input class="random-input" v-model="random">
          <label class="random-box" @click="getRandom">{{randomMsg}}</label>
        </div>
        <div class="red">{{errorMsg}}</div>
        <div class="btn">
          <label @click="confirmEmail">确认</label>
          <label>取消</label>
        </div>
      </div>
    </div>
    <div class="bind-email" v-show="pwdShow">
      <div class="bind-email-title">
        <div>
          <span>修改密码</span>
          <span class="close" @click="closeBox"><i class="iconfont icon-guanbi"></i></span>
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <span class="email-label">旧密码:</span>
          <input class="email-input" placeholder="输入您的旧密码" v-model="oldPwd">
        </div>
        <div class="form-group">
          <span class="email-label">邮箱验证码:</span>
          <input class="email-input" placeholder="输入您的新密码" v-model="newPwd">
        </div>
        <div class="red">{{errorEmailMsg}}</div>
        <div class="btn">
          <label @click="confirmPwd">确认</label>
          <label>取消</label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
 .account-bind{
   padding: 10px 30px;
   background-color: #fff;
   position: relative;
   .red{
     color: red;
   }
   .title{
     height: 60px;
     line-height: 40px;
     font-size: 16px;
     font-weight: 700;
     border-bottom: 1px solid #d9dde1;
   }
   .font2{
     color: #93999f;
     font-size: 14px;
   }
   .font1{
     color: #2b333b;
     font-size: 16px;
     font-weight: 700;
   }
   .random-input{
     width: 30%;
     height: 34px;
     padding: 6px 12px;
     font-size: 14px;
     line-height: 1.42857143;
     color: #787d82;
     background-color: #fff;
     background-image: none;
     border: 1px solid #ccc;
     border-radius: 2px;
     box-sizing: border-box;
   }
   .email-input{
     width: 60%;
     height: 34px;
     padding: 6px 12px;
     font-size: 14px;
     line-height: 1.42857143;
     color: #787d82;
     background-color: #fff;
     background-image: none;
     border: 1px solid #ccc;
     border-radius: 2px;
     box-sizing: border-box;
   }
   .random-box{
     margin-left: 10px;
     color: #008cc8;
     border: 1px solid #008cc8;
     padding: 6px 5px;
   }
   .item-box{
     background-color: #fff;
     display: flex;
     height: 88px;
     overflow: hidden;
     margin: auto;
     border-bottom: 1px solid #d9dde1;
     .left{
       width: 60px;
       color: #d9dde1;
       line-height: 98px;
       padding-left: 45px;
       .icon-youxiang,.icon-anquan,.icon-yuzhanghao{
         font-size: 36px;
       }
     }
     .center{
       padding-top: 22px;
       width: 80%;
       p{
         line-height: 24px;
         font-size: 12px;
       }
     }
     .right{
       margin-top: 28px;
       color: #787D82;
       p{
         cursor: pointer;
         border: 1px solid #787D82 ;
         border-radius: 2px;
         padding: 6px 12px;
         font-size: 14px;
         &:hover{
           background-color: #edf1f2;
         }
       }
     }
   }
   .bind-email{
     background-color: #fff;
     border-radius: 5px;
     position: fixed;
     z-index: 1002;
     visibility: visible;
     left: 439px;
     top: 106px;
     opacity: 1;
     width: 488px;
     height: 377px;
     .bind-email-title{
       padding: 24px 32px 0;
       div{
         font-size: 16px;
         font-weight: bold;
         color: #07111b;
       }
       .close{
         .icon-guanbi{
           font-size: 24px;
         }
         position: absolute;
         right: 4px;
         top: 4px;
         color: #93999f;
         display: block;
       }
     }
     .form{
       margin-left: 66px;
       span{
         display: inline-block;
         width: 22%;
       }
       .form-group{
         margin-top: 30px;
       }
     }
     .btn{
       width: 200px;
       margin:40px auto ;
       label{
         padding: 5px 10px ;
       &:nth-child(1){
         border: 1px solid #008cc8;
         color: #fff;
         background-color:#008cc8 ;
       }
         &:nth-child(2){
           margin-left: 20px;
           border: 1px solid #787D82;
         }
       }

     }
   }
 }
</style>
<script>
  import MaskLayer from '../../components/MaskLayer.vue'
  import auth from '../../auth'
  import axios from 'axios';
  export  default{
    data(){
      return {
        name: auth.student.userName,
        layerShow: false,
        bindEmailShow: false,
        pwdShow:false,
        randomMsg:'获取验证码',
        errorMsg:'',
        email:'',
        random:'',
        realEmail:auth.student.email,
        newPwd:'',
        oldPwd:'',
        errorEmailMsg:''
      }
    },
    methods:{
      showEmail: function () {
        this.layerShow=true;
        this.bindEmailShow=true;
      },
      changePwd: function () {
        this.layerShow=true;
        this.pwdShow=true;
      },
      closeBox: function () {
        this.layerShow=false;
        this.pwdShow=false;
        this.bindEmailShow=false;
      },
      getRandom: function () {
        var times=60;
        if(times<60){
          return;
        }
        if(!this.email){
           this.errorMsg='请输入邮箱';
           return;
        }else{
          this.errorMsg='';
        }
        axios.post('/free-api/getRandom',{'email':this.email}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
             var interval= setInterval( ()=> {
                times--;
                if(times>0){
                  this.randomMsg=times+'秒后再次获取';
                }else{
                  times=60;
                  this.randomMsg='获取验证码';
                  clearInterval(interval);
                }
              },1000)
          }
        })
      },
      confirmEmail: function () {
        axios.post('/free-api/saveEmail',{'email':this.email,'userId':auth.student.id,'random':this.random}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
           if(response.data.data){
             this.closeBox();
             this.realEmail=this.email;
             auth.student.email=this.realEmail;
           }
          }
        })
      },
      confirmPwd: function () {
        if(!this.newPwd){
          this.errorEmailMsg='新密码不能为空';
          return
        }
        if(!this.oldPwd){
          this.errorEmailMsg='旧密码不能为空';
          return
        }
        axios.post('/free-api/changePwd',{'newPwd':this.newPwd,'userId':auth.student.id,'oldPwd':this.oldPwd}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
              this.$router.push('/');
          }
        })
      }
    },
    components:{
      MaskLayer
    }
  }
</script>

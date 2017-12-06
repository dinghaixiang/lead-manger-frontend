<template>
  <div>
    <div class="header">
      <div class="left">
      <div class="logo" ><img src="../assets/logo.png"></div>
      <div class="header-left" v-show="student.authenticated">
        <router-link to="/lead/list" class='item' tag="label">
          <span >首页</span>
        </router-link>
        <router-link to="/lead/period-list" class='item' tag="label">
          <span >期数管理</span>
        </router-link>
        <router-link to="/lead/analytics" class='item' tag="label">
          <span >数据分析</span>
        </router-link>
        <!--<label class="search-box"><input  class="searchCourse" placeholder="搜索你感兴趣的课程" v-model="searchKey"><i class="iconfont icon-sousuo" @click="search"></i></label>-->
      </div>
      </div>
      <div class="header-right" v-show="student.authenticated">
        <div>您好! {{student.userName}}</div>
        <div class="person-info">
          <p @click="logout">退出登录</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scped lang="less" rel="stylesheet/less">
  @hover-color:#37a1f9;
  *{
    margin: 0px;
    padding: 0px;
  }

  .logo img{
    height: 60px;
    margin-left: 20px;
  }
  .item(){
    width: 80px;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    cursor: pointer;
  }
  .search-box{
    margin-left: 10px;
    position: relative;
    .icon-sousuo{
      cursor: pointer;
      position: absolute;
      top: 2px;
      right: 6px;    }
  }
  .left{
    display: flex;
  }
  .header{
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #b7b7b7;
    .header-right{
      font-weight: bold;
      margin-right: 50px;
      line-height: 46px;
      position: relative;
      .person-info{
        width: 100px;
        background-color: #fff;
        color: #000;
        display: none;
        position: absolute;
        z-index: 10000;
        p{
          text-align: center;
          cursor: pointer;
          border-bottom: 1px solid #b7b7b7;
          &:hover{
            color: @hover-color ;
          }
        }
      }
      &:hover{
        .person-info{
          display: block;
        }
      }
    }
    .header-left{
      margin-left: 50px;
      font-weight: bold;
      .searchCourse{
        padding-left: 5px;
        height: 26px;
        border-radius: 2px;
      }

     .item{
        .item;
       text-align: center;
      }
      .item:hover{
        color: @hover-color;
        border-bottom: 3px solid @hover-color;
      }
    }
  }
  .item-right(){
    width: 60px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    cursor: pointer;
  }
  .header-right {
    margin-top:10px;
  .item:nth-child(1) {
  .item-right;
    color: #fff;
    background-color:  @hover-color;
    border-radius: 5px;
    margin-right: 5px
  }
  .item:nth-child(2) {
  .item-right;
  }
  }
</style>
<script>
  import auth from '../auth'
  export default{
   data(){
     return{
        student: auth.student,
       searchKey:''
     }
   },
    methods: {
      logout: function () {
        auth.clear();
        this.$router.push("/");
      },
      userInfo: function () {
        this.$router.push("/userInfo");
      },
      courseManger: function () {
        this.$router.push('/courseConf');
      },
      teacherManger: function () {
        this.$router.push('/teacherConf');
      },
      search: function () {
        this.$router.push('/search/'+ this.searchKey);
      }
    }
  }
</script>

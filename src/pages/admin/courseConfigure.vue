<template>
  <div >
    <BreadCrumbs title="课程管理"></BreadCrumbs>
    <div class="program-list-head justify-between">
      <div class="add-program">
        <router-link :to="{path:'addCourse'}">
          <a class="add-program-a">新增课程</a>
        </router-link>
      </div>
    </div>
    <div class="program-list-content">
      <div class="program-list-content-head justify-between">
        <div class="w20">课程名称</div>
        <div>开课老师</div>
        <div>开课教室</div>
        <div>开课时间</div>
        <div>总人数</div>
        <div>剩余可选</div>
        <div>操作 </div>
      </div>
      <div class="border-head"></div>
      <div v-for="(course,index) in courseList"  class="program-list-content-body justify-between">
        <div class="w20">{{course.className}}</div>
        <div>{{course.teacherName}}</div>
        <div >{{course.classRoom}}</div>
        <div>星期{{course.week}}第{{course.day}}节课</div>
        <div>{{course.studentSize}}</div>
        <div>{{course.remainSize}}</div>
        <div>
          <label @click="deleteCourse(course.classId)">
            <span class="operation">删除</span>
          </label>
        </div>
      </div>
      <div class="border-foot"></div>
      <QuickPager :page="page" @QuickPager="queryCourseList"></QuickPager>
    </div>
  </div>
</template>

<script>
  import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
  import QuickPager from '../../components/quickpager/QuickPager';
  import DropDownCondition from '../../components/dropdownbox/DropDownCondition.vue';
  import MaskLayer from '../../components/MaskLayer.vue';
  import axios from 'axios';
  export default{
    data () {
      return {
        page: {
          'currentPage': 1,
          'totalRows': 25
        },
        courseList:[]
      };
    },
    mounted: function () {
      axios.post('/free-api/courseConfInit',{}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          let all=response.data.data;
          this.courseList= all.courseList;
          this.page=all.eqlPage;
        }
      })
    },
    methods: {
      queryCourseList (page) {
        axios.post('/free-api/courseList',page).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
            let all=response.data.data;
            this.courseList= all.courseList;
            this.page=all.eqlPage;
          }
        })
      },
      deleteCourse: function (classId) {
        axios.post('/free-api/deleteCourse',{classId}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
            window.location.reload();
          }
        })
      }
    },
    watch: {

    },
    components: {
      BreadCrumbs,
      QuickPager,
      DropDownCondition,
      MaskLayer
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base';
  .hover-tip-position {
    position: relative;
  }
  .red{
    color: red;
  }
  .stock-box{
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 360px;
    height: 180px;
    z-index: 200000;
    .box-header{
      height: 30px;
      background-color: #f5f5f5;
      line-height: 30px;
      padding-left: 20px;
    }
    .box-content{
      background-color: #ffffff;
      padding: 20px;
      div:nth-child(1){
        margin-bottom: 10px;
      }
      input{
        width: 120px;
        height: 25px;
        display: inline-block;
        border:1px solid #f4f4f4;
      }
      .buttons{
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
        div{
          text-align: center;
          width: 120px;
          height: 32px;
          border: 1px solid #06addd;
          border-radius: 2px;
          line-height: 32px;
          &:nth-child(1){
            color:#06addd ;
          }
          &:nth-child(2){
            color: #ffffff;
            background-color: #06addd;
          }
        }
      }
    }
  }
  .icon-zhuijia{
    cursor: pointer;
    display: none;
  }
  .border-head {
    border-bottom: 1px solid #e7e7e7;
    margin: 0 1%;
  }
  .select-class{
    color: #ffffff !important;
    background-color: #10b0de;
  }
  .stock-warning{
    padding: 16px;
    display: flex;
    justify-content: space-between;
    .icon-baocuo{
      color: #e8b92d;
    }
    .warning{
      color: red;
      cursor: pointer;
    }
    .sale-type{
      display: flex;
      justify-content: flex-start;
      div{
        cursor: pointer;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #10b0de;
        color: #10b0de;
        text-align:center;
        &:nth-child(1){
          border-right:none ;
        }
      }
    }
  }
  .border-foot {
    border-bottom: 1px solid #e7e7e7;
  }

  .justify-between {
    display: flex;
    justify-content: space-between;
  }

  .hover-tip {
    display: inline-block;
    line-height: 20px;
    max-width: 150%;
    position: absolute;
    left: 14%;
    top: 35%;
    white-space: nowrap;
    padding: 0 4px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .program-list-head {
    padding: 10px 20px;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #ededed;
    .add-program {
      display: flex;
      background-color: @green-color;
      border-radius: 5px;
      .add-program-a {
        font-size: 14px;
        display: inline-block;
        padding: 8px 27px;
        color: #ffffff;
      }
    }
    .program-search-box {
      display: flex;
    }
    .search-program {
      display: flex;
      background-color: @green-color;
      border-radius: 5px;
      .search-program-a {
        font-size: 14px;
        display: inline-block;
        padding: 4.5px 26px;
        color: #ffffff;
      }
    }
    .search-input {
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin-right: 20px;
      display: flex;
      i {
        line-height: 28px;
        margin-left: 10px;
        color: #b9b9b9;
      }
      input {
        width: 150px;
        display: inline-block;
        line-height: 28px;
        border-radius: 5px;
        padding-left: 5px;
      }
    }
  }

  .program-list-content {
    background-color: #fff;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 50px;
    border: 1px solid #ededed;
    .program-list-content-head {
      font-size: 14px;
      height: 50px;
      color: @title-color;
      line-height: 50px;
      div {
        width: 12.5%;
        color: @title-color;
        &:nth-child(1){
          margin-left: 20px;
        }
      }
    }
    .program-list-content-body {
      font-size: 12px;
      padding: 2.5px 0;
      color: @input-font-color;
      line-height: 60px;
      align-items: center;
      &:hover {
        background-color: #f3f4f8 ;
        .icon-zhuijia{
          display:inline-block;
        }
      }
      .programName {
        display: inline-block;
        vertical-align: middle;
        padding: 0 15%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 70%;
      }
      div {
        width: 12.5%;
        height: 60px;
        &:nth-child(1){
          margin-left: 20px;
        }
        img {
          display: inline-block;
          width: 100px;
          height: 60px;
        }
        .operation {
          cursor: pointer;
          color: @green-color;
          width: 33%;
          text-align: center;
          &:nth-child(1){
            margin-right: 20px;
          }
        }
      }
    }
    .effect-expired-time {
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      display: inline-flex;
      label{
        display: block;
        width: 100%;
      }
    }
    .w20{
      width: 17% !important;
    }
    .valid{
      color: #b7b7b7 !important;
    }
  }
</style>


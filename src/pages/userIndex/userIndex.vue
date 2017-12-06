<template>
  <div>
    <div class="banner"></div>
    <div class="focus course">
      <span>热门课程</span>
    </div>

    <div class="course-content">
      <div class="item" v-for="course in classList" @click="goClassDetail(course.classId)">
        <div class="course-content-img">
          <img :alt="course.className"
               :src="course.classPic">
        </div>
     <div class="course-content-content">
       <div class="course-title">
         <span>{{course.className}}</span>
       </div>
       <div class="course-teacher">
         <span>{{course.teacherName}}</span>
         <i class="iconfont icon-kehu"><span>{{course.studentSize}}</span></i>
       </div>
     </div>
    </div>
    </div>
    <div class="focus">
      <span>热门老师</span>
    </div>
    <div class="teacher-content">
      <div class="item" v-for="teacher in teacherList">
        <img width="236" height="136" :alt="teacher.teacherName"
             :src="teacher.photo">
        <div class="teacher-content-content">
          <div class="course-title">
            <span>{{teacher.educationName}}</span>
          </div>
          <div class="course-teacher">
            <span>{{teacher.teacherName}}</span>
          </div>
          <div class="teacher-intro">
            <span>{{teacher.introduction}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .banner {
    width: 100%;
    height: 460px;
    background-image: url(../../assets/top-banner-1.png);
  }
  .course-content{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fbfbfb;
    .item{
      border: 1px solid #ececec;
      .course-content-img{
        width:236px;
        height:136px;
        overflow: hidden;
      }
      img{
        width:236px;
        height:136px;
      }
    }
  }
  .item{
    margin-bottom: 20px;
    cursor: pointer;
  }
  .course-content .item:hover{
    & img{
      transition:1s;
      transform: scale(1.2);
    }
  }
  .course-content-content{
    background-color: #ffffff;
    padding: 10px;
    line-height: 22px;
  }
  .course-title{
    font-family: '微软雅黑', "Microsoft YaHei";
    font-size: 16px;
    overflow: hidden;
  }
  .course-teacher, .teacher-intro{
    font-family: '微软雅黑', "Microsoft YaHei";
    font-size: 13px;
    color: rgb(153, 153, 153);
  }
  .teacher-intro{
    height: 104px;
    margin-top: 20px;
    overflow: hidden;
  }
  .course-teacher{
    span{
      font-family: '微软雅黑', "Microsoft YaHei";
      font-size: 13px;
      color: rgb(153, 153, 153);
    }
    i{
      margin-left: 134px;
    }
    icon-ren{
      font-size: 13px;
    }
  }

  .focus{
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    font-weight: 100;
    padding: 10px;
  }
  .teacher-content{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
  }
  .teacher-content .item{
    background-color: #fff;
    width: 188px;
    height: 280px;
    padding:20px ;
  }

  .teacher-content img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
</style>
<script>
  import UserHeader from "../../components/Header.vue";
  import axios from 'axios';
  export default{
    data: function () {
      return {
        classList:[],
        teacherList:[]
      }
    },
    methods: {
      goClassDetail: function (classId) {
        this.$router.push("/course-detail/"+classId);
      }
    },
    mounted:function () {
      axios.post('/free-api/index',{}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
         let all=response.data.data;
         this.classList= all.classList;
         this.teacherList=all.teacherList;
        }
      })
    },
    components: {
      UserHeader
    }
  }

</script>
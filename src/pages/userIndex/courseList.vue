<template>
  <div class="course-list">
    <div class="course-list-header">
      <label class="type">分类：</label>
      <div class="course-type">
        <div class="item" @click="getSpecialClass('')">全部</div>
        <div class="item" v-for="(type,index) in courseType" @click="getSpecialClass(type.typeCode)">{{type.typeName}}</div>
      </div>
    </div>
    <div class="course-list-content">
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
    </div>
  </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  .course-list-header {
    background-color: #fff;
    padding-left: 60px;
    padding-top: 20px;
    .selected{
      background: #2b333b;
      color: #fff !important;
      border-radius: 2px;
    }
    .type {
      width: 52px;
      height: 20px;
      line-height: 30px;
      font-weight: 700;
      font-size: 14px;
      color: #07111b;
      text-align: right;
    }
    .course-type {
      display: inline-flex;
      .item {
        cursor: pointer;
        color: #14191e;
        margin-right: 30px;
        line-height: 14px;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 14px;
        &:hover {
          color: red;
        }
      }
    }
  }

  .course-content {
    display: flex;
    flex-wrap: wrap;
    background-color: #fbfbfb;
    .item {
      margin-right: 10px;
      border: 1px solid #ececec;
      .course-content-img {
        width: 236px;
        height: 136px;
        overflow: hidden;
      }
      img {
        width: 236px;
        height: 136px;
      }
    }
  }

  .item {
    margin-bottom: 20px;
    cursor: pointer;
  }

  .course-content .item:hover {
    & img {
      transition: 1s;
      transform: scale(1.2);
    }
  }

  .course-content-content {
    background-color: #ffffff;
    padding: 10px;
    line-height: 22px;
  }

  .course-title {
    font-family: '微软雅黑', "Microsoft YaHei";
    font-size: 16px;
    overflow: hidden;
  }

  .course-teacher, .teacher-intro {
    font-family: '微软雅黑', "Microsoft YaHei";
    font-size: 13px;
    color: rgb(153, 153, 153);
  }

  .teacher-intro {
    margin-top: 20px;
    overflow: hidden;
  }

  .course-teacher {
    span {
      font-family: '微软雅黑', "Microsoft YaHei";
      font-size: 13px;
      color: rgb(153, 153, 153);
    }
    i {
      margin-left: 130px;
    }
    icon-ren {
      font-size: 13px;
    }
  }

  .course-list-content {
    padding-left: 60px;
    padding-top: 20px;
  }
</style>
<script>
  import UserHeader from "../../components/Header.vue";
  import axios from 'axios'
  export default{
    data: function () {
      return {
        courseType:[],
        classList: [],
        selected:[true]
      }
    },
    methods: {
      getSpecialClass: function (typeCode) {
        axios.post('/free-api/getCourse', {typeCode}).then((response)=>{
          let rspCode = response.data.code;
        if (rspCode === '0') {
          this.classList = response.data.data;
        }
      })
      },
      goClassDetail: function (classId) {
        this.$router.push("/course-detail/"+classId);
      }
    },
    mounted: function () {
      axios.post('/free-api/init', {}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          let all = response.data.data;
          this.courseType = all.courseType;
          this.classList = all.classList;
        }
    })
    },
    components: {
      UserHeader
    }
  }
</script>

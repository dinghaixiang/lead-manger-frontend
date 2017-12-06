<template>
  <div class="course">
    <div class="course-header">
      <div class="course-pic">
        <img :src="classPic">
      </div>
      <div class="detail">
        <p>{{className}}</p>
        <p>{{teacherName}}</p>
        <p><label>开学：{{startTime}} </label>|<label>{{classRoom}}</label></p>
        <p>每周{{week}}第{{day}}节课</p>
        <p>还剩：<span class="red">{{remainSize}}</span>个名额</p>
        <p @click="order" v-show="remainSize>0">立即预约</p>
        <p v-show="remainSize<=0" class="full-size">预约已满</p>
      </div>
    </div>
    <div class="content">
      <div class="course-content">
        <div class="course-title">课程详情</div>
        <div class="course-int-title">课程介绍</div>
        <div>{{classIntro}}</div>
      </div>
      <div class="teacher-content">
        <div class="teacher-title">讲师介绍</div>
        <div class="teacher-pic">
          <img :src="photo">
        </div>
        <div class="teacher-name">{{teacherName}}</div>
        <div class="teacher-edu">{{educationName}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .course{
    padding: 0 40px;
  .course-header{
    border: 1px solid #dedede;;
    background-color: #fff;
    display: flex;
    padding: 10px;
    img{
      width: 392px;
      height: 253px;
      &:hover{
        transition:1s;
        transform: scale(1.2);
      }
    }
    .course-pic{
      width: 392px;
      height: 253px;
      overflow: hidden;
    }
    .detail{
      margin-left: 40px;
      p:nth-child(1){
        font-size: 28px;
        color: #333333;
        font-weight: normal;
        height: 45px;
        line-height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
        white-space: nowrap;
      }
      p:nth-child(2){
        font-size: 28px;
        color: #333333;
        font-weight: normal;
        height: 45px;
        line-height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
        white-space: nowrap;
      }
      p:nth-child(3),p:nth-child(4),p:nth-child(5){
        color: #666;
        font-size: 15px;
        line-height: 26px;
        height: 26px;
        overflow: hidden;
      }
      p:nth-child(6){
        width: 203px;
        height: 49px;
        text-align: center;
        line-height: 49px;
        color: #fff;
        background-color: #188eee;
        font-size: 20px;
        margin-top: 30px;
        cursor: pointer;
      }
      .full-size{
        width: 203px;
        height: 49px;
        text-align: center;
        line-height: 49px;
        color: #fff;
        background-color: #b7b7b7;
        font-size: 20px;
        margin-top: 30px;
        cursor: pointer;
      }
      .red{
        color: #ff8432;
      }
    }
  }
    .course-content{
      width: 729px;
      margin-right: 21px;
      border: 1px solid #dedede;;
      background-color: #fff;
      margin-top: 20px;
      padding: 0 24px;
      .course-title{
        height: 46px;
        line-height: 46px;
        font-size: 20px;
        color: #333;
        border-bottom: 1px solid #dedede;
      }
      .course-int-title{
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .content{
      display: flex;
      .teacher-content{
        width: 418px;
        border: 1px solid #dedede;;
        background-color: #fff;
        margin-top: 20px;
        padding: 0 24px;
      }
      .teacher-title{
        height: 46px;
        line-height: 46px;
        font-size: 20px;
        color: #333;
        border-bottom: 1px solid #dedede;
      }
      .teacher-pic{
        width: 200px;
        height: 200px;
        margin: 0 auto;
        img{
          border-radius: 50%;
        }
      }
      .teacher-name{
        width: 200px;
        text-align: center;
        margin: 20px auto;
        font-weight: bold;
      }
      .teacher-edu{
        font-size: 20px;
        width: 200px;
        text-align: center;
        margin: 20px auto;
      }
    }

    .footer {
      background-color: #fff;
      height: 60px;
      line-height: 60px;
      margin-top: 20px;
      .cop{
        text-align: center;
        color: #b7b7b7;
        font-size: 12px;
      }
    }
  }
</style>
<script>
  import axios from 'axios'
  import auth from '../../auth'
  export default{
    data(){
      return {
        classId: '',
        classPic:'',
        className:'',
        classRoom:'',
        educationName:'',
        photo:'',
        remainSize:'',
        startTime:'',
        teacherName:'',
        week:'',
        day:'',
        classIntro:''
      }
    },
    mounted:function () {
      this.classId=this.$route.params.classId;
      axios.post('/free-api/getClassDetail',{'classId':this.classId}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          let all=response.data.data;
            this.classPic=all.classPic;
            this.className=all.className;
            this.classRoom=all.classRoom;
            this.educationName=all.educationName;
            this.photo=all.photo;
            this.remainSize=all.remainSize;
            this.startTime=all.startTime;
            this.teacherName=all.teacherName;
            this.week=all.week;
            this.day=all.day;
            this.classIntro=all.classIntro;
        }
      })
    },
    methods: {
      order: function () {
        axios.post('/free-api/order',{'classId':this.classId,'userId':auth.student.id}).then((response)=> {
          let rspCode = response.data.code;
          if(rspCode==='0'){
            if(response.data.data==='2'){
              alert('已经预约过了')
            }else if(response.data.data==='1'){
              alert('预约成功')
            }else if(response.data.data==='3'){
              alert("预约已满")
            }else if(response.data.data==='5'){
              alert('当前时间你已经选过课')
            }else{
              alert("系统异常")
            }
          }
        })
      }
    },
    components:{
      auth
    }
  }
</script>
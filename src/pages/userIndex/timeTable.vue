<template>
  <div class="time-table">
    <div class="row header">
      <div class="course">星期一</div>
      <div class="course">星期二</div>
      <div class="course">星期三</div>
      <div class="course">星期四</div>
      <div class="course">星期五</div>
    </div>
    <div class="row">
      <div class="course" v-for="row in row1">{{row||'---'}}</div>
    </div>
    <div class="row">
      <div class="course" v-for="row in row2">{{row||'---'}}</div>
    </div>
    <div class="row">
      <div class="course" v-for="row in row3">{{row||'---'}}</div>
    </div>
    <div class="row">
      <div class="course" v-for="row in row4">{{row||'---'}}</div>
    </div>

  </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  .time-table{
    padding-top: 20px;
    .row{
      background-color: #fff;
      display: flex;
      width: 1000px;
      margin: 0 auto;
      color: #000;
      font-weight: 700;
      &:nth-child(3n),&:nth-child(5n){
        color: #fff;
        background-color: #2f3b4c;
      }
    }
    .header{
      background-color: #06addd !important;
      color: #fff;
      font-size: 18px;
    }
    .course{
      width: 200px;
      height: 100px;
      border: 1px solid #b7b7b7;
      cursor: pointer;
      text-align: center;
      line-height: 100px;
      &:hover{
        background-color: #d0d0d0;
      }
    }
  }
</style>
<script>
  import auth from '../../auth';
  import axios from 'axios';
  export default{
    data(){
      return {
        row1:[],
        row2:[],
        row3:[],
        row4:[]
      }
    },
    mounted:function () {
      axios.post('/free-api/allOrder',{'userId':auth.student.id}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          let all=response.data.data;
          this.row1= all.row1;
          this.row2= all.row2;
          this.row3= all.row3;
          this.row4= all.row4;
        }
      })
    },
  }
</script>
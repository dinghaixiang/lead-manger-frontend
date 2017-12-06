<template>
  <div>
    <BreadCrumbs title="教师管理>新增"></BreadCrumbs>
    <div class="add-mcard">
      <div class="base-property">
        <div class="first-column"><label>基本属性</label></div>
        <div class="second-column">
          <form method="POST" enctype="multipart/form-data" @submit.prevent="submit">
            <div class="item">
              <label><span class="red">*</span><span>老师名称：</span></label>
              <input placeholder="请输入老师名称" class="mcard-name-input" name="teacherName" v-model="teacherName">
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item">
              <label><span class="red">*</span><span>老师照片：</span></label>
              <input  type="file" class="mcard-name-input" name="photo">
              <span class="error">{{titleError}}</span>
            </div>

            <div class="item card-type-name class-intro">
              <label><span class="red">*</span><span>老师介绍：</span></label>
              <textarea v-model="introduction" name="introduction"/>
              <span class="error">{{timesError}}</span>
            </div>
            <div class="item card-type-name">
              <label><span class="red">*</span><span>最高学历：</span></label>
              <select name="education" class="select-teacher">
                <option  v-for="edu in educationList" :value="edu.educationId">{{edu.educationName}}</option>
              </select>
              <span class="error">{{timesError}}</span>
            </div>
            <div class="add-mcard-bottom">
              <input type="submit" value="保存">
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .add-mcard{
    color: #808080;
    background-color: #ffffff;
    padding: 20px;
    .red{
      color: red;
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
    }
    .class-intro{
      label{
        vertical-align: top;
      }
    }
    textarea{
      width: 200px;
      height: 100px;
      border-radius: 5px;
    }
    .select-teacher{
      height: 30px;
      border-radius: 2px;
    }
    .error{
      color: red;
      margin-left: 20px;
    }
    .time-span {
      margin-right: 1px;
    }
    .add-mcard-bottom{
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      input{
        cursor: pointer;
        width: 120px;
        height: 43px;
        border-radius: 5px;
        border: 1px solid #8EC31E;
        text-align: center;
        line-height: 43px;
        &:nth-child(1){
          background-color:#8EC31E ;
          color: #ffffff;
        }
      }
    }
    .calIncon,.icon-shanchu{
      color: #8EC31E;
    }
    .effectiveTime{
      display: inline-block;
      float: right;
      margin-right: 3px;
    }
    .program-list-bottom{
      margin: 0 10px;
      padding: 0 10px 10px 10px;
      height: 50px;
      vertical-align: middle;
      .icon-tianjia1{
        cursor: pointer;
        color: #8EC31E;
        font-size: 30px;
        margin-right: 10px;
      }
    }
    .program-name{
      vertical-align: top;
    }
    .program-list{
      display: inline-block;
      max-height: 180px;
      overflow: auto;
      background-color: #ffffff;
      border-radius: 5px;
      width: 450px;
      .program-list-header{
        padding: 10px;
        display: flex;
        margin: 0 10px;
        justify-content: space-between;
        border-bottom:1px solid #ececec;
        p:nth-child(1){
          width: 50%;
        }
        p:nth-child(2){
          width: 40%;
        }
        p:nth-child(3){
          width: 10%;
        }
      }
      .program-list-item{
        margin: 0 10px;
        color: #808080;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        p:nth-child(1){
          width: 50%;
        }
        p:nth-child(2){
          width: 40%;
        }
        p:nth-child(3){
          width: 10%;
        }
      }
    }
    .calendar-view{
      padding-right: 4px;
      border-radius: 5px;
      height: 30px;
      text-align: center;
      border: 1px solid gainsboro;
      display: inline-block;
      width: 180px;
      line-height: 30px;
      background-color: #ffffff;
    }
    .special-property{
      background-color: #F3F4F8;
      display: flex;
      height: 360px;
    }
    .base-property {
      background-color: #F3F4F8;
      border-bottom: 3px solid #ffffff;
      display: flex;
    }
    .item{
      margin-top: 20px;
    }
    .second-column{
      width: 80%;
      margin-left: 20px;
    }
    .first-column{
      border-right: 3px solid #ffffff;
      width: 10%;
      font-size: 15px;
      text-align: center;
      padding-top: 54px;
    }
    .radio{
      display: none;
      -webkit-appearance: none;
      outline: none;
    }
    .radio-class{
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 100%;
      display: inline-block;
      height: 16px;
      margin-right: 10px;
      margin-top: -1px;
      vertical-align: middle;
      width: 16px;
      line-height: 1;
    }
    input{
      padding-left: 10px;
      display: inline-block;
    }
    .two-radios span{
      margin-right: 20px;
    }
    .public(){
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      height: 30px;
    }
    .mcard-name-input{
      .public;
      width: 200px;
    }
    .mcard-times-input{
      .public;
      width: 130px;
    }
    .item>label{
      display: inline-block;
      width: 106px;
    }
    .card-type-name{
      margin-bottom: 20px;
    }
    .publicDiv(){
      margin-right: 10px;
      width: 100px;
      height: 50px;
      border-radius: 3px;
      text-align: center;
      color: #ffffff;
      line-height: 50px;
      background-size: cover;
    }
  }
</style>
<script>
  import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
  import axios from 'axios';
  export default{
    data () {
      return {
        teacherName:'',
        amountError: '',
        saleTypeError: '',
        titleError: '',
        timesError: '',
        priceError: '',
        productError: '',
        calendarTimeError: '',
        programError: '',
        classIntro:'',
        educationList:[]
      };
    },
    methods: {
      submit: function(event) {
        var formData = new FormData(event.target);
        axios.post('/free-api/addTeacher',formData,{
          method: 'post',
          headers: {'Content-Type': 'multipart/form-data'}}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
            if(response.data.data){
              alert('添加成功!');
            }
          }
        })

      }
    },
    mounted: function () {
      axios.post('/free-api/getAllEducation  ',{}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          this.educationList= response.data.data;
        }
      })
    },
    watch: {
      saleType: function () {
        this.price = '';
        this.calendarValue = '';
        this.product = '';
        this.programList = [];
        this.title = '';
        this.amount = '';
        this.times = '';
        this.amountError = '';
        this.timesError = '';
        this.titleError = '';
        this.calendarTimeError = '';
        this.priceError = '';
        this.programError = '';
        this.productError = '';
      },
      title: function () {
        if (this.title) this.titleError = '';
      },
      amount: function () {
        if (this.amount) {
          let reg = /^\d+$/;
          if (!reg.test(this.amount)) {
            this.amountError = '请填写数字';
          } else {
            this.amountError = '';
          }
        }
      },
      times: function () {
        if (this.times) {
          let reg = /^\d+$/;
          if (!reg.test(this.times)) {
            this.timesError = '请填写数字';
          } else {
            this.timesError = '';
          }
        }
      },
      price: function () {
        if (this.saleType === '0') {
          let reg = /^\d+(\.\d+)?$/;
          if (!reg.test(this.price)) {
            this.priceError = '请填写数字';
          } else {
            this.priceError = '';
          }
        }
      },
      product: function () {
        if (this.product) this.productError = '';
      },
      calendarValue: function () {
        if (this.calendarValue) this.calendarTimeError = '';
      },
      programList: function () {
        if (this.programList) this.programError = '';
      }
    },
    components: {
      BreadCrumbs
    }
  };
</script>

<template>
  <div>
    <BreadCrumbs title="借款管理>新增"></BreadCrumbs>
    <div class="add-mcard">
      <div class="base-property">
        <div class="first-column"><label>基本属性</label></div>
        <div class="second-column">
          <form method="POST" enctype="multipart/form-data" @submit.prevent="submit">
            <div class="item">
              <label><span class="red">*</span><span>用户姓名：</span></label>
              <input placeholder="请输入用户姓名" class="mcard-name-input" name="className" v-model="leadName">
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item">
              <label><span class="red">*</span><span>总金额：</span></label>
              <input class="mcard-name-input" name="classPic" v-model="totalPrincipal"><span>元</span>
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item">
              <label><span class="red">*</span><span>金额：</span></label>
              <input class="mcard-name-input" name="classPic" v-model="principal"><span>元</span>
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item">
              <label><span class="red">*</span><span>还款周期：</span></label>
              <div class="checkbox-inline">
                <input type="radio" :value="0"
                       name="col-num"
                       @click.capture="dealCheckbox('0',$event)">
                按月
              </div>
              <div class="checkbox-inline">
                <input type="radio" :value="1"
                       name="col-num"
                       @click="dealCheckbox('1',$event)">
                按日
              </div>
              <div class="checkbox-inline">
                <input type="radio" :value="2"
                       name="col-num"
                       @click="dealCheckbox('2',$event)">
                按周
              </div>
            </div>
            <div class="item" v-show="interestType==='2'">
              <label><span class="red">*</span><span>期数：</span></label>
              <input class="mcard-name-input small" name="classPic" v-model="cycle"><span>期</span>
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item">
              <label><span class="red">*</span><span>利息：</span></label>
              <input class="mcard-name-input small" name="classPic" v-model="interest"><span>%</span>
              <span class="error">{{titleError}}</span>
            </div>
            <div class="item card-type-name">
              <label><span class="red">*</span><span>开始时间：</span></label>
              <div class="calendar-view" @click="showStartTime">
                <span class="time-span">{{calendarStartValue}}</span>
                <i class="icon iconfont calIncon effectiveTime">&#xe7ad;</i>
                <SelectCalendar :isShow="isStartShow" :timeIsShow="false" @changeOption="changeStartTime"></SelectCalendar>
              </div>
              <span class="error">{{timesError}}</span>
            </div>
            <div class="item card-type-name"  v-show="interestType!='2'">
              <label><span class="red">*</span><span>结束时间：</span></label>
              <div class="calendar-view" @click="showEndTime">
                <span class="time-span">{{calendarEndValue}}</span>
                <i class="icon iconfont calIncon effectiveTime">&#xe7ad;</i>
                <SelectCalendar :isShow="isEndShow" :timeIsShow="false" @changeOption="changeEndTime"></SelectCalendar>
              </div>
              <span class="error">{{timesError}}</span>
            </div>
            <div class="item">
              <label><span class="red"></span><span>备注：</span></label>
              <textarea class="mcard-name-textarea" v-model="remark"/>
              <span class="error">{{titleError}}</span>
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
    .checkbox-inline{
      display: inline-block;
      margin-right: 20px;
    }
    .small{
      width: 100px !important;
    }
    .class-intro{
      label{
        vertical-align: top;
      }
    }
    textarea{
      width: 200px;
      height: 200px;
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
    .mcard-name-textarea{
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      width: 200px;
      height: 100px;
    }
    .mcard-times-input{
      .public;
      width: 130px;
    }
    .item>label{
      display: inline-block;
      width: 106px;
      vertical-align: top;
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
  import post from '../../components/http/index';
  import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
  import SelectCalendar from '../../components/selectcalendar/SelectCalendar.vue';
  export default{
    data () {
      return {
        classRoom:'',
        className:'',
        teacherName:'',
        week:'',
        day:'',
        studentSize:'',
        amountError: '',
        saleTypeError: '',
        titleError: '',
        timesError: '',
        priceError: '',
        productError: '',
        calendarTimeError: '',
        programError: '',
        classIntro:'',
        teacherList:[],
        courseType:[],
        interestType: '0',
        isStartShow: false,
        isEndShow: false,
        calendarEndValue: '',
        calendarStartValue: '',
        leadName: '',
        principal: '',
        totalPrincipal: '',
        interest: '',
        remark: '',
        cycle: ''
      };
    },
    methods: {
      changeStartTime: function (val) {
        this.calendarStartValue = val;
        this.isStartShow = false;
      },
      changeEndTime: function(val) {
        this.calendarEndValue = val;
        this.isEndShow = false;
      },
      showStartTime: function () {
        this.isStartShow = true;
      },
      showEndTime: function () {
        this.isEndShow = true;
      },
      dealCheckbox: function (value,e) {
        this.interestType = value;
        this.calendarStartValue = '';
        this.calendarEndValue = '';
      },
      getParam(){
        return {
          'name': this.leadName,
          'principal': this.principal,
          'totalPrincipal': this.totalPrincipal,
          'interest': this.interest,
          'interestType': this.interestType,
          'remark': this.remark,
          'startTime': this.calendarStartValue,
          'endTime': this.interestType === '2' ? '' : this.calendarEndValue,
          'cycle': this.interestType === '2' ? this.cycle : ''
        }
      },
      submit: function(event) {
        var param = this.getParam();
        post({
          url:'/lead-api/lead/save',
          param:param,
          successCallback: function (data) {
              if(data){
                this.$router.push('/lead/list');
              }
          }.bind(this)
        })
      }
    },
    mounted: function () {
      document.getElementsByName("col-num")[0].checked=true;
      axios.post('/free-api/getTeacherAndType  ',{}).then((response)=>{
        let rspCode = response.data.code;
        if (rspCode === '0') {
          let all=response.data.data;
          this.teacherList= all.teacherList;
          this.courseType=all.courseType;
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
      BreadCrumbs,
      SelectCalendar
    }
  };
</script>

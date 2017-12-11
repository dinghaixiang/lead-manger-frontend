<template>
  <div >
    <MaskLayer v-show="showMaskLayer"></MaskLayer>
    <div class="periods-box box2" v-show="showMaskLayer2">
      <div class="close" @click="closeBox2">X</div>
      <div>
        <input placeholder="输入流水号" v-model="payNo">
      </div>
      <div style="margin-left: 10px">
        <p @click="pay"><span>还款</span></p>
      </div>
    </div>
    <div class="periods-box" v-show="showMaskLayer1">
      <div class="close" @click="closeBox">X</div>
      <div class="period-box-content content-2">
        <p class="w6">期数</p>
        <p class="w35">时间</p>
        <p class="w6">金额</p>
        <p class="w6">状态</p>
        <p class="w13">操作</p>
      </div>
      <div class="period-body">
        <div class="period-box-content content-2" v-for="(period,index) in periodList">
          <p class="w6">{{period.num}}期</p>
          <p class="w35">{{period.numStartTime}}~{{period.numEndTime}}</p>
          <p class="w6">{{period.income}}</p>
          <p class="w6">{{period.payTag | payTagFilter}}</p>
          <p class="w13 pay" @click="writePayNo(period.id,period.num)" v-show="period.payTag==='0'">还款</p>
        </div>
      </div>
    </div>
    <BreadCrumbs title="投资管理"></BreadCrumbs>
    <div class="program-list-head justify-between">
      <div class="button">
        <div class="add-program" style="margin-right: 20px">
          <router-link :to="{path:'add'}">
            <a class="add-program-a">新增投资</a>
          </router-link>
        </div>
      </div>
      <div class="right-content">
        <div class="justify-between">
          <DropDownCondition defaultOption="全部" index="0" :showFlags="showFlags" :options="interestTypeOptions" :reset="reset"
                                   @selectOption="selectInterestType" @toggleShow="toggleShow" class="margin-smaller"
                                   :isShowSecCategories="isShowSecCategories"></DropDownCondition>
        <DropDownCondition defaultOption="未还清" index="1" :showFlags="showFlags" :options="validOptions" :reset="reset"
                           @selectOption="selectValid" @toggleShow="toggleShow" class="margin-smaller"
                           :isShowSecCategories="isShowSecCategories"></DropDownCondition>
        </div>
        <div>
          <input v-model="name" class="search-content" placeholder="输入姓名">
        </div>
        <div class="add-program" @click="queryCondition">
          <span class="add-program-a">搜索</span>
        </div>
      </div>
    </div>
    <div class="program-list-content">
      <div class="program-list-content-head justify-between">
        <div>编号</div>
        <div>用户姓名</div>
        <div>本金</div>
        <div>利息</div>
        <div>时间</div>
        <div>状态</div>
        <div>备注</div>
        <div>操作 </div>
      </div>
      <div class="border-head"></div>
      <div class="content-lead">
        <div v-for="(lead,index) in leadUserList"  class="program-list-content-body justify-between">
          <div>{{lead.id}}</div>
          <div>{{lead.name}}</div>
          <div>{{lead.totalPrincipal}}（{{lead.principal}}）元</div>
          <div>{{lead.interestType | interestTypeFilter}} {{lead.interest}}%</div>
          <div v-if="lead.interestType!=='2'">{{lead.startTime}}-{{lead.endTime}}</div>
          <div v-if="lead.interestType==='2'">{{lead.cycle}}周</div>
          <div>{{lead.valid| validFilter}} </div>
          <div class="remark">{{lead.remark}}</div>
          <div>
            <label>
              <span v-if="lead.valid==='1'" class="operation" @click="settle(lead.id)">结清</span>
              <span class="operation" @click="getPeriods(lead.id)">查看</span>
            </label>
          </div>
        </div>
      </div>
      <div class="border-foot"></div>
      <QuickPager :page="page" @QuickPager="queryLead"></QuickPager>
    </div>
  </div>
</template>

<script>
  import SelectCalendar from '../../components/selectcalendar/SelectCalendar.vue';
  import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
  import QuickPager from '../../components/quickpager/QuickPager';
  import DropDownCondition from '../../components/dropdownbox/DropDownCondition.vue';
  import MaskLayer from '../../components/MaskLayer.vue';
  import post from '../../components/http/index';
  export default{
    data () {
      return {
        showMaskLayer: false,
        page: {
          'currentPage': 1,
          'totalRows': 25
        },
        leadUserList:[],
        interestTypeOptions:[
          {'code':'000','name':'全部'},
          {'code':'0','name':'月化'},
          {'code':'1','name':'日化'}
        ],
        validOptions:[
          {'code':'1','name':'未还清'},
          {'code':'0','name':'还清'}
        ],
        showFlags:[false, false],
        isShowSecCategories: false,
        reset: false,
        selectedInterestType: '',
        selectedValid: '1',
        name: '',
        queryType: '',
        periodList: [],
        showMaskLayer2: false,
        showMaskLayer1: false,
        promise: '',
        payNo: ''
      };
    },
    mounted: function () {
      post({
        url: '/lead-api/lead/init',
        param: {},
        successCallback: function (data) {
            this.leadUserList= data.leadUser;
            this.page=data.eqlPage;
        }.bind(this)
      })
    },
    methods: {
      pay(){
        this.promise.then(value =>{
          post({
            url: '/lead-api/lead/update-pay-no',
            param: Object.assign({}, value, {"payNo": this.payNo}),
            successCallback: function (data) {
              if(data){
                this.payNo = '';
                this.showMaskLayer2= false;
                this.showMaskLayer = true;
                this.showMaskLayer1 =true;
              }
            }.bind(this)
          });
        })
      },
      writePayNo(id,num){
        this.showMaskLayer2= true;
        this.showMaskLayer = true;
        this.showMaskLayer1 =false;
        this.promise = new Promise(resolve=>resolve({id,num}))
      },
      closeBox2(){
        this.showMaskLayer2= false;
        this.showMaskLayer = true;
        this.showMaskLayer1 = true;
      },
      closeBox(){
        this.showMaskLayer2= false;
        this.showMaskLayer = false;
        this.showMaskLayer1 = false;
      },
      getPeriods(id){
        this.showMaskLayer = true;
        this.showMaskLayer1 = true;
        post({
          url:'/lead-api/lead/get-periods',
          param: id,
          successCallback: function (data) {
            this.periodList= data.periodList;
          }.bind(this)
        })
      },
      perpareParam(){
        return {
          "interestType": this.selectedInterestType,
          "valid": this.selectedValid,
          "name": this.name
        }
      },
      queryCondition(){
        this.queryType = 1;
        this.queryLead({'startIndex': 0, 'pageRows': this.page.pageRows});
      },
      queryLead (page) {
        let param=Object.assign({},page,this.perpareParam());
        post({
          url:'/lead-api/lead/list',
          param,
          successCallback: function (data) {
            this.leadUserList= data.leadUser;
            this.page=data.eqlPage;
          }.bind(this)
        })
      },
      settle: function (id) {
        axios.post('/lead-api/lead/settle',{id}).then((response)=>{
          let rspCode = response.data.code;
          if (rspCode === '0') {
            this.leadUserList.filter(p=>p.id === id).forEach(p=>p.valid='0');
          }
        })
      },
      toggleShow (index) {
        this.closeAllOption();
        this.showFlags[index] = !this.showFlags[index];
        this.showFlags.push();
      },
      closeAllOption () {
        for (var i = 0; i < this.showFlags.length; i++) {
          this.showFlags[i] = false;
        }
        this.showFlags.push();
        this.isShowSecCategories = false;
      },
      selectInterestType: function (value) {
        this.selectedInterestType = value === '000' ? '' : value;
        this.closeAllOption();
      },
      selectValid: function (value) {
        this.selectedValid = value === '000' ? '' : value;
        this.closeAllOption();
      }
    },
    watch: {

    },
    filters: {
      validFilter: function (val) {
        return val === "0" ? '结清' : '未结清';
      },
      interestTypeFilter: function (val) {
        return val === '0' ? '月化' : '日化';
      },
      payTagFilter: function (val) {
        return val === '0' ? '未还' : '已还';
      }
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
  .remark{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .button{
    display: flex;
    justify-content: flex-start;
  }
  .box2{
    width: 400px !important;
    height: 200px !important;
    margin-left: -200px !important;
    margin-top: -100px!important;
    display: flex;
    justify-content: center;
    align-items: center;
    input{
      border-radius: 5px;
      height: 30px;
    }
    p{
      display: flex;
      justify-content: center;
      color: #ffffff;
      width: 50px;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      background-color: #8EC31E;
    }
  }
  .pay-no-style{
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    height: 50px;
    line-height: 50px;
  }
  .close{
    font-size: 20px;
    color: #8EC31E;
    position: absolute;
    right: 0px;
    top: 2px;
    width: 20px;
    height: 30px;
    cursor: pointer;
  }
  .periods-box{
    padding: 20px;
    padding-top: 0;
    height:300px ;
    overflow: auto;
    top:50%;
    left: 50%;
    width: 600px;
    background: #ffffff;
    border-radius: 5px;
    position: fixed;
    z-index: 100002;
    margin-top: -150px;
    margin-left: -300px;
    .period-box-content{
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid darkgray;
      &.content-2{
        height: 50px;
        line-height: 50px;
      }
      .w13{
        width: 13%;
      }
      .w6{
        width: 6%;
      }
      .w20{
        width: 20%;
      }
      .w35{
        width: 30%;
      }
      .pay{
        cursor: pointer;
        color: #8EC31E;
      }
      p{
        margin-right: 20px;
      }
    }
  }
  .search-content{
    width: 100px;
    height: 26px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .red{
    color: red;
  }
  .right-content{
    display: flex;
    justify-content: flex-start;
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
      cursor: pointer;
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
    height: 500px;
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
          width: 20%;
          display: inline-block;
          text-align: center;
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


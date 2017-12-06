<template>
  <div>
    <div class="header">
      <span>电子对账单</span>
    </div>
    <div class="income">
      <p class="income-header-title">账户收益</p>
      <div class="income-content">
        <div class="income-item">
          <p>总应收收益</p>
          <p>{{totalIncome}} <span>元</span></p>
        </div>
        <div class="income-item">
          <p>总已收收益</p>
          <p>{{haveIncomed}}<span>元</span></p>
        </div>
        <div class="income-item">
          <p>当月应收收益</p>
          <p>{{currentMonthIncome}}<span>元</span></p>
        </div>
        <div class="income-item">
          <p>当月已收收益</p>
          <p>{{currentMonthIncomeHaved}}<span>元</span></p>
        </div>
      </div>
    </div>
    <div class="pie-style">
      <p class="pie-style-title">投资总览</p>
      <div class="pie-style-content">
        <div id="main" style="width: 500px;height:400px;"></div>
        <div class="line"></div>
        <div id="mine" style="width: 500px;height:400px;"></div>
      </div>
    </div>
    <div class="line-style">
      <p class="line-style-title">收益总览</p>
      <div class="line-style-content">
        <div id="line" style="width: 600px;height:400px;"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .header{
    width: 80%;
    margin:20px auto;
    background-color: #00a0e9;
    color: #ffffff;
    line-height: 50px;
    border-radius: 5px;
    font-size: 26px;
    span{
      margin-left: 15px;
    }
  }
  .line{
    height: 360px;
    width: 1px;
    margin-top: 20px;
    background-color: #e0e0e0;
  }
  .pie-style{
    border: 1px solid #e0e0e0;
    width: 80%;
    margin: 20px auto;
    background-color: #ffffff;
    .pie-style-title{
      .common;
    }
    .pie-style-content{
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
  .common(){
    line-height: 48px;
    font-size: 20px;
    background-color: #f7f7f7;
    padding-left: 12px;
    color: #666666;
  }
  .income{
    border: 1px solid #e0e0e0;
    width: 80%;
    height: 178px;
    margin: 10px auto;
    background-color: #ffffff;
    .income-header-title{
     .common
    }
    .income-content{
      padding: 30px 0;
      display: flex;
      justify-content: space-around;
      .income-item{
        :nth-child(1){
          color: #a9a9a9;
          font-size: 16px;
        }
        :nth-child(2){
          font-size: 38px;
          font-weight: 300;
          color: #333;
        }
      }
    }
  }
  .line-style{
    border: 1px solid #e0e0e0;
    width: 80%;
    margin: 20px auto;
    background-color: #ffffff;
    .line-style-title{
      .common;
    }
    .line-style-content{
      justify-content: center;
      display: flex;
      margin-top: 20px;
    }
  }
</style>
<script>
  import * as echarts from 'echarts';
  import post from '../../components/http/index';
  export default{
    data(){
      return {
        mineTotalInvest: '',
        totalIncome: '',
        mineTotalInvestComed: '',
        totalInvestComed: '',
        totalInvest: '',
        totalInvesting: '',
        mineTotalInvesting: '',
        monthIncome: [],
        monthIncomed: [],
        haveIncomed: '',
        currentMonthIncome: '',
        currentMonthIncomeHaved: ''
      }
    },
    mounted: function () {
      post({
        url:'/lead-api/lead/income',
        param: {},
        successCallback: function (data) {
          this.totalInvest =data.totalInvest;
          this.totalInvestComed = data.totalInvestComed;
          this.mineTotalInvestComed = data.mineTotalInvestComed;
          this.totalIncome = data.totalIncome;
          this.mineTotalInvest = data.mineTotalInvest;
          this.totalInvesting = this.totalInvest - this.totalInvestComed;
          this.mineTotalInvesting = this.mineTotalInvest - this.mineTotalInvestComed
          this.monthIncome = data.monthIncome;
          this.monthIncomed = data.monthIncomed;
          this.haveIncomed = data.haveIncomed;
          this.currentMonthIncomeHaved = data.currentMonthIncomeHaved;
          this.currentMonthIncome = data.currentMonthIncome;
        }.bind(this)
      })
    },
    methods: {
      getMonth(){
        let arr=[];
        let now=new Date();
        for (let i=-9;i<4;i++){
          let month=new Date(now.getFullYear(),now.getMonth()+i,now.getDate());
          arr.push(month.getFullYear() + '-' + (month.getMonth()+1));
        }
        return arr;
      },
      drawMain(){
        echarts.init(document.getElementById('main')).setOption({
          color:['rgb(255, 162, 85)','rgb(255, 135, 98)'],
          backgroundColor: '#fff',
          title : {
            text: '总投资分析',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: {
            name: '投资分析',
            type: 'pie',
            data: [
              {name: '投资中金额', value: this.totalInvesting},
              {name: '已收回本金', value: this.totalInvestComed},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        });
      },
      drawMine(){
        echarts.init(document.getElementById('mine')).setOption({
          color:['rgb(255, 162, 85)','rgb(255, 135, 98)'],
          backgroundColor: '#fff',
          title : {
            text: '单个投资分析',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: {
            name: '投资分析',
            type: 'pie',
            data: [
              {name: '投资中金额', value: this.mineTotalInvesting},
              {name: '已收回本金', value: this.mineTotalInvestComed},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        });
      },
      drawLine(){
        echarts.init(document.getElementById('line')).setOption({
          color:['rgb(255, 162, 85)','rgb(255, 135, 98)'],
          backgroundColor: '#fff',
          title : {
            text: '每月收益',
            x:'center'
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.getMonth()
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          series: [
            {
            name: '当月应该收益',
            type: 'line',
            data: this.monthIncome
            },
            {
              name: '当月已收收益',
              type: 'bar',
              data: this.monthIncomed
            }
          ]
        });
      }
    },
    watch:{
      'totalInvesting':function (val,oldVal) {
        this.drawMine();
        this.drawMain();
        this.drawLine();
      }
    }
  }

</script>

<template>
  <div class="time-range-calendar" v-clickoutside="cancel">
    <div class="time-range-calendar-value" @click="show">{{tranDefault}}
      <i class="icon iconfont icon-rili"></i>
    </div>
    <SelectCalendar :isShow="timeShow" :dftTomorrow="dftTomorrow" @changeOption="changeTime"></SelectCalendar>
  </div>
</template>
<script>
  import Clickoutside from '../../utils/clickoutside';
  import SelectCalendar from './SelectCalendar.vue';

  export default{
    directives: { Clickoutside },
    props: {
      readOnly: Boolean,
      dftTomorrow: Boolean,
      defaultValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        timeShow: false
      };
    },
    components: {
      SelectCalendar
    },
    methods: {
      changeTime (val) {
        if (this.readOnly) return;
        this.timeShow = false;
        this.$emit('confirm', val);
      },
      cancel () {
        if (this.readOnly) return;
        this.timeShow = false;
      },
      show () {
        if (this.readOnly) return;
        this.timeShow = true;
      }
    },
    computed: {
      tranDefault () {
        return this.calendarValue ? this.calendarValue : this.defaultValue;
      }
    },
    watch: {
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base.less';
  .time-range-calendar {
    position: relative;
    .time-bucket-calendar {
      border-radius: 5px;
      width: 462px;
      border: 1px solid gainsboro;
      background-color: #ffffff;
      position: absolute;
      margin-top: 3px;
      z-index: 11112;
      font-size: 12px;
      .time-bucket-calendar-item {
        width: 230px;
        float: left;
        .calendar-title {
          background-color: @blue-color;
          color: white;
          width: 230px;
          text-align: center;
          line-height: 40px;
          height: 40px;
          i {
            cursor: pointer;
          }
          .month {
            margin-right: 5px;
          }
          .prevMonth {
            margin-left: 15px;
            margin-right: 10px;
          }
          .nextMonth {
            margin-left: 10px;
            margin-right: 15px;
          }
        }

        .calendar-content {
          .week-title {
            .week-item {
              float: left;
              cursor: pointer;
              width: 25px;
              height: 25px;
              line-height: 25px;
              padding: 0px 3px;
              text-align: center;
            }
          }
          .date-list {
            .date-item {
              float: left;
              cursor: pointer;
              width: 25px;
              height: 25px;
              line-height: 25px;
              padding: 0px 3px;
              margin-top: 2px;
              text-align: center;
              &.color-gray {
                color: darkgray;
              }
              &.today {
                background-color: #8EC31E;
                color: #ffffff;
                border-radius: 25px;
                padding: 0;
                margin-left: 3px;
                margin-right: 3px;
              }
              &.start {
                background-color: #8EC31E;
                color: #ffffff;
                border-top-left-radius: 25px;
                border-bottom-left-radius: 25px;
                padding: 0 3px 0 0;
                margin-left: 3px;
              }
              &.middle {
                background-color: #8EC31E;
                color: #ffffff;
              }
              &.end {
                background-color: #8EC31E;
                color: #ffffff;
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
              }
            }
          }
        }
      }
      .bottom-button {
        width: 100%;
        float: left;
        margin: 10px 0;
        .confirm {
          float: right;
          height: 30px;
          line-height: 30px;
          color: white;
          text-align: center;
          background-color: #06addd;
          margin-right: 20px;
          border-radius: 5px;
          width: 100px;
          cursor: pointer;
        }
        .cancel {
          float: right;
          height: 28px;
          line-height: 28px;
          color: #06addd;
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
          margin-right: 15px;
          border: 1px solid #06addd;
          width: 98px;
          cursor: pointer;
        }
      }
    }
    .row {
      display: block;
      box-sizing: border-box;
      &:after, &:before {
        content: " ";
        display: table;
        clear: both;
      }
    }
    .time-range-calendar-value {
      border-radius: 5px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      color: #5e5e5e;
      border: 1px solid #dcdcdc;
      padding-left: 3px;
      width: 170px;
      background-color: white;
      position: relative;
    }
    .icon-rili{
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 0;
      color: #06addd!important;
      line-height: 30px;
    }

  }
</style>

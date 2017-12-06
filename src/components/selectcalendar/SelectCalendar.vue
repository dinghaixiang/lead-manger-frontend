<template>
  <div @click="stopPropagation()">
    <div v-show="isShow" class="select-calendar">
      <div class="select-calendar-day" >
        <i class="icon iconfont prevYear" @click="prevYear ()">&#xe7b5;</i>
        <i class="icon iconfont prevMonth" @click="prevMonth ()">&#xe7b6;</i>
        <span class="month">{{optionMonth}}</span><span class="year" @click="changeTime ()">{{optionYear}}</span>
        <i class="icon iconfont nextMonth" @click="nextMonth ()">&#xe7b4;</i>
        <i class="icon iconfont nextYear" @click="nextYear ()">&#xe7b3;</i>
      </div>
      <div>
        <ol class="calendar-week">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li v-for="option in optionList" @click="selectedCurrentDay(option)"
              :class="[{ colorGray: !(option.isNowMonth), selectDay: isSelectedDay(option) }]" >{{option.day}} </li>
        </ol>
      </div>
      <div v-show="timeIsShow" class="calendar-time">
        <span>时间点：</span><input class="time-hour-min" maxlength="2" type="text" v-model="hour"/><span>：</span><input
        class="time-hour-min" maxlength="2" type="text" v-model="min"/>
      </div>
      <div class="calendar-btn" >
        <a class="calendar-sure" @click="selectedDaySubmit()">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedDay: new Date(),
        optionTime: new Date(),
        optionList: [],
        hour: '00',
        min: '00'
      };
    },
    props: {
      isShow: {
        type: Boolean,
        required: true
      },
      timeIsShow: {
        type: Boolean,
        default: false
      }
    },
    created: function () {
      this.changeTime();
    },
    computed: {
      optionMonth () {
        var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var chins = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return chins[nums.indexOf(this.optionTime.getMonth() + 1)];
      },
      optionYear () {
        return this.optionTime.getFullYear();
      }
    },
    methods: {
      stopPropagation () {
        event.stopPropagation();
      },
      isSelectedDay (option) {
        return (this.selectedDay.getFullYear() === option.year &&
        this.selectedDay.getMonth() === (option.month - 1) &&
        this.selectedDay.getDate() === option.day);
      },
      changeTime () {
        this.optionList = [];
        var _firstDay = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), 1);
        for (var i = 0; i < 42; i++) {
          var _thisDay = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), i + 1 - _firstDay.getDay());
          var isNowMonth = false;
          if (_thisDay.getMonth() === _firstDay.getMonth()) {
            isNowMonth = true;
          }
          this.optionList.push({'year': _thisDay.getFullYear(), 'month': _thisDay.getMonth() + 1, 'day': _thisDay.getDate(), 'isNowMonth': isNowMonth});
        }
      },
      prevYear () {
        this.optionTime.setFullYear(this.optionTime.getFullYear() - 1);
        this.optionTime = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), 1);
        this.changeTime();
      },
      prevMonth () {
        this.optionTime.setMonth(this.optionTime.getMonth() - 1);
        console.log(this.optionTime.getMonth());
        this.optionTime = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), 1);
        this.changeTime();
      },
      nextYear () {
        this.optionTime.setFullYear(this.optionTime.getFullYear() + 1);
        this.optionTime = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), 1);
        this.changeTime();
      },
      nextMonth () {
        this.optionTime.setMonth(this.optionTime.getMonth() + 1);
        this.optionTime = new Date(this.optionTime.getFullYear(), this.optionTime.getMonth(), 1);
        this.changeTime();
      },
      selectedCurrentDay (option) {
        if (option.isNowMonth){
          this.selectedDay = new Date(option.year, option.month - 1, option.day);
        }
      },
      selectedDaySubmit () {
        if (!this.timeIsShow) {
          this.$emit('changeOption', this.formatDate(this.selectedDay, 'yyyy-MM-dd'));
        } else {
          this.$emit('changeOption', this.formatDate(this.selectedDay, 'yyyy-MM-dd') + ' ' + this.hour + ':' + this.min);
        }
      },
      formatDate (date, fmt) {
        var o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
          }
        }
        return fmt;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base';
  .calendar-week{    width: 230px;  margin: 5px 5px;background-color: white}
  .calendar-week li{float: left; cursor:pointer;  width: 25px;  height: 25px;  line-height: 25px;  margin: 0px 3px;  text-align: center;}
  .colorGray{color: darkgray}
  .selectDay{    background-color: greenyellow;  border-radius: 15px;}
  .select-calendar{position: absolute  ;  border-radius: 5px;
    border: 1px solid gainsboro;
    width: 230px;
    background-color: white;
    margin-top: 3px;
    z-index: 11111;
    }
  .select-calendar-day{  background-color: @blue-color;color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;  width: 230px;text-align: center;  line-height: 40px;  height: 40px;}
  .select-calendar-day i{    cursor: pointer;}
  .select-calendar-day .month{margin-right:5px;}
  .select-calendar-day .prevMonth{margin-left:15px;margin-right: 10px ;}
  .select-calendar-day .nextMonth{margin-left:10px;margin-right: 15px ;}
  .calendar-btn{clear: both;text-align: center}
  .calendar-sure{display: inline-block;width: 200px;height: 30px;line-height:30px; color: white;background-color:@blue-color;border-radius: 5px;margin-bottom: 10px;margin-top: 10px }

  .select-calendar-day .month {
    margin-right: 5px;
  }

  .select-calendar-day .prevMonth {
    margin-left: 15px;
    margin-right: 10px;
  }

  .select-calendar-day .nextMonth {
    margin-left: 10px;
    margin-right: 15px;
  }

  .calendar-btn {
    clear: both;
    text-align: center
  }

  .calendar-sure {
    display: inline-block;
    width: 200px;
    height: 30px;
    line-height: 30px;
    color: white;
    background-color: @blue-color;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 10px
  }

  .time-hour-min {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 0px 5px;
    font-size: 12px;
    box-sizing: border-box;
    color: @input-font-color;
    display: inline-block;
    height: 32px;
    width: 70px
  }

  .calendar-time {
    padding-right: 7%;
  }
</style>

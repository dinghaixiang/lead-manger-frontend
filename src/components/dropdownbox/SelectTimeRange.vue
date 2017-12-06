<template>
  <div class="select-time">
    <label class="select-time-label">{{title}}</label>
    <span  class="select-time-span">:</span>
    <div class="select-time-box">
      <div class="select-time-box-view">
        <div class="time-calendar-view" @click="showMinCalendar()" >
          <span>{{minTime}}</span>
          <i class="icon iconfont">&#xe7ad;</i>
        </div>
        <div class="time-calendar-middle-view">
          <i class="icon iconfont">&#xe7b1;</i>
        </div>
        <div class="time-calendar-view" @click="showMaxCalendar()">
          <span>{{maxTime}}</span>
          <i class="icon iconfont">&#xe7ad;</i>
        </div>
      </div>
      <SelectCalendar :isShow="isMinShow" @changeOption="changeMinTime"></SelectCalendar>
      <SelectCalendar :isShow="isMaxShow" @changeOption="changeMaxTime"></SelectCalendar>
    </div>
  </div>
</template>

<script>
  import SelectCalendar from '../selectcalendar/SelectCalendar';

  export default {

    data () {
      return {
        minTime: '',
        maxTime: '',
        minTimeShow: false,
        maxTimeShow: false

      };
    },
    props: {
      title: {
        type: String,
        required: true
      },
      showIndex: {
        required: true
      },
      showFlags: {
        required: true
      }
    },
    computed: {
      isMinShow () {
        if (!this.showFlags[this.showIndex]) {
          this.maxTimeShow = false;
          this.minTimeShow = false;
        }
        return this.showFlags[this.showIndex] && this.minTimeShow;
      },
      isMaxShow () {
        if (!this.showFlags[this.showIndex]) {
          this.maxTimeShow = false;
          this.minTimeShow = false;
        }
        return this.showFlags[this.showIndex] && this.maxTimeShow;
      }
    },
    methods: {
      changeMinTime (val) {
        this.minTime = val;
        this.maxTimeShow = false;
        this.minTimeShow = false;
        this.$emit('selectOption', {'minTime': this.minTime, 'maxTime': this.maxTime});
      },
      changeMaxTime (val) {
        this.maxTime = val;
        this.maxTimeShow = false;
        this.minTimeShow = false;
        this.$emit('selectOption', {'minTime': this.minTime, 'maxTime': this.maxTime});
      },
      showMinCalendar () {
        this.minTimeShow = !this.minTimeShow;
        this.maxTimeShow = false;
        event.stopPropagation();
        this.$emit('changeShow', this.showIndex);
      },
      showMaxCalendar () {
        this.maxTimeShow = !this.maxTimeShow;
        this.minTimeShow = false;
        event.stopPropagation();
        this.$emit('changeShow', this.showIndex);
      }
    },
    components: {
      SelectCalendar
    }
  };

</script>

<style lang="less">
  @import '../../assets/styles/base';
  .select-time{width: 300px;height: 32px;display: flex;align-items: baseline;}
  .select-time-label{text-align: justify;height: 100%;color: #303030; text-align-last: justify;  display: inline-block;  width: 20%; }
  .select-time-span{display: inline-block;height: 100%;text-align: left;width: 3%}
  .select-time-box{display: inline-block;width: 77%;}
  .select-time-box-view{display: flex;width: 100%;    cursor: pointer;}
  .time-calendar-view{  border-radius: 5px;
    height: 30px;
    text-align: right;
    color: @input-font-color;
    border: 1px solid gainsboro;
    padding-left: 2px;
    display: inline-block;
    width: 45%;
  }
  .time-calendar-view i{margin-right: 3px;color: @blue-color!important;line-height: 30px}
  .time-calendar-middle-view{display: inline-block;text-align:center;width:10%;font-size:12px;height: 30px;color: gainsboro}
  .time-calendar-middle-view i{font-size:12px;line-height: 30px}


</style>

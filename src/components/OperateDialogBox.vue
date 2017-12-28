<template>
  <div v-show="tip.isShow">
    <MaskLayer></MaskLayer>
    <div class="prompt-dialog-box">
      <div class="prompt-dialog-box-title">{{tip.title}}</div>
      <div class="prompt-dialog-box-content">
        <div>
          <p class="dialog-content" v-html="tip.text"></p>
        </div>
      </div>
      <div class="prompt-dialog-box-foot">
        <a @click="closeOperateBox" class="close-operate">{{tip.leftOperate}}</a>
        <a @click="sureOperateBox" class="sure-operate">{{tip.rightOperate}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import MaskLayer from './MaskLayer';
  import { CLOSE_OPERATE_DIALOG_BOX, SURE_OPERATE_DIALOG_BOX } from '../store/mutation-types';

  export default {
    computed: {
      tip () {
        return this.$store.state.operateInfo;
      }
    },
    methods: {
      closeOperateBox () {
        this.$store.commit(CLOSE_OPERATE_DIALOG_BOX);
      },
      sureOperateBox () {
        this.$store.commit(SURE_OPERATE_DIALOG_BOX);
      }
    },
    components: {
      MaskLayer
    }
  };
</script>

<style scoped lang="less">
  @import '../assets/styles/base.less';
  .prompt-dialog-box{position: fixed;height: 300px;width: 500px;background-color: white;z-index: 10001;
    top:50%;left:50%;margin-left: -250px;margin-top: -150px}
  .prompt-dialog-box-title{height: 40px;line-height: 40px;font-size: 16px;padding-left: 20px;background-color: #f5f5f5;color: @title-color}
  .prompt-dialog-box-content{height: 190px;text-align: center;    padding: 0px 60px;display: flex;display: -webkit-flex; flex-direction:column;justify-content:center}
  .dialog-content{font-size: 16px;margin-top: 10px;color: @title-color;word-break: break-all;display: inline-block;text-align: left;}
  .prompt-dialog-box-foot{height: 60px;text-align: center;}

  .close-operate{    background-color: white;
    border: 2px solid @blue-color;
    box-sizing: border-box;
    display: inline-block;width: 150px;height: 40px;line-height:36px;color: @blue-color;border-radius: 5px;
    border: 2px solid @blue-color;
  }
  .sure-operate{
    background-color: @blue-color;
    color: white;
    border: 2px solid @blue-color;
    margin-left: 30px;
    box-sizing: border-box;
    display: inline-block;width: 150px;height: 40px;line-height:36px;border-radius: 5px;
    border: 2px solid @blue-color;
  }
</style>

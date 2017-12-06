<template>
  <div class="bread-crumbs">
    <i class="icon iconfont position-icon">&#xe7b2;</i>
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base';
  .bread-crumbs{    height: 40px; line-height: 40px;  font-size: 14px;  color: @input-font-color;border: 1px solid transparent}
  .position-icon{    margin-left: 15px;  margin-right: 5px;}

</style>

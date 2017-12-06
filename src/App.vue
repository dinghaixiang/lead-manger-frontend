<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <p class="cop">©&nbsp;2017&nbsp;free.com&nbsp;&nbsp;京ICP备 13046642号-2</p>
    </div>
  </div>
</template>

<script>
  import auth from './auth'

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f7f7f7;
}
.footer{
  background-color: #fff;
  height: 60px;
  line-height: 60px;
}
.cop{
  text-align: center;
  color: #b7b7b7;
  font-size: 12px;
}
</style>

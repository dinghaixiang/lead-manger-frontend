<template>
  <div id="app">
    <UserHeader></UserHeader>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import UserHeader from '../components/Header.vue'

  export default {
    name: 'app',
    components: {
      UserHeader
    }
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

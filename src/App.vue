<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-vue',
    components: {},
    data () {
      return {}
    },
    mounted () {
    }
  }
</script>

<style>
  html,body,#app{
    height: 100%;
  }
  body{
    margin: 0;
  }
</style>

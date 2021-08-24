<template>
  <div id="app">
    <TheNavbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
export default {
  name: 'App',
  components: { TheNavbar },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

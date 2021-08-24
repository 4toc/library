<template>
  <div class="navbar">
    <router-link class="navbar__title" :to="{ path: '/' }">
      <box-icon type="solid" name="book-open"></box-icon>
      Библиотека
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class TheNavbar extends Vue {
  active = 'guide'
}
</script>
<style lang="scss">
.navbar {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__title {
    font-size: 32px;
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
  }
}
</style>

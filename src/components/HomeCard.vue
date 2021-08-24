<template>
  <router-link
    class="home-card"
    :to="{ name: 'about', params: { library: library } }"
  >
    <vs-card>
      <template #title>
        <h3 class="home-card__name">{{ library.data.general.name }}</h3>
      </template>
      <template #img>
        <img :src="library.data.general.image.url" alt="" />
      </template>
      <template #text>
        <p>{{ library.data.general.address.fullAddress }}</p>
      </template>
    </vs-card></router-link
  >
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

const HomeCardProps = Vue.extend({
  props: {
    library: Object,
  },
})

@Component
export default class HomeCard extends HomeCardProps {}
</script>

<style lang="scss">
.home-card {
  text-decoration: none;
  .vs-card__img {
    height: 250px;
  }
}
</style>

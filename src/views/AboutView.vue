<template>
  <div class="about container" v-if="library">
    <div class="about__header">
      <div class="about__avatar">
        <img :src="library.data.general.image.url" alt="" />
      </div>
      <div class="about__header-text">
        <h1 class="about__title">{{ library.data.general.name }}</h1>
        <div>{{ library.data.general.address.fullAddress }}</div>
      </div>
    </div>
    <div class="about__main">
      <div
        class="about__description"
        v-html="library.data.general.description"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AboutView extends Vue {
  library = {}
  created(): void {
    this.library = this.$route.params.library
    if (!this.library) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.about {
  &__header {
    display: flex;
    align-items: center;
    background: #f4f7f8;
    padding: 20px;
    border-radius: 8px;
  }
  &__avatar {
    height: 250px;
    width: 300px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  &__header-text {
    margin-left: 20px;
  }
  &__description {
    padding: 0 20px;
    text-align: left;
    margin-top: 20px;
  }
}
</style>

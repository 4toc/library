<template>
  <div class="home container">
    <div v-if="isLoading">
      <loader class="home__loader" />
    </div>
    <div v-else>
      <div class="home__header">
        <vs-input
          v-model="search"
          class="home__search"
          placeholder="Найти на странице"
        >
          <template #icon>
            <box-icon name="search"></box-icon>
          </template>
        </vs-input>
        <div
          class="home__sort-switch"
          :class="{ 'home__sort-switch--active': sortMode }"
          @click="switchSort()"
        >
          <box-icon
            v-if="sortMode === 'up' || !sortMode"
            name="sort-up"
          ></box-icon>
          <box-icon v-if="sortMode === 'down'" name="sort-down"></box-icon>
        </div>
      </div>
      <div class="home__list">
        <home-card
          v-for="library in filteredList"
          :key="library._id"
          :library="library"
          class="home__item"
        />
      </div>
      <div class="home__pagination">
        <vs-pagination v-model="page" :length="lastPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import AppModule from '@/store/modules/app'
import HomeCard from '@/components/HomeCard.vue'
import Loader from '@/components/Loader.vue'

@Component({
  components: {
    'home-card': HomeCard,
    loader: Loader,
  },
})
export default class Home extends Vue {
  page = 1
  search = ''
  sortMode = ''
  isLoading = true
  mounted(): void {
    AppModule.setLastPage()
    AppModule.fetchPage().then((data) => {
      this.isLoading = false
    })
  }
  get libraryList(): any {
    return AppModule.libraryList
  }
  get lastPage(): number {
    return AppModule.lastPage
  }
  get filteredList(): any {
    let filterdArray = this.libraryList.filter((library) =>
      library.data.general.name
        .toLowerCase()
        .includes(this.search.toLowerCase())
    )
    if (this.sortMode === 'up') {
      filterdArray = filterdArray.sort((a, b) =>
        a.data.general.name.toLowerCase() > b.data.general.name.toLowerCase()
          ? 1
          : -1
      )
    }
    if (this.sortMode === 'down') {
      filterdArray = filterdArray.sort((a, b) =>
        a.data.general.name.toLowerCase() < b.data.general.name.toLowerCase()
          ? 1
          : -1
      )
    }
    return filterdArray
  }
  @Watch('page')
  onPageChanged(val: number): void {
    AppModule.setCurrnetPage(val)
    AppModule.fetchPage().then((data) => {
      this.isLoading = false
    })
  }
  switchSort(): void {
    if (!this.sortMode) {
      this.sortMode = 'up'
    } else {
      this.sortMode = this.sortMode === 'up' ? 'down' : 'up'
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;

  &__pagination {
    margin-top: 30px;
  }

  &__list {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 30px;
    width: 100%;
  }

  &__item {
    margin-bottom: 20px;
    .vs-card {
      max-width: unset;
    }
  }
  &__header {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  &__search {
    .vs-input {
      width: 300px;
    }
  }
  &__sort-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    margin-left: 10px;
    &--active {
      background: #f4f7f8;
      border: 1px solid #707579;
    }
  }
}
</style>

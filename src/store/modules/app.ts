import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import jsonData from '@/database/data.json'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'app',
  store,
})
class AppModule extends VuexModule {
  count = 0
  pageSize = 20
  currentPage = 1
  lastPage = 1
  libraryList: any = []

  @Mutation
  setLibrarys(librarys) {
    this.libraryList = librarys
  }

  @Mutation
  setCurrnetPage(newCurrentPage) {
    this.currentPage = newCurrentPage
    this.fetchPage
  }

  @Mutation
  setLastPage() {
    this.lastPage = Math.ceil(6000 / this.pageSize)
  }

  @Action
  fetchPage() {
    return new Promise((resolve, reject) => {
      const librarysArray: any = []
      const nextPageIndex = this.currentPage * this.pageSize + 1
      const maxPage =
        nextPageIndex + this.pageSize > this.lastPage
          ? this.lastPage * this.pageSize
          : nextPageIndex + this.pageSize
      for (let i = nextPageIndex; i < maxPage; i++) {
        librarysArray.push(jsonData[i])
      }
      this.setLibrarys(librarysArray)
      resolve(librarysArray)
    })
  }
}

export default getModule(AppModule)

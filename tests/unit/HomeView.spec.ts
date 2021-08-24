import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HelloWorld.vue', () => {
  it('renders loader', () => {
    const wrapper = shallowMount(HomeView)
    wrapper.setData({ isLoading: true })
    expect(wrapper.find('.home__loader').exists()).toBe(true)
  })
})

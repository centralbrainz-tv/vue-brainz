import Vue from 'vue'
import Router from 'vue-router'
import Vids from '@/components/Vids'
import VidsWithHashes from '@/components/VidsWithHashes'
import VidsWithUrl from '@/components/VidsWithUrl'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Vids
    },
    {
      path: '/hash/:hash',
      component: VidsWithHashes,
      name: 'hashes'
    },
    {
      path: '/vid/:uri',
      component: VidsWithUrl,
      name: 'vids'
    }
  ]
})

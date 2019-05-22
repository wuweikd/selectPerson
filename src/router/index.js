import Vue from 'vue'
import Router from 'vue-router'
import example from '@/example/example'
import selectPerson from '@/example/selectPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/select',
      name: 'example',
      component: example
    },
    {
      path: '/selectPerson',
      name: 'selectPerson',
      component: selectPerson
    }
  ]
})

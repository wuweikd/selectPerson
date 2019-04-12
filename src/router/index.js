import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import example from '@/example/example'
import selectPerson from '@/example/selectPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/example',
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

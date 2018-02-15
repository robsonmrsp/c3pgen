import Vue from 'vue'
import Router from 'vue-router'

import FormFilme from '@/components/filme/FormFilme.vue'
import PageFilme from '@/components/filme/PageFilme.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/filmes/new',
      name: 'FormFilme',
      component: FormFilme
    },
    {
      path: '/filmes/edit/:id',
      name: 'EditFilme',
      component: FormFilme
    },

    {
      path: '/filmes/list',
      name: 'PageFilme',
      component: PageFilme
    }
  ]
})

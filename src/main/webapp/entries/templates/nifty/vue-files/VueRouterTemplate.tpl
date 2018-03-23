import Vue from 'vue'
import Router from 'vue-router'

<#list application.entities as entity>
import Form${entity.name} from '@/components/${firstLower(entity.name)}/Form${entity.name}.vue'
import Page${entity.name} from '@/components/${firstLower(entity.name)}/Page${entity.name}.vue'
</#list>
	
Vue.use(Router)

export default new Router({
  routes: [
<#list application.entities as entity>
    {
      path: '/${firstLower(entity.name)}s/new',
      name: 'Form${entity.name}',
      component: Form${entity.name}
    },
    {
      path: '/${firstLower(entity.name)}s/edit/:id',
      name: 'Edit${entity.name}',
      component: Form${entity.name}
    },
</#list>
  ]
})

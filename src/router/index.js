import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import HelloWorld from '@/components/HelloWorld'
import ProjectIndex from '@/components/ProjectIndex'
import MainBar from '@/components/App'
import login from '@/components/Login'
import Article from '@/components/ArticleList'
import ArticleCreate from '@/components/ArticleCreate'
import VueCookie from 'vue-cookie'
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(Router)
Vue.use(MainBar)
Vue.use(BootstrapVue)
Vue.use(GSignInButton)
Vue.use(FBSignInButton)
Vue.use(VueCookie)


export default new Router({
  routes: [
    {
      path: '/app',
      component: HelloWorld,
    },
    {
      path: '/test',
      name: 'ProjectIndex',
      component: ProjectIndex
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'app',
      component: MainBar,
      children: [
        {
          path: '',
          component: Article
        },
        {
          path:'article_create',
          component:ArticleCreate
        }
        ]
    }
    ]

})

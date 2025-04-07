import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/UsersView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: () => import('../views/UserDetailView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

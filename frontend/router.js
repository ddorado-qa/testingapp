import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import Users from './pages/Users.vue'
import Products from './pages/Products.vue'
import Logs from './pages/Logs.vue'
import Settings from './pages/Settings.vue'
import Support from './pages/Support.vue'
import Rating from './pages/Rating.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/products', component: Products },
  { path: '/logs', component: Logs },
  { path: '/settings', component: Settings },
  { path: '/support', component: Support },
  { path: '/rating', component: Rating },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Page/Dashboard.vue'
import CreateAccount from '../components/Page/CreateAccount.vue'
import Account from '../components/Page/Account.vue'
import LoginBox from '../components/Login/LoginBox.vue'
import Authorizing from '../components/Loading/Authorizing.vue'
const routes = [
  { path: '/', name: '', component: Dashboard},
  { path: '/create',name: 'create', component: CreateAccount},
  { path: '/account', name: 'account', component: Account },
  { path: '/login', name: 'login', component: LoginBox },
  { path: '/authorized', name: 'authorizing', component: Authorizing}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Home from '../views/Home.vue'
import Beranda from '../views/Beranda.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
// import Sidebar from '../views/layouts/Sidebar.vue'
import Footer from '../views/layouts/Footer.vue'
import Petugas from '../views/Petugas.vue'  
import DataSiswa from '../views/DataSiswa.vue'
import Pelanggaran from '../views/Pelanggaran.vue'
import InputPelanggaran from '../views/InputPelanggaran.vue'
import PoinSiswa from '../views/PoinSiswa.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login}
  },
  {
    path: '/',
    name: 'beranda',
    components: {default: Beranda, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/petugas',
    name: 'petugas',
    components: {default: Petugas, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/dataSiswa',
    name: 'dataSiswa',
    components: {default: DataSiswa, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/pelanggaran',
    name: 'pelanggaran',
    components: {default: Pelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/inputPelanggaran',
    name: 'inputPelanggaran',
    components: {default: InputPelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/poinSiswa',
    name: 'poinSiswa',
    components: {default: PoinSiswa, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router

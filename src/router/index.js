import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Auth/Login.vue'),

  },
  {
    path: '/',
    name: 'Home',
    meta: { auth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    meta: { auth: true },
    component: () => import('../views/Orders.vue')
  },
  {
    path: '/products',
    name: 'Products',
    meta: { auth: true },
    component: () => import('../views/Products/ProductsList.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: { auth: true },
    component: () => import('../views/Products/Product.vue')
  },
  {
    path: '/add-product',
    name: 'Add-product',
    meta: { auth: true },
    component: () => import('../views/Products/AddProduct.vue')
  },
  {
    path: '/videos',
    name: 'Videos',
    meta: { auth: true },
    component: () => import('../views/Videos/VideosList.vue')
  },
  {
    path: '/video/:id',
    name: 'Video',
    meta: { auth: true },
    component: () => import('../views/Videos/Video.vue')
  },
  {
    path: '/add-video',
    name: 'Add-video',
    meta: { auth: true },
    component: () => import('../views/Videos/AddVideo.vue')
  },
  {
    path: '/reviews',
    name: 'Reviews',
    meta: { auth: true },
    component: () => import('../views/Reviews.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  // base: process.env.BASE_URL,
  base: '/thread-admin/',
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !localStorage.getItem("admin")) {
    next("/login");
  } else {
    next();
  }
})

export default router

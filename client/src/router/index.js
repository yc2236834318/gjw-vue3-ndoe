// 路由文件

// import { createRouter, createWebHistory } from 'vue-router' // 打包前使用
import { createRouter, createWebHashHistory } from 'vue-router' // 打包后使用
import { useUserStore } from '@/stores/index' // 导入用户仓库
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗

const router = createRouter({
  // history 路由模式
  //   1.history模式: createWebHistory
  //   2.hash模式: createWebHashHistory
  // import.meta.env.BASE_URL 项目基地址(见vite.config.js文件中的base)

  // history: createWebHistory(import.meta.env.BASE_URL), // 打包前使用
  history: createWebHashHistory(), // 打包后使用
  routes: [
    // 登录页
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      // 网站架子
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home', // 重定向到首页
      children: [
        // 二级路由
        {
          // 首页
          path: '/home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          // 分类页
          path: '/category/:id?',
          component: () => import('@/views/Category/index.vue')
        },
        {
          // 搜索页
          path: '/search',
          component: () => import('@/views/Search/index.vue')
        },
        {
          // 商品详情页
          path: '/detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: '/detail',
          redirect: '/detail/11001' // 若没有参数id,重定向到11001
        },
        {
          // 购物车页
          path: '/cart',
          component: () => import('@/views/Cart/index.vue')
        },
        {
          // 结算页
          path: '/checkout',
          component: () => import('@/views/Checkout/index.vue')
        },
        {
          // 支付页
          path: '/pay',
          component: () => import('@/views/Pay/index.vue')
        },
        {
          // 支付结果页
          path: '/payBack',
          component: () => import('@/views/Pay/PayBack.vue')
        },
        {
          // 个人中心页
          path: '/member',
          component: () => import('@/views/Member/index.vue'),
          redirect: '/member/user', // 重定向到用户信息
          children: [
            {
              // 用户信息
              path: 'user',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              // 用户订单
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    // 404页
    {
      path: '/:catchAll(.*)',
      redirect: '/home' // 重定向到首页
    }
  ],
  // 路由行为
  scrollBehavior() {
    return {
      top: 0 // 路由切换后滚动到页面顶部
    }
  }
})

// 路由导航守卫(vue3)
// 去掉了参数next,根据return返回值决定,是放行还是拦截
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  跳转到对应的地址
//    '/login'  { name: 'login' }
router.beforeEach((to) => {
  // 需要鉴权的路由
  const authUrls = [
    '/cart',
    '/checkout',
    '/pay',
    '/payBack',
    '/member',
    '/member/user',
    '/member/order'
  ]
  const useStore = useUserStore() // 注册用户仓库
  const token = useStore.token // 获取用户token
  if (token) return true // 用户登录则直接放行
  // 若用户未登录,且去往需要鉴权的页面
  if (authUrls.includes(to.path)) {
    myAlert('请先登录')
    return new Promise((resolve) => {
      resolve('/login') // 跳转到登录页
    })
  }
})

export default router

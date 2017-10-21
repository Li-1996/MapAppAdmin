import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: '用户', component: _import('user/index'), meta: { role: ['super'] }}]
  },

  {
    path: '/version',
    component: Layout,
    redirect: '/version/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: '版本信息', component: _import('version/index'), meta: { role: ['super'] }}]
  },
  {
    path: '/memory',
    component: Layout,
    redirect: '/memory/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: 'Across', component: _import('memory/index'), meta: { role: ['super'] }}]
  },
  {
    path: '/static',
    component: Layout,
    redirect: 'noredirect',
    name: '相关统计',
    icon: 'zujian',
    children: [
      { path: 'user', name: '用户统计', icon: 'tubiao', component: _import('static/user') },
      { path: 'memory', name: 'Across统计', icon: 'tubiao', component: _import('static/memory') }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


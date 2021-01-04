import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('../views/login/index'), hidden: true},
  {path: '/404', component: () => import('../views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    leaf: true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('../views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/host',
    component: Layout,
    redirect: '/host/dev',
    name: 'dev',
    meta: {title: '主机管理', icon: 'host'},
    children: [{
      path: 'device',
      name: 'device',
      component: () => import('../views/host/device'),
      meta: {title: '设备管理', icon: 'device'}
    },
    {
      path: 'vm',
      name: 'vm',
      component: () => import('../views/host/vm'),
      meta: {title: '虚拟主机', icon: 'vm'}
    }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: {title: ' 系统管理', icon: 'system'},
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('../views/system/user'),
      meta: {title: '用户管理', icon: 'user'}
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('../views/system/role'),
      meta: {title: '角色列表', icon: 'role'}
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('../views/system/log'),
      meta: {title: '日志信息', icon: 'log'}
    }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

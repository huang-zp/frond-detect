import {constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    topTitle:'',
    menuIndex:0
  },
  getters:{
    permission_routers: state => state.routers, // 所有路由
    addRouters: state => state.addRouters,  // 权限过滤路由
    topTitle:state => state.topTitle, // 顶部的title
    menuIndex:state => state.menuIndex, // 顶部菜单的index
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 权限路由
      state.routers = constantRouterMap.concat(routers) // 总路由
    }
  },
  actions: {
  }
}

export default permission

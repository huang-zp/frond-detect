import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;


/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',  
    component: Layout,
		redirect: '/index/index',
		hidden:true
  },
	{
		path: '/index',
		name: '控制面板',
		component:Layout,
		meta:{
			title:'控制面板',
		  icon: 'icondashboard',
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'资产探测平台',
					icon:'icondashboard',
				  routerType:'leftmenu'
				},
        component: () => import('@/page/index/index'),
			}
		]
	},
	{
		path:'/shell',
		name: '命令下发',
		component:Layout,
		meta: {
			title:'命令下发',
			icon: 'icon-mingling'
		},

		noDropdown:true,
		children:[
			{
				path:'commond',
				meta:{
					title:'命令下发',
					icon:'icon-mingling',
					routerType:'leftmenu'
				},
				component: () => import('@/page/userList/userList'),
			}
		]
	},
	{
		path:'/host',
		name: '系统配置',
		component:Layout,
		meta: {
			title:'系统配置',
			icon: 'icon-peizhi'
		},

		noDropdown:true,
		children:[
			{
				path:'info',
				meta:{
					title:'系统配置',
					icon:'icon-peizhi',
					routerType:'leftmenu'
				},
				component: () => import('@/page/config/config'),
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
]

	//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

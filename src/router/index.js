import Vue from 'vue' //加载vue
import VueRouter from 'vue-router' //加载vue-router 插件 工具 依赖
import Main from '../views/Main' //加载Main文件

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: Main
    }] //显示 Main页面内容

const router = new VueRouter({
    routes
})

export default router
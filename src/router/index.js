import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/Welcome'
import Front from '@/components/Front'
import Backend from '@/components/Backend'
import Database from '@/components/Database'
import Other from '@/components/Other'
import LastArticle from '@/components/LastArticle';
import Article from '@/components/Article';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome
      // props:true
    },
    {
      path:'/front',
      name: 'front',
      component: Front,
      // props:true,
      //要想一进入页面就让第一个子路由处于选中状态，可以给主路由加一个重定向的属性，把路径指向相应的子路由
      redirect: '/front/all',
      //子路由 路径不写/
      children:[
        {
          path:'all',
          component:LastArticle,
          // props:true
        },
        {
          name:"javaScript",
          // path:'javascript/:linkKeyWord/:category',
          path:'javascript',
          component:LastArticle,
          // props:true
        },
        {
          name:"vue",
          // path:'vue/:linkKeyWord/:category',
          path:'vue',
          component:LastArticle,
          // props:true
        },
        {
          name:"html/css",
          // path:'htmlcss/:linkKeyWord/:category',
          path:'htmlcss',
          component:LastArticle,
          // props:true
        },
        {
          name:'webpack',
          // path:'webpack/:linkKeyWord/:category',
          path:'webpack',
          component:LastArticle,
          // props:true
        },
        {
            name: 'art',
            // path: 'article/:id',
            path: 'article',
            component: Article,
            // props:true
        }
      ]
    },
    {
      path: '/backend',
      name: 'backend',
      component: Front,
      redirect: '/backend/all',
        //子路由 路径不写/
        children:[
            {
                path:'all',
                component:LastArticle,
            },
            {
                name:'java',
                // path:'java/:linkKeyWord/:category',
                path:'java',
                component:LastArticle,
                // props:true
            },
            {
                name:'spring',
                // path:'spring/:linkKeyWord/:category',
                path:'spring',
                component:LastArticle,
                // props:true
            }
        ]
    },
    {
      path: '/database',
      name: 'database',
      component: Front,
        redirect: '/database/all',
        //子路由 路径不写/
        children:[
            {
                path:'all',
                component:LastArticle,
            }
        ]
    },
    {
      path: '/other',
      name: 'other',
      component: Front,
        redirect: '/other/all',
        //子路由 路径不写/
        children:[
            {
                path:'all',
                component:LastArticle,
            }
        ]

    },
    {
        path: '/bigData',
        name: 'bigData',
        component: Front,
        redirect: '/bigData/all',
        //子路由 路径不写/
        children:[
            {
                path:'all',
                component:LastArticle,
            },
            {
                name:'hadoop',
                // path:'hadoop/:linkKeyWord/:category',
                path:'hadoop',
                component:LastArticle,
                // props:true
            }
        ]
    }
  ]
})

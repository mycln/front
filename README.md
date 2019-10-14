# front

> my blog -- A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

页面生产环境部署时，请注意改下后台服务地址，具体配置在lib/global.js下的target变量
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## add or modified information
```
2019.09.15 发表日期修改
2019.09.27 文章的行距加大、样式调整
2019.09.30 浏览器返回功能修复
2019.10.02 点击文章时，刷新页面时左边分类参数消失，显示为空
2019.10.13 分页功能完成
           刚点击进入页面后显示所有大类的最新列表
           
2019.10.
  bug1:大类下的最新列表分页再次点击时pageNum不会变，即在最新列表页显示页码2时，再点击java最新列表也为2，其显示真正的数据为页码1的
  期望：每次点击新组件时初始化页码都为1
  
  bug2:大类下的最新列表下点击某篇文章详情时，单页面下不会覆盖原来的列表组件。
  期望：点击查看文章时覆盖原组件
  
  功能：SEO优化
  自我介绍
  最新评论列表
  
```
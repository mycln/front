<template>
  <div class="front_wrapper">
    <v-header></v-header>
    <sub-nav></sub-nav>
    <div class="content">
      <div class="page">
        <div class="page-container">
          <div class="c-left">
            <!-- 分类 -->
            <div class="category">
              <h5>分类{{getId}}</h5>
              <!--接收最新文章模板传来的父分类id,以应付左边的分类参数消失造成的不显示分类项问题-->
              <last-article v-on:transToParentCateId="getChildCateId" class="last-article"></last-article>
              <!-- <label>javascript<span class="pull-right">
                <router-link :to="{name:'javascript',params:{category:'c',linkKeyWord:'javascript'}}">2篇</router-link>
                </span></label>
              <label>vue.js<span class="pull-right">
                <router-link :to="{name:'vue',params:{category:'c',linkKeyWord:'vue'}}">5篇</router-link>
                </span></label>
              <label>webpack<span class="pull-right">
                <router-link :to="{name:'webpack',params:{category:'c',linkKeyWord:'webpack'}}">8篇</router-link>
                </span></label> -->
                <!-- <router-link v-for="item in categorys" :to="{name:'room',params:{id:item.id}}">{{item.name}} </router-link> -->
                <div v-for="item in categorys">
                    <label>{{item.name}}
                      <span class="pull-right">
                        <!-- <router-link :to="{name:item.name,params:{category:'c',linkKeyWord:item.name}}">{{item.articleNum}}篇</router-link> -->
                        <router-link id="toLastArt" :to="{name:item.name,query:{category:item.id,linkKeyWord:item,category_pid:$route.query.cate}}" >{{item.articleNum}}篇</router-link>
                      </span>
                  </label>
                </div>
              
            </div>
            <!-- 最新评论 -->
            <div class="comment">
              <h5>最新评论</h5>
              <h6>大名1</h6>
              <p>真是一篇好文章啊</p>
              <span>2018-11-19</span>

              <h6>大名2</h6>
              <p>真是一篇好文章啊</p>
              <span>2018-11-19</span>
            </div>
          </div>
          <div class="c-right">
            <!-- 初始化为 5篇最新文章 -->
            <div class="last-article">
              <div v-if="$route.query.category == undefined">
                <last-article :category_pid="$route.query.cate"></last-article>
              </div>
              <div v-if="$route.query.category">
                <router-view/>
              </div>

              <!-- <div class="last" v-show="false">
                <last-article></last-article>
              </div>
              <div class="article" v-show="true">
                <v-article></v-article>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from './Head';
import subnav from './SubNav';
import axios from 'axios';
import LastArticle from "./LastArticle";

export default {
  name: 'Front',
//  props:['category'],
  data () {
    return {
      keyWord: '',
      categorys: [],
      category_pid:''
    }
  },
  components:{
      LastArticle,
      'v-header': header,
      'sub-nav':subnav
  },
  computed:{
    getId(){
        //下面两种传参方式页面刷新时参数会消失，用query传参不会丢失
//      this.category_id = this.$route.params.category;
//        this.category_id = this.$props.category;
        this.category_pid = this.$route.query.cate;
    }

  },
  created(){
      this.category_pid = this.$route.query.cate;
    // 获取所有前端分类
    // axios.get('http://localhost:9090/api/back/article/getCategoryVoByPid?categoryPid=1').then(res => {
    // axios.get(this.$GLOBAL.S0503+'?categoryPid=1').then(res => {
    //   if(res.data.code === 0){
    //       this.categorys = res.data.content;
    //     }
    // })
  },
  methods:{
//      从最新文章列表页面传来大分类id，以应付左边的分类参数消失造成的不显示分类项问题
      getChildCateId:function (data) {
          this.category_pid = data;
      }
  },
  watch:{
    //监听类别id,如果变化的话开始异步获取值
      category_pid(newVal,oldVal){
          if(this.category_pid != undefined && this.category_pid != ''){
            axios.get(this.$GLOBAL.S0503+'?categoryPid='+this.category_pid).then(res => {
              if(res.data.code === 0){
                  this.categorys = res.data.content;
                }
            })
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl'
  .front_wrapper 
    width 100vw
    height 100vh
    overflow-y auto  
    overflow-x  hidden
    background #f6f6f6
    .content
      width 100%
      .page
        width 70vw
        height 100vh
        margin -70px auto 20px auto
        background #ffffff
        border-radius 6px
        padding 20px 0px
        box-shadow 0 0 6px rgba(0,0,0,0.1)
        overflow-y auto
        .page-container
          margin 30px 20px 10px
          position relative
          @media (min-width: 100px)
            .c-left
              width 250px
              position absolute
              .category
                font-size 14px
                .last-article
                  display: none
                h5
                  margin 10px 0
                  font-size 16px
                  margin-top 20px
                  padding-bottom 5px
                  border-1px(rgba(240,20,20,0.1))
                label
                  display block
                  margin-bottom 5px
                  font-size 14px
                  line-height 20px
                  .pull-right 
                    cursor pointer
                    float right
                    color #999
              .comment
                font-size 14px
                h5
                  margin 10px 0
                  font-size 16px
                  margin-top 20px
                  padding-bottom 5px
                  border-1px(rgba(240,20,20,0.1))
                h6, p
                  color #333
                  padding-bottom 3px
                span 
                  color #6f6f6f
                  font-size 12px
                  display inline-block
                  padding-bottom 5px
          .c-right
            position absolute
            left 250px 
            right 20px
            .last-article
              margin-left: 30px;
              margin-top: 20px;
</style>

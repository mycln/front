<template>
  <div class="last_article_wrapper">
    <!-- 当页面刚进来时 -->
      <!--接收从文章详情页面传来大分类id，以应付左边的分类参数消失造成的不显示分类项问题-->
      <v-article v-on:transToLastArticleCateId="getChildArticleCateId" class="article"></v-article>

    <div v-if="$route.query.category == undefined">
        <h5 class="lab">最新文章</h5>
        <div class="summary">
            <div class="sum" v-for="(article,index) in lastArticles" >
                <!--<router-link class="title" :to="{name:'art',query:{id:article.id,categoryPid:$route.query.category_pid}}" tag='h5'>{{article.title}}</router-link>-->
                <router-link class="title" :to="{name:'art',query:{id:article.id,categoryPid:category_pid}}" tag='h5' active-class = "active">{{article.title}}</router-link>
                <p class="word" v-html="article.content"></p>
                <div class="count">
                    <span>{{article.utime | intDateFormat}}点</span>
                    <span>阅读数：{{article.viewTimes == null?0:article.viewTimes}}</span>
                    <span>评论数：{{article.commentsTimes == null?0:article.commentsTimes}}</span>
                </div>
            </div>
        </div>
        <v-pagination :pagesize="pageSize" :page="page" :total="total" @pageChange="pageChange"></v-pagination >
    </div>
    <!-- 当页面是用记点击左边分类或归档等选项进来时 -->
    <div v-if="$route.query.category">
        <h5 class="lab">{{$route.query.linkKeyWord == undefined?'':$route.query.linkKeyWord.name}}最新文章{{getId}}</h5>
        <!-- <h5 class="lab">{{$route.params.linkKeyWord}}最新文章</h5> -->
        <div class="summary">
            <div class="sum" v-for="(article,index) in category_lastArticles">
                <router-link class="title" :to="{name:'art',query:{id:article.id,categoryPid:$route.query.category_pid}}" tag='h5'>{{article.title}}</router-link>
                <p class="word" v-html="article.content"></p>
                <div class="count">
                    <span>{{article.utime |intDateFormat}}点</span>
                    <span>阅读数：{{article.viewTimes == null?0:article.viewTimes}}</span>
                    <span>评论数：{{article.commentsTimes == null?0:article.commentsTimes}}</span>
                </div>
            </div>
        </div>
            <!--<router-link to="backend"><span>上一页</span></router-link>-->
            <!--<router-link to="backend"><span>下一页</span></router-link>-->
        <v-pagination :pagesize="pageSize" :page="page" :total="total" @pageChange="pageChange"></v-pagination>
    </div>

    <!-- 当页面是点击文章标题进入详情页时 -->
    <!-- <div v-if="category === ''">
        <v-article></v-article>
    </div> -->
     <router-view/>
  </div>
</template>

<script>
import article from './Article';
import axios from 'axios';
import {intDateFormat} from '@/libs/date.js';
import pagination from '@/components/Pagenation.vue'

export default {
  name: 'lastArticle',
    props:{
        category_pid:{
            type:[Number,String],
            default:0
        }
    },

//  props:['linkKeyWord','category'],
  data () {
    return {
      page:1,
      pageSize:5,
      total:100,
      lastArticles:[],
      category_lastArticles:[],
      category_id:'',
      categoryPid:'' //大分类
    }
  },
  components:{
      'v-article':article,
      'v-pagination':pagination
  },
  methods:{
//    从文章详情页面传来大分类id，以应付左边的分类参数消失造成的不显示分类项问题
      getChildArticleCateId:function (data) {
          this.categoryPid = data;
          this.$emit("transToParentCateId",data);
      },
      pageChange(e){
          this.page=e.page;
          if(this.category_id != undefined && this.category_id != ''){
              axios.get(this.$GLOBAL.S0505+'?categoryId='+this.category_id+'&pageNum='+this.page+'&pageSize=5').then(res => {
                  if(res.data.code === 0){
                      this.category_lastArticles = res.data.content.list;
                  }else{
                      this.category_lastArticles = [];
                  }
              })
          }else{
              axios.get(this.$GLOBAL.S0504+'?categoryPid='+this.$route.query.cate+'&pageNum='+this.page+'&pageSize=5').then(res => {
                  if(res.data.code === 0){
                      this.lastArticles = res.data.content.list;
                  }
              })
          }
      }

  },
  computed:{
    getId(){
//      this.category_id = this.$props.category;
      this.category_id = this.$route.query.category;
    }
      //computed不能做异步操作
    //   categoryLastArticles(){
    //       let category_lastArticles = [];
    //     // 根据分类id获取最新文章列表
    //     if(this.category_id != undefined && this.category_id != ''){
    //         // return this.lastArticles;
    //         axios.get('http://localhost:9090/api/back/article/getListByCategoryId?categoryId='+this.category_id+'&pageNum=1&pageSize=5').then(res => {
    //         console.log(res);
    //             if(res.data.code === 0){
    //                 category_lastArticles = res.data.content.list;
    //             }
    //         })
    //     }
    //     return category_lastArticles;
    //   }
  },
  created(){
      // 根据分类pid获取最新文章列表
    // axios.get('http://localhost:9090/api/back/article/getListByCategoryPid?categoryPid=1&pageNum=1&pageSize=5').then(res => {
    axios.get(this.$GLOBAL.S0504+'?categoryPid='+this.$route.query.cate+'&pageNum=1&pageSize=5').then(res => {
      if(res.data.code === 0){
          this.lastArticles = res.data.content.list;
          this.total = res.data.content.total;
        }
    })
  },
    beforeUpdate() {
//      拿到从分类页面传来大分类id，刷新时再传给分类父模板Front，以应付左边的分类参数消失造成的不显示分类项问题
        this.categoryPid = this.$route.query.category_pid;
        this.$emit("transToParentCateId",this.$route.query.category_pid);
    },
  watch:{
      $route(to,from){
          this.page = 1;
          this.category_id = to.params.category;
      },
      //监听类别id,如果变化的话开始异步获取值,
      category_id(newVal,oldVal){
          if(this.category_id != undefined && this.category_id != ''){
            // axios.get('http://localhost:9090/api/back/article/getListByCategoryId?categoryId='+newVal+'&pageNum=1&pageSize=5').then(res => {
            axios.get(this.$GLOBAL.S0505+'?categoryId='+newVal+'&pageNum=1&pageSize=5').then(res => {
                if(res.data.code === 0){
                    this.category_lastArticles = res.data.content.list;
                    this.total = res.data.content.total;
                }else{
                    this.category_lastArticles = [];
                }
            })
        }
      }
  },
    filters:{
        intDateFormat(time){
            return intDateFormat('yyyy-MM-dd hh',time);
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl'
    .last_article_wrapper
        width 100%
        .article
            display none
        .lab
            margin 10px 0
            font-size 16px
            padding-bottom 5px
            border-1px(rgba(240,20,20,0.1))
        .summary
            font-size 0px
            margin-bottom 30px
            .sum
                font-size 14px
                padding-bottom 15px
                margin-top 10px
                border-1px(rgba(240,20,20,0.1))
                .title
                    font-size 18px
                    line-height 24px
                    color #3d3d3d
                    display inline-block
                    padding-bottom 5px
                    cursor pointer
                .word
                    font-size 14px
                    height 44px
                    line-height 22px
                    color #999
                    padding-bottom 5px
                    overflow hidden
                    text-overflow ellipsis
                    // white-space nowra//单行文本不换行
                .count
                    padding-top 4px
                    font-size 14px
                    color #6b6b6b

</style>
<template>
    <div class="article_wrapper">
        <h5 class="art_title">{{getId}}{{article.title}}</h5>
        <span class="publish-date">发表于 {{article.utime | intDateFormat}}点&nbsp;&nbsp;阅读量 {{article.viewTimes == null ? 0 : article.viewTimes}}</span>
        <div class="article">
            <div class="article_content" v-html="article.content"></div>
        </div>

        <!-- 评论区 -->
        <div class="article_comment">
            <h5 class="msg">我要发表看法</h5>
            <p class="yourMsg">您的留言</p>
            <textarea class="yourComment" name="" id="" cols="30" rows="10"></textarea>
            <p class="yourName">您的大名</p>
            <input class="realName" type="text">

        </div>
        <router-view/>
    </div>
</template>

<script>
    import axios from 'axios';
    import {intDateFormat} from '@/libs/date.js'

    export default {
        name: 'Database',
//  props:['id'],
        data () {
            return {
                artId: '',
                article: {}
            }
        },
        computed: {
            //先在模板使用计算属性{{getId}},才会有watch监听到artId的值,否则artId不会变化,因为不会走computed中的getId方法
            getId(){
//      this.artId = this.$props.id;
                this.artId = this.$route.query.id;
            }
        },
        beforeUpdate() {
//      拿到从最新文章列表页面传来大分类id，刷新时再传给最新文章列表父模板LastArticle，以应付左边的分类参数消失造成的不显示分类项问题
            this.$emit("transToLastArticleCateId", this.$route.query.categoryPid);
        },
        watch: {
            artId(newId, oldId){
                // axios.get('http://localhost:9090/api/back/article/getArticleById?id='+newId).then(res => {
                if(newId){
                    axios.get(this.$GLOBAL.S0506 + '?id=' + newId).then(res => {
                        if (res.data.code === 0) {
                            this.article = res.data.content;
                        } else {
                            this.article = {};
                        }
                    })

                }
            }
        },
        filters: {
            intDateFormat(time){
                return intDateFormat('yyyy-MM-dd hh', time);
            }
        }
    }
</script>

<style lang='stylus' ref='stylesheet/stylus'>
    @import '../assets/stylus/index.styl'
    .article_wrapper
        width 100%
        .art_title
            margin 10px 0
            font-size 18px
            padding-bottom 5px
            color #333
            font-weight 600
        .publish-date
            display block
            padding-top 4px
            font-size 16px
            color #6b6b6b
            padding-bottom 10px
            border-1px(rgba(240, 20, 20, 0.1))
        .article
            min-height 200px
            font-size 14px
            padding-bottom 15px
            margin-top 10px
            border-1px(rgba(240, 20, 20, 0.1))
            .article_content
                line-height 22px
        .article_comment
            margin-top 40px
            margin-bottom 40px
            .msg
                padding-bottom 10px
                border-1px(rgba(240, 20, 20, 0.1))
            .yourMsg
                margin: 12px 0px 5px 0px
            .yourName
                margin: 12px 0px 5px 0px
            .yourComment
                height: 157px
                width 650px
            .realName
                height 30px
                width 200px


</style>
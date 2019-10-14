<!--分页组件-->
<template>
    <div class="pagination">'
        <ul>
            <li :class="page==1?'disable':''" @click="prev">上一页</li>
            <li @click="toFirst">首页</li>
            <li v-for="item in list"  :class="[item==page?'active':'']"  @click="handleClick">
                {{item}}
            </li>
            <li @click="toEnd">尾页</li>
            <li :class="page==totalCount?'disable':''" @click="next">下一页</li>
            <li>总共{{totalCount}}页</li>
            <li>共{{total}}条</li>
            </ul>
        </div>
</template>
<script>

export default {
    props:{
        total:{
            type:[Number,String],
            default:0
        },
        pagesize:{
            type:[Number,String],
            default:1
        },
        page:{
            type:[Number,String],
            default:1
        }
    },
    data(){
        return {
            totalCount:0     //总页数
        }
    },
    computed:{
        list(){
            let list=[];
            //计算总页数
            this.totalCount=Math.ceil(this.total/this.pagesize);

            //超限控制
            if(this.page<=0){
                this.page=1;
            }
            if(this.page>this.totalCount){
                this.page=this.totalCount;
            }

            //计算显示页码
            if(this.totalCount>5){
                if(this.page>2&&this.page<this.totalCount-2){
                    list=[this.page-2,this.page-1,this.page,this.page+1,this.page+2];
                }else if(this.page<=2&&this.page>0){
                    for(let i=1;i<=5;i++){
                        list.push(i);
                    }
                }else if(this.page>=this.totalCount-2&&this.page<=this.totalCount){
                    for(let i=4;i>=0;i--){
                        list.push(this.totalCount-i);
                    }
                }
            }else{
                for(let i = 1;i<=this.totalCount;i++){
                    list.push(i);
                }
            }
            return list;
        }
    },

    methods:{
        //页码点击事件
        handleClick(e){
            let page=parseInt(e.target.innerText);
            let {count,total }=this;
            this.$emit('pageChange',{page,count,total});
        },

//        上一页或下一页点击时，由于子组件改变父组件传过来的值，会告警：[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "page"
        //前一页
        prev(e){
            if(!e.target.classList.contains['disable']){
                this.page>1&&this.page--;
                let {page,count,total }=this;
                this.$emit('pageChange',{page,count,total});
            }
        },
        //下一页
        next(e){
            if(!e.target.classList.contains['disable']){
                this.page<this.totalCount&&this.page++;
                let {page,pagesize,total }=this;
                this.$emit('pageChange',{page,pagesize,total});
            }
        },
        //首页
        toFirst(){
            let {page,pagesize,total }=this;
            this.$emit('pageChange',{page:1,pagesize,total});
        },
        //尾页
        toEnd(){
            let {page,pagesize,total }=this;
            this.$emit('pageChange',{page:this.totalCount,pagesize,total});
        }
    }
}

</script>

<style scoped>
    div.pagination{
        font-size: 12px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: #666;
        user-select: none;
    }
    div.pagination ul{
        padding: 0;
        margin:0;
    }
    div.pagination ul li{
        display: inline-block;
        min-width:30px;
        min-height:30px;
        border-radius:3px;
        line-height: 30px;
        text-align: center;
        margin: 0 6px;
        cursor: pointer;
    }
    div.pagination ul li.active{
        background: #1796e0;
        color:#fff;
    }
    div.pagination ul li.disable{
        color: #ccc;
    }

</style>

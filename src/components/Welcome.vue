<template>
  <div id="app">
    <div class="world">
      <div class="cube" tabindex="0">
        <!--<router-link class="cube__front" :to="{name:'front',params:{category:1}}" tag='div'>大前端</router-link>-->
        <router-link class="cube__front" :to="{name:'front',query:{cate:1}}" tag='div'>大前端</router-link>
        <router-link class="cube__back" :to="{name:'backend',query:{cate:2}}" tag='div'>后端</router-link>
        <router-link class="cube__left" :to="{name:'database',query:{cate:3}}" tag='div'>数据库</router-link>
        <router-link class="cube__right" :to="{name:'other',query:{cate:4}}" tag='div'>其它</router-link>
        <router-link class="cube__top" :to="{name:'bigData',query:{cate:9}}" tag='div'>大数据</router-link>
        <router-link class="cube__bottom" :to="{name:'backend',query:{cate:2}}" tag='div'>后端</router-link>

        <!-- <div v-for="item in categorys">
          <router-link :to="{name:'front',params:{category:item.id}}" tag='div'>{{item.name}}</router-link>
        </div> -->
      </div>
      
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'App',
  data () {
    return {
      categorys: []
    }
  },
  created(){
    // 获取所有一级分类
    // axios.get(this.$GLOBAL.S0503+'?categoryPid=0').then(res => {
    //   if(res.data.code === 0){
    //       this.categorys = res.data.content;
    //     }
    // })
  }
}

</script>

<style scoped>
.world {
  perspective: 800px;
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cube {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  width: 50vh;
  height: 50vh;
  position: relative;
  animation: rotator 7.5s linear infinite;
  outline: 0;
}
.cube * {
  /* background: #154c6d; */
  background: rgb(238, 70, 64);
  opacity: 0.6;
  box-shadow: 0 0 3vh currentColor;
  transition: background 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
}
 .cube:hover * { 
   /* background: currentColor;  */
   box-shadow: 0 0 20vh currentColor;
   cursor: pointer;
}
.cube .cube__front {
  color: rgb(71, 20, 255);
  transform: translateZ(12.5vh);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}
.cube .cube__right {
  color: rgb(239, 243, 9);
  transform: rotateY(90deg) translateZ(12.5vh);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}
.cube .cube__left {
  color: skyblue;
  transform: rotateY(270deg) translateZ(12.5vh);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}
.cube .cube__back {
  color: rgb(14, 230, 14);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  transform: rotateY(180deg) translateZ(12.5vh);
}
.cube .cube__top {
  color: rgba(83, 61, 12, 0.911);
  transform: rotateX(90deg) translateZ(12.5vh);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}
.cube .cube__bottom {
  color: dodgerblue;
  transform: rotateX(270deg) translateZ(12.5vh);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}
.cube>div{
  font-size: 2vw;
  text-align: center;
  line-height: 11vw;
  vertical-align: middle;
  border-radius: 10%;
}
@keyframes rotator {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>

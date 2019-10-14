<template>
  <div id="app">
      <!-- <router-link to="welcome"></router-link> -->
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      flag : true,
      isRouterAlive: true
    }
  }
}

</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  /* background: #222; */
  background-image: url('assets/bg1.jpg');
  background-size: 100% 100%;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: center;
}
</style>

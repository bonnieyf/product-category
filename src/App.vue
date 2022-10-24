<template>
  <div id="app">
    <router-view :key="$route.fullPath" ref="showbox" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullHeight: 1000,
    };
  },
  components: {},
  mounted(){


  }
  // mounted() {
  //   // document.oncontextmenu = function() {
  //   //   return false;
  //   // };
  //   // window.parent.postMessage({ Type: 3 }, "*");
  //   // window.parent.postMessage(
  //   //   {
  //   //     Type: 2,
  //   //     ID: "repairinstructioniframe",
  //   //     Height: this.$refs.showbox.offsetHeight,
  //   //   },
  //   //   "*"
  //   // );


  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

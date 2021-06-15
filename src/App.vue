<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Roselyn 修改建議
// 1. Repair Instruction => Repair Video
// 2. icon -> 8月中之前給
// 3. default menu -> 預設打開(ok)
// video 加入防止右鍵(ok)
// mail裡面的產品列表 X500 是同一隻有多種影片，舊影片的部分按 Enter 後會直接到 video 頁面
//
export default {
  components: {},
  mounted() {
    // document.oncontextmenu = function() {
    //   return false;
    // };
  },
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

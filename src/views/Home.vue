<template>
  <div class="home all-bg" ref="infoBox">
    <main class="main-box">
      <div class="container">
        <section
          class="product-content"
          v-for="(group, index) in getProducts"
          :key="group.name"
        >
          <div class="space-line" v-if="index"></div>

          <h3 :id="group.name" class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ group.name }}
            </span>
          </h3>
          <div class="product-content__inner">
            <div class="columns is-flex-wrap-wrap is-5">
              <div
                class="column is-one-quarter"
                v-for="item in group.datas"
                :key="item.id"
              >
                <div class="card">
                  <pageSelector
                    :options="item.version"
                    :item="item"
                    :device="group.name.toLowerCase()"
                    :itemLength="item.version.length"
                  ></pageSelector>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import pageSelector from "./pageSelector";
export default {
  data() {
    return {
      code: "",
      bodyHeight: 0,
      imgLength: 0,
    };
  },
  components: {
    pageSelector,
  },
  methods: {
    sendGA() {
      console.log("hello");
      this.$gtag.event("login", { method: "Google" });
    },
    productOnChange(event) {
      this.code = event.target.value;
    },
    setData() {
      this.getProducts.forEach((val, index) => {
        this.getProducts[index].datas = val.datas.sort(function (a, b) {
          var nameA = a.product.toLowerCase();
          var nameB = b.product.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
      });
    },
    imageLoaded() {
      let element = document.querySelectorAll(".card-image");
      this.imgLength++;
      if (this.imgLength === element.length) {
        this.sendMessageToParent();
      }
    },
    sendMessageToParent() {
      this.bodyHeight = this.$refs.infoBox.clientHeight;
      console.log("bodyHeight:" + this.bodyHeight);
      parent.postMessage({ Type: 3 }, "*");
      parent.postMessage(
        {
          Type: 2,
          ID: ".repairinstructioniframe",
          Height: this.bodyHeight,
        },
        "*"
      );
    },
  },
  computed: {
    getProducts() {
      return this.$store.getters.GET_MENU_DATAS;
    },
    getProductsData() {
      return this.$store.getters.GET_DATAS;
    },
  },
  mounted() {
    this.sendMessageToParent();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  created() {
    this.setData();
    window.addEventListener("resize", this.sendMessageToParent);
  },
  destroyed() {
    window.removeEventListener("resize", this.sendMessageToParent);
  },
};
</script>

<style scoped lang="sass">
@import '../assets/web.style'
.home
  padding-top: 30px
  padding-bottom: 50px

.card-image img
  bottom: auto
  height: auto
</style>

<template>
  <div class="home all-bg">
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
                v-for="(item, index) in group.datas"
                :key="index"
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
  name: "Home",
  data() {
    return {
      code: "",
    };
  },
  components: {
    pageSelector,
  },
  methods: {
    productOnChange(event) {
      this.code = event.target.value;
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
};
</script>

<style scoped lang="sass">
@import '../assets/web.style'
.home
  padding-top: 30px
  padding-bottom: 50px
</style>

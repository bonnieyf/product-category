<template>
  <div class="home all-bg" ref="infoBox">
    <main class="main-box">
      <div class="container">
        <section
          class="product-content"
          v-for="(group, index) in getProducts"
          :key="group.id"
        >
          <div class="space-line" v-if="index"></div>
          <h3 class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ group.typeName }}
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
                    :device="group.typeName.toLowerCase()"
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
    productOnChange(event) {
      this.code = event.target.value;
    },
  },
  computed: {
    getProducts() {
      return this.$store.getters.GET_LIST;
    },
    getProductsData() {
      return this.$store.getters.GET_DATAS;
    },
  },
  mounted() {
    this.getProducts.forEach((val, index) => {
      this.getProducts[index].productName = val.datas.sort(function (a, b) {
        var nameA = a.productName.toLowerCase();
        var nameB = b.productName.toLowerCase();
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

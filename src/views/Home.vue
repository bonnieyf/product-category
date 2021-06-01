<template>
  <div class="home all-bg">
    <header class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Homepage</a></li>
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Service Video</a></li>
          </ul>
        </nav>
      </div>
    </header>
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
                :key="item.title"
              >
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img :src="itemImg(item.imgSrc)" :alt="item.title" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">{{ item.title.replace('GETAC ','') }}</p>
                      </div>
                    </div>

                    <div class="buttons">
                      <router-link
                        :to="
                          `${group.name.toLowerCase()}/${item.title
                            .toLowerCase()
                            .replace('getac ', '')}`
                        "
                        ><b-button type="is-org" expanded
                          >Detail</b-button
                        ></router-link
                      >
                    </div>
                  </div>
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
export default {
  name: "Home",
  methods: {
    itemImg: function(path) {
      return require("@/" + path);
    },
  },
  computed: {
    getProducts() {
      return this.$store.getters.GET_DATAS;
    },
  },
};
</script>

<style scoped lang="sass">
@import '../assets/web.style'
</style>

<template>
  <div class="page">
    <header class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Homepage</a></li>
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Service Video</a></li>
            <li>
              <router-link
                to="/"
                >{{
                  getType.charAt(0).toUpperCase() + getType.slice(1)
                }}</router-link
              >
            </li>
            <li class="is-active">
              <router-link :to="`/${getType}/${getId}/`">{{
                getDatas.datas.title.replaceAll("GETAC ", "")
              }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="main-box">
      <div class="main-box__header">
        <div class="container">
          <div class="main-box__header-inner">
            <div class="columns is-align-items-center">
              <div class="column">
                <h2 class="title is-0">{{ getDatas.datas.title }}</h2>
                <p class="description">
                  {{ getDatas.datas.descroption }}
                </p>

                <router-link :to="`/${getType}/${getDatas.datas.id}/before`"><b-button type="is-org" expanded>Learn more</b-button></router-link>
              </div>
              <div class="column">
                <img src="~@/assets/s410.png" class="photo" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <p class="main-box__txt">
          {{ getDatas.datas.txt }}
        </p>
        <div class="filter-options notification">
          <div class="buttons">
            <button
              @click="change('All')"
              :class="{ 'is-outlined': changeSelected != 'All' }"
              inverted
            >
              All
            </button>
            <button
              v-for="(item, index) in getCate"
              :key="item[index]"
              inverted
              :class="{ 'is-outlined': changeSelected != item }"
              @click="change(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="filter-resulet">
          <div
            class="filter-item"
            :class="{
              hidebox: key === changeSelected,
              all: changeSelected === 'All'
            }"
            v-for="(data, key) in cateTatal"
            :key="data.id"
          >
            <div class="filter-content">
              <div class="filter-content__title">
                <h2>{{ key }}</h2>
              </div>
              <div class="filter-content__main">
                <p v-for="group in data" :key="group.id">
                  <router-link :to="`/${getType}/${getId}/${group.id}`"
                    >{{ group.menuTitle }}

                    <span v-if="group.states === 'upgrade'" type="is-info"
                      >(Upgrade)</span
                    >
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeSelected: null,
      filterObject: [],
      cateTatal: {},
    };
  },
  methods: {
    change(val) {
      this.changeSelected = val;
    },
    getSelecedDefault() {
      this.changeSelected = this.getCateSelect;
    },
    marginObject() {
      this.getCate.forEach((item) => {
        let returnData = this.filterLinks.filter(
          (innerItem) => innerItem.menuTitle.charAt(0) === item
        );
        this.cateTatal[item] = returnData;
      });
    },
  },
  computed: {
    getType() {
      return this.$route.params.type;
    },
    getId() {
      return this.$route.params.id;
    },
    getDatas() {
      return this.$store.state.filterData;
    },
    getCateSelect() {
      return this.$store.state.categoryFilterSelected;
    },
    getCate() {
      return this.$store.getters.GET_FIRST_CATE;
    },
    filterLinks() {
      let resultObj = [];
      this.getDatas.datas.menu.filter((link) => {
        resultObj.push(link);
        resultObj.sort((a, b) => a.menuTitle.localeCompare(b.menuTitle));
      });
      return resultObj;
    },
  },
  created() {
    this.$store.dispatch("COMMITFILTERDATA", {
      deviceId: this.getType,
      productId: this.getId,
    });
    this.getSelecedDefault();
    this.marginObject();
  },
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap')
@import '../assets/web.style'
</style>

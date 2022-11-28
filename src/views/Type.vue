<template>
  <div class="page" ref="infoBox">
    <div class="main-box">
      <div class="main-box__header">
        <div class="container">
          <div class="main-box__header-inner">
            <div class="columns is-align-items-center">
              <div class="column">
                <h2 class="title is-0">{{ getDatas.title }}</h2>
                <p class="description">
                  {{ getDatas.descroption }}
                </p>

                <router-link :to="`/${getType}/${getDatas.id}/before`"
                  ><b-button class="hero-btn" type="is-org" expanded
                    >PREPARATION</b-button
                  ></router-link
                >
              </div>
              <div class="column">
                <img
                  class="product-img"
                  :src="getURL(getDatas.imgSrc)"
                  :alt="getDatas.title"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Back to List -->
        <div class="back-to-list">
          <router-link :to="`/`"
            ><b-button style="max-width: 140px" type="is-org"
              >Back to List</b-button
            ></router-link
          >
        </div>
      </div>
      <div class="container">
        <div class="breadcrumb-content">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><router-link to="/">Service Video</router-link></li>
              <li class="is-active">
                <router-link :to="`/${getType}/${getId}/`">{{
                  getDatas.title.replace(/GETAC /g, "")
                }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <p class="main-box__txt">
          {{ getDatas.txt }}
        </p>

        <div class="search-bar">
          <div class="item">
            <input
              type="text"
              v-model="search"
              placeholder="Enter component name"
            />
          </div>
          <div class="item">
            <b-button type="is-org" @click="searchBlur = true">Search</b-button>
          </div>
        </div>

        <div class="search-result" v-if="search.length > 0">
          <div class="hr"></div>
          <div class="search-result-total">
            <span>
              <b>{{ searchFilter.length }}</b> Result for <b>{{ search }}</b>
            </span>
            <b-button type="is-org" @click="cleanResult">Clear</b-button>
          </div>
          <div class="filter-content__main">
            <p v-for="result in searchFilter" :key="result.id">
              <router-link
                :to="`/${getType}/${getId}/${result.id}`"
                v-if="result.active === true"
                >{{ result.menuTitle.replace("(Device Upgrade)", "") }}

                <span v-if="result.isUpgrade" type="is-info"
                  >(Device Upgrade)</span
                >
              </router-link>
            </p>
          </div>
        </div>

        <div class="filter-main" v-if="search.length <= 0">
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
                {{ item.replace("(Upgrade)", "") }}
              </button>
            </div>
          </div>

          <div class="filter-resulet">
            <div
              class="filter-item"
              :class="{
                hidebox: key === changeSelected,
                all: changeSelected === 'All',
              }"
              v-for="(data, key) in cateTatal"
              :key="data.id"
            >
              <div class="filter-content" :class="`class-${key}`">
                <div class="filter-content__title">
                  <h2>{{ key }}</h2>
                </div>

                <div class="filter-content__main" v-if="isNewMenu">
                  <p v-for="group in data" :key="group.id">
                    <router-link
                      :to="`/${getType}/${getId}/${group.id}`"
                      v-if="group.active === true"
                      >{{ group.menuTitle.replace("(Upgrade)", "") }}

                      <span v-if="group.isUpgrade" type="is-info"
                        >(Device Upgrade)</span
                      >
                    </router-link>
                  </p>
                </div>

                <div class="filter-content__main" v-else>
                  <p v-for="group in data" :key="group.id">
                    <router-link
                      :to="`/${getType}/${getId}/${group.id}`"
                      v-if="group.active === true"
                      >{{ group.menuTitle.replace("(Upgrade)", "") }}

                      <span v-if="group.isUpgrade" type="is-info"
                        >(Device Upgrade)</span
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      changeSelected: null,
      filterObject: [],
      cateTatal: {},
      searchBlur: false,
      search: "",
      isNewMenu: null,
    };
  },
  methods: {
    getURL(val) {
      return require(`./../assets/images/${val}`);
    },
    cleanResult() {
      this.search = "";
      this.searchBlur = false;
    },
    change(val) {
      this.changeSelected = val;

      let divPosition = document.querySelector(".filter-main");
      let scrollPositon = "start";
      if (val !== "All" && window.innerWidth > 769) {
        divPosition = document.querySelector(`.class-${val}`);
        scrollPositon = "center";
      }

      divPosition.scrollIntoView({ behavior: "smooth", block: scrollPositon });
    },
    findPos(obj) {
      var curtop = 0;
      if (obj.offsetParent) {
        do {
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [curtop];
      }
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
      let element = this.getDatas.menu;
      if (this.isNewMenu) {
        element = this.getDatas.menu.menuList;
      }
      element.filter((link) => {
        resultObj.push(link);
        resultObj.sort((a, b) => a.menuTitle.localeCompare(b.menuTitle));
      });
      return resultObj;
    },
    searchFilter() {
      return this.filterLinks.filter((item) => {
        if (this.search.toLowerCase().match(/^device.*(up)|.*(up)/g)) {
          return item.isUpgrade == true;
        }
        return item.menuTitle.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },
  created() {
    this.$store.dispatch("COMMITFILTERDATA", {
      deviceId: this.getType,
      id: this.getId,
    });
    this.isNewMenu = this.getDatas.isNewMenu;
    this.getSelecedDefault();
    this.marginObject();
  },
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap')
@import '../assets/web.style'

.hero-btn
  text-transform: uppercase
.search-bar
  +tablet
    display: flex

  +mobile
    .item
      padding-right: 0

    input
      margin-right: 0
      margin-bottom: 15px
      max-width: 100%
      width: 100%

    button.is-org
      margin-left: 0
      width: 100%
      max-width: 100%
</style>

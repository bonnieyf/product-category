<template>
  <div class="page video-page">
    <div class="main-box" :class="{ showmenu: openMenu }">
      <div class="container">
        <div
          v-if="getVideoId != 'before'"
          class="container-inner"
          :class="{ move: openMenu }"
        >
          <h3 class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ getDatas.datas.title }} -
              {{ filterSelectData.datas.menu[getVideoId].menuTitle }}
              <b
                v-if="
                  filterSelectData.datas.menu[getVideoId].states === 'upgrade'
                "
                >(Upgrade)</b
              >
            </span>
          </h3>

          <div class="resp-video">
            <iframe
              width="100%"
              height="600"
              :src="
                `https://www.youtube.com/embed/${filterSelectData.datas.menu[getVideoId].videoUrl}`
              "
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div v-else class="container-inner" :class="{ move: openMenu }">
          <h3 class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ getDatas.datas.title }} - Preparation before Service
            </span>
          </h3>

          <div class="resp-video">
            <iframe
              width="100%"
              height="600"
              :src="
                `https://www.youtube.com/embed/${filterSelectData.datas.videoUrl}`
              "
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Back to List -->
      <div class="back-to-list">
        <router-link :to="`/${getType}/${getId}/`"
          ><b-button type="is-org">Back to List</b-button></router-link
        >
      </div>

      <!-- navigation -->
      <div class="menu-button left">
        <a href="#" @click.prevent="openMenu = !openMenu">
          <span><font-awesome-icon icon="caret-right"/></span>
        </a>
      </div>

      <div class="side-menu" :class="{ show: openMenu }">
        <vue-scroll :ops="ops">
          <div class="side-menu__inner">
            <h3 class="side-menu__title">
              <span>Video for Service Category</span>
            </h3>
            <!-- Search function -->
            <div class="search-bar">
              <input
                type="text"
                v-model="search"
                placeholder="Enter component name"
              />
              <b-button type="is-org" @click="searchBlur = true"
                >Search</b-button
              >
            </div>

            <div class="search-result" v-if="search.length > 0">
              <div class="search-result-total">
                <span>
                  <b>{{ searchFilter.length }}</b> Result for
                  <b>{{ search }}</b>
                </span>
                <b-button type="is-org" @click="cleanResult">Clean</b-button>
              </div>
              <div class="filter-content__main">
                <p
                  v-for="result in searchFilter"
                  :key="result.id"
                  @click="
                    openMenu = false;
                    search = '';
                  "
                >
                  <router-link :to="`/${getType}/${getId}/${result.id}`"
                    >{{ result.menuTitle }}

                    <span v-if="result.states === 'upgrade'" type="is-info"
                      >(Upgrade)</span
                    >
                  </router-link>
                </p>
              </div>
            </div>

            <div class="side-menu__list" v-if="search.length <= 0">
              <div class="side-menu__item" @click="openMenu = false">
                <h2><font-awesome-icon icon="star" /></h2>
                <router-link :to="`/${getType}/${getId}/before`"
                  >Preparation before Service</router-link
                >
              </div>

              <div
                class="side-menu__item"
                v-for="(data, key) in cateTatal"
                :key="data.id"
              >
                <h2>{{ key }}</h2>
                <div v-for="group in data" :key="group.id">
                  <p @click="openMenu = false">
                    <router-link :to="`/${getType}/${getId}/${group.id}`"
                      >{{ group.menuTitle }}

                      <span
                        class="upgrade-tag"
                        v-if="group.states === 'upgrade'"
                        type="is-info"
                        >(Upgrade)</span
                      ></router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterSelectData: null,
      cateTatal: {},
      openMenu: false,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          specifyBorderRadius: "0px",
          background: "rgba(255,255,255,.25)",
          opacity: 1,
          size: "17px",
          gutterOfEnds: null,
          gutterOfSide: "0px",
        },
        bar: {
          showDelay: 500,
          keepShow: true,
          background: "#909090",
          specifyBorderRadius: "0px",
          size: "17px",
          disable: false,
        },
      },
      searchBlur: false,
      search: "",
    };
  },
  methods: {
    cleanResult() {
      this.search = "";
      this.searchBlur = false;
    },
    getSelectedData() {
      this.filterSelectData = this.getDatas;
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
    getVideoId() {
      return this.$route.params.videoId;
    },
    getDatas() {
      return this.$store.state.filterData;
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
    searchFilter() {
      return this.filterLinks.filter((item) => {
        return item.menuTitle.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.$store.dispatch("COMMITFILTERDATA", {
      deviceId: this.getType,
      productId: this.getId,
    });
    this.getSelectedData();
    this.marginObject();
  },
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap')
@import '../assets/web.style'
.bd-anchor-name
  color: white

.upgrade-tag
  opacity: .6

.search-bar
  display: flex

  input
    width: 210px

  button
    width: 90px

.search-bar
  padding-bottom: 30px

.search-result-total
  span b
    color: white

  span
    color: #8E8E8E

.filter-content__main
  padding-left: 25px
  padding-right: 25px
  a
    color: white
</style>

<template>
  <div>
    <div class="main-box" :class="{ showmenu: openMenu }">
      <div class="container">
        <div
          
          class="container-inner"
          :class="{ move: openMenu }"
        >
          <h3 v-if="getVideoId != 'before'" class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ getDatas.datas.title.replace("GETAC ", "") }} -
              {{
                filterSelectData.datas.menu[getVideoId].menuTitle.replace(
                  "(Device Upgrade)",
                  ""
                )
              }}
              <b v-if="filterSelectData.datas.menu[getVideoId].isUpgrade"
                >(Device Upgrade)</b
              >
            </span>
          </h3>

          <h3 v-if="getVideoId === 'before'" class="title is-4 is-spaced bd-anchor-title">
            <span class="bd-anchor-name">
              {{ getDatas.datas.title }} - Preparation Before Service
            </span>
          </h3>
          

            <!-- <div class="resp-video">
              <video ref="player" controls autoplay :src="newUrl"></video>
            </div> -->
            <!-- <div id="player"></div> -->
            <vue-plyr ref="plyr">
              <video
                controls
                autoplay
                playsinlines
                :src="`${publicPath}${newUrl}`"
                format="video/mp4"
              >
              </video>
            </vue-plyr>
        </div>

      </div>

      <!-- Back to List -->
      <div class="back-to-list">
        <router-link :to="`/${getType}/${getId}/`"
          ><b-button type="is-org">Back to List</b-button></router-link
        >
      </div>

      <!-- navigation -->
      <div class="menu-button left" v-if="getVideoId != 'video'">
        <a href="#" @click.prevent="openMenu = !openMenu">
          <i v-if="openMenu == false" class="icon-bar"></i>
          <i v-else class="icon-x"></i>
        </a>
      </div>

      <div class="side-menu" v-if="getVideoId != 'video'">
        <vue-scroll :ops="ops">
          <div class="side-menu__inner">
            <h3 class="side-menu__title">
              <span>Video for Service Category</span>
            </h3>
            <!-- Search function -->
            <div class="search-bar">
              <div class="item">
                <input
                  type="text"
                  v-model="search"
                  placeholder="Enter component name"
                />
              </div>
              <div class="item">
                <b-button type="is-org" @click="searchBlur = true"
                  >Search</b-button
                >
              </div>
            </div>

            <div class="search-result" v-if="search.length > 0">
              <div class="search-result-total">
                <span>
                  <b>{{ searchFilter.length }}</b> Result for
                  <b>{{ search }}</b>
                </span>
                <b-button type="is-org" @click="cleanResult">Clear</b-button>
              </div>
              <div class="filter-content__main">
                <p
                  v-for="result in searchFilter"
                  :key="result.id"
                  @click="search = ''"
                >
                  <router-link :to="`/${getType}/${getId}/${result.id}`" v-if="result.isShow === true"
                    >{{ result.menuTitle.replace("(Device Upgrade)", "") }}

                    <span v-if="result.isUpgrade" type="is-info"
                      >(Device Upgrade)</span
                    >
                  </router-link>
                </p>
              </div>
            </div>

            <div class="side-menu__list" v-if="search.length <= 0">
              <div class="side-menu__item">
                <h2><font-awesome-icon icon="star" /></h2>
                <router-link @click.native="updateUrl('before')" :to="`/${getType}/${getId}/before`"
                  >Preparation Before Service</router-link
                >
              </div>

              <div
                class="side-menu__item"
                v-for="(data, key) in cateTatal"
                :key="data.id"
              >
                <h2>{{ key }}</h2>
                <div v-for="group in data" :key="group.id">
                  <p v-if="group.isShow === true">
                    <router-link @click.native="updateUrl(group.id)" :to="`/${getType}/${getId}/${group.id}`"
                      >{{ group.menuTitle.replace("(Device Upgrade)", "") }}
                      
                      <br>
                      <span
                        class="upgrade-tag"
                        v-if="group.isUpgrade"
                        type="is-info"
                        >(Device Upgrade)</span
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
      publicPath: process.env.BASE_URL,
      cateTatal: {},
      openMenu: false,
      newUrl: null,
      player: null,
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
    updateUrl(newId){
      if(newId == 'before'){
        this.newUrl = this.getDatas.datas.videoUrl;
      }

      this.newUrl = this.getDatas.datas.menu[newId].videoUrl;

      this.player = this.$refs.plyr.player;
      this.player.load();
    }
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
        if(this.search.toLowerCase().match(/^device.*(up)|.*(up)/g)){
          return item.isUpgrade == true;
        }
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
    this.updateUrl(this.getVideoId);
  },
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap')
@import '../assets/web.style'
.bd-anchor-name
  color: white

span
  color: white

.upgrade-tag
  opacity: .6

.search-bar
  .item:nth-child(1)
    margin-bottom: 10px
    padding-right: 0

  input
    width: 100%


  .button.is-org
    margin-left: 0
    width: 100%
    max-width: 100%

  +tablet
    display: flex

    .item
      flex: auto
      &:nth-child(1)
        padding-right: 10px

    input
      max-width: 210px

    .button.is-org
      max-width: 90px


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

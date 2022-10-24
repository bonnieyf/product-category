<template>
  <div>
    <div class="main-box" :class="{ showmenu: openMenu }">
      <div class="container">
        <div class="container-inner" :class="{ move: openMenu }">

          <!-- Title Style -->
          <div v-if="getVideoId != 'before' && !isNewMenu">
            <h3 class="title is-4 is-spaced bd-anchor-title">
              <span class="bd-anchor-name">
                {{ getDatas.title.replace("GETAC ", "") }} -
                {{
                  filterSelectData.menu[getVideoId].menuTitle.replace(
                    "(Device Upgrade)",
                    ""
                  )
                }}
                <b v-if="filterSelectData.menu[getVideoId].isUpgrade"
                  >(Device Upgrade)</b
                >
              </span>
            </h3>
            <vue-plyr ref="plyr">
              <video
                id="video"
                controls
                autoplay
                playsinlines
                :src="newUrl"
                format="video/mp4"
              ></video>
            </vue-plyr>
          </div>

          <div v-if="getVideoId != 'before' && isNewMenu">
            <h3 class="title is-4 is-spaced bd-anchor-title">
              <span class="bd-anchor-name">
                {{ getDatas.title.replace("GETAC ", "") }} -
                {{
                  filterSelectData.menu.menuList[getVideoId].menuTitle.replace(
                    "(Device Upgrade)",
                    ""
                  )
                }}
                <b v-if="filterSelectData.menu.menuList[getVideoId].isUpgrade"
                  >(Device Upgrade)</b
                >
              </span>
            </h3>

            <div class="row">
              <div class="col-left">
                <div
                  v-bar="{
                    preventParentScroll: true,
                    scrollThrottle: 30,
                  }"
                  id="scroll-thin"
                >
                  <div class="scroll-content">
                    <div class="side-menu__item">
                      <h2>
                        <svg
                          class="svg-inline--fa fa-star fa-w-18"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path></svg
                        ><a
                          class="slide-menu-link"
                          href="#"
                          @click.prevent="setPlayer()"
                          :data-url="getDatas.videoUrl[0]"
                          >Preparation Before Service</a
                        >
                      </h2>
                    </div>
                    <div class="sub-menu">
                      <h3 class="side-menu__title">
                        <span>DISMANTLE</span>
                      </h3>
                      <ol class="sub-menu__nav">
                        <li
                          v-for="(item, index) in newUrl.dismantle"
                          :key="'dismantle' + index"
                        >
                          <a
                            :data-url="getDatas.menu.dismantle[item].url"
                            @click.prevent="setPlayer()"
                            >{{ getDatas.menu.dismantle[item].title }}</a
                          >
                        </li>
                      </ol>
                    </div>
                    <div class="sub-menu">
                      <h3 class="side-menu__title">
                        <span>ASSEMBLY</span>
                      </h3>
                      <ol class="sub-menu__nav">
                        <li
                          v-for="(item, index) in newUrl.assembly
                            .slice()
                            .reverse()"
                          :key="'assembly' + index"
                        >
                          <a
                            :data-url="getDatas.menu.assembly[item].url"
                            @click="setPlayer"
                            >{{ getDatas.menu.assembly[item].title }}</a
                          >
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-right">
                <vue-plyr ref="plyr">
                  <video
                    id="video"
                    controls
                    autoplay
                    playsinlines
                    :src="newUrl"
                    format="video/mp4"
                  ></video>
                </vue-plyr>
              </div>
            </div>
          </div>

          <div v-if="getVideoId === 'before'">
            <h3 class="title is-4 is-spaced bd-anchor-title">
              <span class="bd-anchor-name">
                {{ getDatas.title }} - Preparation Before Service
              </span>
            </h3>
            <vue-plyr ref="plyr">
              <video
                controls
                autoplay
                playsinlines
                :src="newUrl"
                format="video/mp4"
              ></video>
            </vue-plyr>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-to-list">
        <router-link :to="`/${getType}/${getId}/`"
          ><b-button type="is-org">Back to List</b-button></router-link
        >
      </div>


      <!-- Side Bar switch button -->
      <div class="menu-button left" v-if="getVideoId != 'video'">
        <a href="#" @click.prevent="handleMenuStatus">
          <i v-if="openMenu == false" class="icon-bar"></i>
          <i v-else class="icon-x"></i>
        </a>
      </div>

      <!-- Side Memu -->
      <div class="side-menu" v-if="getVideoId != 'video'">
        <div
          v-bar="{
            preventParentScroll: true,
            scrollThrottle: 30,
          }"
          id="scroll-thick"
        >
          <div class="side-menu__inner">
            <h3 class="side-menu__title">
              <span>Video for Service Category</span>
            </h3>
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
                  <router-link
                    :to="`/${getType}/${getId}/${result.id}`"
                    v-if="result.active === true"
                    @click.native="updateUrl(result.id)"
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
                <router-link
                  :to="`/${getType}/${getId}/before`"
                  >Preparation Before Service</router-link
                >
              </div>

              <div
                class="side-menu__item"
                v-for="(data, key) in cateTotal"
                :key="data.id"
              >
                <h2>{{ key }}</h2>
                <div v-for="group in data" :key="group.id">
                  <p v-if="group.active === true">
                    <router-link
                      @click.native="updateUrl(group.id)"
                      :to="`/${getType}/${getId}/${group.id}`"
                      >{{ group.menuTitle.replace("(Device Upgrade)", "") }}
                      <br />
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
        </div>
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
      cateTotal: {},
      openMenu: false,
      newUrl: null,
      player: null,
      isNewMenu: null,
      isInit: true,
      searchBlur: false,
      search: "",
    };
  },
  methods: {
    handleMenuStatus(){
      this.openMenu = !this.openMenu;
      this.$store.dispatch("CHANGESTATUS", {
        status: this.openMenu,
      });

    },
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
        this.cateTotal[item] = returnData;
      });
    },
    updateUrl(id) {
      if (id == "before") {
        this.newUrl = this.getDatas.videoUrl[0];
      } else if (this.isNewMenu && id != "before") {
        this.newUrl = {
          initVideo: this.getDatas.videoUrl[0],
          assembly: this.getDatas.menu.menuList[id].url.assembly,
          dismantle: this.getDatas.menu.menuList[id].url.dismantle,
        };
      } else {
        this.newUrl = this.getDatas.menu[id].videoUrl[0];
      }
    },
    setPlayer() {
      this.isInit = false;
      let currentUrl = event.target.getAttribute("data-url");

      this.player.source = {
        type: "video",
        sources: [
          {
            src: currentUrl,
          },
        ],
      };

      this.player.crrentTime = 0;
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
    getMenuStatue() {
      return this.$store.getters.GET_MENU_STATUS;
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
  created() {
    this.$store.dispatch("COMMITFILTERDATA", {
      deviceId: this.getType,
      id: this.getId,
    });
    this.isNewMenu = this.getDatas.isNewMenu;
    this.getSelectedData();
    this.updateUrl(this.getVideoId)
    this.openMenu = this.getMenuStatue;

    this.marginObject();
  },
  mounted() {
    this.player = this.$refs.plyr.player;
    let initUrl = this.newUrl;
    if (this.isNewMenu && this.isInit) {
      initUrl = this.getDatas.videoUrl[0];
    }
    this.player.source = {
      type: "video",
      sources: [
        {
          src: initUrl,
        },
      ],
    };

    this.player.crrentTime = 0;
  },
};
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

<style>
#scroll-thin .vb-dragger {
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: pointer;
}

#scroll-thin:hover .vb-dragger {
  opacity: 1;
}

.scroll-content.vb-content::-webkit-scrollbar {
  display: none;
}

#scroll-thick {
  height: 100%;
}

#scroll-thick:before {
  content: "";
  position: absolute;
  top: 0%;
  right: 0;
  width: 17px;
  height: 100%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.25);
}
#scroll-thin::-webkit-scrollbar,
#scroll-thick::-webkit-scrollbar {
  display: none;
}

#scroll-thick .vb-dragger {
  width: 17px !important;
  background: #909090;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 5px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(144, 144, 144);
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(144, 144, 144);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(144, 144, 144);
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(144, 144, 144);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(144, 144, 144);
}
</style>

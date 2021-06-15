<template>
  <div class="page video-page">
    <VideoHasSideMenu v-if="this.getVideoId !== 'video'"></VideoHasSideMenu>
    <div v-else class="main-box">
      <div class="container">
        <h3 class="title is-4 is-spaced bd-anchor-title">
          <span class="bd-anchor-name">
            {{ getDatas.datas.title.replace("GETAC ", "") }}
          </span>
        </h3>

        <div
          v-for="(video, index) in getDatas.datas.videoUrl"
          :key="index"
          class="resp-video"
        >
          <iframe
            width="100%"
            height="600"
            :src="`https://www.youtube.com/embed/${video}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Back to List -->
      <div class="back-to-list">
        <router-link :to="`/`"
          ><b-button style="max-width: 140px" type="is-org"
            >Back to Home</b-button
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import VideoHasSideMenu from "./VideoHasSideMenu.vue";
export default {
  data() {
    return {};
  },
  components: {
    VideoHasSideMenu,
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
  },
  created() {
    this.$store.dispatch("COMMITFILTERDATA", {
      deviceId: this.getType,
      productId: this.getId,
    });
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


.resp-video+.resp-video
  margin-top: 50px
</style>

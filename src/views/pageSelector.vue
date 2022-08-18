<template>
  <div>
    <div class="card-image">
      <figure class="image">
        <img :src="getURL(item.version[code].imgSrc)" />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="aselect">
            <div
              class="selector"
              ref="customDropdown"
              @click="toggleDropdown()"
              @blur="closeDropDown()"
              tabindex="0"
            >
              <div class="label">
                <span>{{ `${item.version[code].id}`.toUpperCase() }}</span>
              </div>
              <div class="arrow" :class="{ expanded: visible }"></div>
              <div :class="{ hidden: !visible, visible }">
                <ul>
                  <li
                    :class="{ current: option.id === code }"
                    v-for="(option, index) in options"
                    :value="option.id"
                    :key="option.id"
                    @click="select(index)"
                  >
                    <span>{{ `${option.id}`.toUpperCase() }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="buttons">
            <router-link
              v-if="options[code].status === 'open'"
              class="link"
              :to="getEnterURL"
              ><b-button type="is-org" expanded>Enter</b-button></router-link
            >
            <span v-else class="note"></span>
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
      code: 0,
      visible: false,
    };
  },
  props: {
    options: Array,
    item: Object,
    device: String,
    menuType: Boolean,
    itemLength: Number,
  },
  methods: {
    toggleDropdown() {
      this.visible = !this.visible;
    },
    closeDropDown() {
      this.visible = false;
    },
    select(option) {
      this.code = option;
      let newURL = this.getEnterURL;
      let newState = this.options[this.code].status;
      if (newState == "open") {
        setTimeout(() => {
          this.$router.push({ path: newURL });
        }, 500);
      }
    },
    getURL(val) {
      return require(`./../assets/images/${val}`);
    },
  },
  computed: {
    getEnterURL() {
      return `/${this.device}/${
        this.options[this.code].id ? this.options[this.code].id : ""
      }/${this.options[this.code].isOld ? "video" : ""}`;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="sass">
@import '../assets/web.style'

.card-image
  padding-bottom: 0

.select-style
  margin-bottom: 17px

span.note
  max-width: 140px
  opacity: .8
  pointer-events: none
  min-height: 40px

.media-content
  overflow: initial !important

.media-content .title
  margin-bottom: 25px
  color: $color

select,option
  text-transform: uppercase
</style>

<style scoped lang="scss">
.aselect {
  width: 100%;
  max-width: 200px;
  margin: 20px auto;

  .selector {
    border: 1px solid #c5c5c5;
    background: #fff;
    position: relative;
    z-index: 1;
    padding-right: 20px;

    text-align: left;
    &:focus {
      border: 2px solid #000;
      border-radius: 5px;
    }
    .arrow {
      position: absolute;
      right: 12px;
      top: 45%;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #000;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
    .label {
      display: block;
      color: #707070;
      font-weight: normal;
      font-size: 18px;
      font-family: "Arial";
      line-height: 40px;
      padding-left: 10px;
      margin: 0;
    }
  }
  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #fff;
  }
  li {
    padding: 8px 10px;
    color: #666;
    &:hover {
      background: #ececec;
    }
    &.current:hover {
      background: #d3461e;
    }
  }
  .current {
    color: white;
    background: #d3461e;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}
</style>

<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="item.version[code].imgSrc" />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content" v-if="itemLength > 1">
          <div class="select-style">
            <select name="" id="" @change="productOnChange($event)">
              <option
                :value="option.id"
                v-for="option in options"
                :key="option.verId"
                :selected="option.id === 0"
                >{{ item.product }} - {{ option.verId }}</option
              ></select
            >
          </div>
          <div class="buttons">
            <router-link
              v-if="options[code].status != 'pending'"
              :to="
                `/${device}/${item.product}-${options[code].verId}/${
                  options[code].isOld ? 'video' : ''
                }`
              "
              ><b-button type="is-org" expanded>Enter</b-button></router-link
            >
            <span class="note" v-else>Coming soon</span>
          </div>
        </div>

        <div class="media-content" v-else>
          <p class="title is-4">
            {{ item.product }}
          </p>

          <div class="buttons">
            <router-link
              :to="
                `/${item.name}/${item.product}/${
                  item.version[0].isOld ? 'video' : ''
                }`
              "
              ><b-button type="is-org" expanded>Enter</b-button></router-link
            >
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
      code: 0,
    };
  },
  props: {
    options: Array,
    item: Object,
    device: String,
    itemLength: Number,
  },
  methods: {
    productOnChange(event) {
      this.code = event.target.value;
    },
  },
};
</script>
<style scoped lang="sass">
@import '../assets/web.style'

.select-style
  margin-bottom: 17px

span.note
  max-width: 140px
  opacity: .8
  pointer-events: none
  min-height: 40px

.media-content .title
  margin-bottom: 25px
  color: $color
</style>

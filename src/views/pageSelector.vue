<template>
  <div>
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
      <router-link :to="`/${device}/${item.product}-${options[code].verId}/`"
        ><b-button type="is-org" expanded>Enter</b-button></router-link
      >
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
</style>

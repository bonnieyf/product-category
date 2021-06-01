import Vue from "vue";
import datas from "@/assets/datas.json";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    productDatas: datas,
    filterData: {},
    categoryFilterSelected: "All",
    categoriesList: [],
  },
  mutations: {
    FILTER_CATEGORYLIST: (state, payload) => {
      let deviceId = payload.deviceId === "tablets" ? 1 : 0;
      let productId = state.productDatas.datas[deviceId].datas.findIndex(
        (s) => s.id === payload.productId
      );

      let datas = state.productDatas.datas[deviceId].datas[productId];

      state.filterData = {
        deviceId,
        productId,
        datas,
      };
    },
  },
  actions: {
    COMMITFILTERDATA: (context, payload) => {
      context.commit("FILTER_CATEGORYLIST", payload);
    },
  },
  getters: {
    GET_DATAS: (state) => {
      return state.productDatas.datas;
    },
    GET_SELECTD_CATE: (state) => {
      return state.categoryFilterSelected;
    },
    GET_FIRST_CATE: (state) => {
      let categories = [];
      state.filterData.datas["menu"].forEach((link) => {
        let getFirstLetter = link.menuTitle.toUpperCase().charAt(0);
        categories.push(getFirstLetter);
      });

      categories = [...new Set(categories.sort())];

      return categories;
    },
  },
});

export default store;

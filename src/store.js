import Vue from "vue";
import datas from "@/assets/datas.json";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    productDatas: datas.datas,
    productList: datas.productList,
    filterData: {},
    categoryFilterSelected: "All",
    categoriesList: [],
    menuStatus: false
  },
  mutations: {
    FILTER_CATEGORYLIST: (state, payload) => {
      let newData = state.productDatas.filter(
        item => item.id === payload.id
      );

      state.filterData = newData[0];
    },
    CHANGE_STATUS: (state, payload) => {
      state.menuStatus = payload.status;
    },

  },
  actions: {
    COMMITFILTERDATA: (context, payload) => {
      context.commit("FILTER_CATEGORYLIST", payload);
    },
    CHANGESTATUS: (context, payload) => {
      context.commit("CHANGE_STATUS", payload);
    },
  },
  getters: {
    GET_DATAS: (state) => {
      return state.productDatas;
    },
    GET_LIST: (state) => {
      return state.productList;
    },
    GET_SELECTD_CATE: (state) => {
      return state.categoryFilterSelected;
    },
    GET_MENU_STATUS: (state) => {
      return state.menuStatus;
    },
    GET_FIRST_CATE: (state) => {
      let categories = [];
      let isNewMenu = state.filterData.isNewMenu;
      let element = state.filterData.menu;
      if (isNewMenu) {
        element = state.filterData.menu.menuList;
      }
      // console.log(element)
      element.forEach((link) => {
        let getFirstLetter = link.menuTitle.toUpperCase().charAt(0);
        categories.push(getFirstLetter);
      });

      categories = [...new Set(categories.sort())];
      return categories;
    },
  },
});

export default store;

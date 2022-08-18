"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _datas = _interopRequireDefault(require("@/assets/datas.json"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    productDatas: _datas["default"].datas,
    productList: _datas["default"].productList,
    filterData: {},
    categoryFilterSelected: "All",
    categoriesList: []
  },
  mutations: {
    FILTER_CATEGORYLIST: function FILTER_CATEGORYLIST(state, payload) {
      var newData = state.productDatas.filter(function (item) {
        return item.id === payload.id;
      });
      state.filterData = newData[0];
    }
  },
  actions: {
    COMMITFILTERDATA: function COMMITFILTERDATA(context, payload) {
      context.commit("FILTER_CATEGORYLIST", payload);
    }
  },
  getters: {
    GET_DATAS: function GET_DATAS(state) {
      return state.productDatas;
    },
    GET_LIST: function GET_LIST(state) {
      return state.productList;
    },
    GET_SELECTD_CATE: function GET_SELECTD_CATE(state) {
      return state.categoryFilterSelected;
    },
    GET_FIRST_CATE: function GET_FIRST_CATE(state) {
      var categories = [];
      var isNewMenu = state.filterData.isNewMenu;
      var element = state.filterData.menu;

      if (isNewMenu) {
        element = state.filterData.menu.menuList;
      }

      console.log(element);
      element.forEach(function (link) {
        var getFirstLetter = link.menuTitle.toUpperCase().charAt(0);
        categories.push(getFirstLetter);
      });
      categories = _toConsumableArray(new Set(categories.sort()));
      return categories;
    }
  }
});
var _default = store;
exports["default"] = _default;
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _buefy = _interopRequireDefault(require("buefy"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

require("buefy/dist/buefy.css");

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _vuescrollNative = _interopRequireDefault(require("vuescroll/dist/vuescroll-native"));

require("vuescroll/dist/vuescroll.css");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _vueFontawesome = require("@fortawesome/vue-fontawesome");

var _vuePlyr = _interopRequireDefault(require("vue-plyr"));

require("vue-plyr/dist/vue-plyr.css");

var _vuebar = _interopRequireDefault(require("vuebar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import VueGtag from "vue-gtag";
_vue["default"].use(_vuebar["default"]);

_vue["default"].use(_buefy["default"]);

_vue["default"].use(_vuescrollNative["default"]);

_vue["default"].use(_vuePlyr["default"], {
  plyr: {}
});

_vue["default"].config.productionTip = false;

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

_vue["default"].component("font-awesome-icon", _vueFontawesome.FontAwesomeIcon);

_vue["default"].use(_vueRouter["default"]); // Vue.use(VueGtag, {
//   config: {
//     id: "UA-225899724-1"
//   },
//   params: {
//     send_page_view: false
//   }
// }, router);


new _vue["default"]({
  store: _store["default"],
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");
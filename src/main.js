import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import VueRouter from "vue-router";
import "buefy/dist/buefy.css";
import router from "./router";
import store from "./store";

import vuescroll from "vuescroll/dist/vuescroll-native";
import "vuescroll/dist/vuescroll.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import VueGtag from "vue-gtag";

Vue.use(Buefy);
Vue.use(vuescroll);



Vue.use(VuePlyr, {
  plyr: {},
});
Vue.config.productionTip = false;

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueRouter);

Vue.use(VueGtag, {
  config: { id: "UA-225899724-1" },
  params: {
    send_page_view: false
  }
} ,router);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

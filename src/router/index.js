import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Type from "../views/Type";
import Video from "../views/Video";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:type/:id",
    name: "Type",
    component: Type,
  },
  {
    path: "/:type/:id/:videoId",
    name: "Video",
    component: Video,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({
      behavior: 'smooth'
    });
  }
});

export default router;

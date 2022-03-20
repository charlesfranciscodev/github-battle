import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/battle",
    name: "Battle",
    component: () => import("../views/Battle.vue")
  },
  {
    path: "/popular",
    name: "Popular",
    component: () => import("../views/Popular.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

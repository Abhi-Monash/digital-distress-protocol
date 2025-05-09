import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"; // ✅ import added

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/intro",
    name: "IntroPage",
    component: () => import("../views/IntroPageView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // ✅ using hash mode
  routes,
});

export default router; // ✅ export it to be used in main.js

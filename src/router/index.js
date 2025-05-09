import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IntroPageView from "../views/IntroPageView.vue"; // ✅ import the component

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/intro",
    name: "IntroPage", // ✅ this name must match exactly
    component: IntroPageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

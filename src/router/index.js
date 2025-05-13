import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IntroPageView from "../views/IntroPageView.vue"; // ✅ import the component
import CareProviderForm from "../views/CareProviderForm.vue";
import CategoryAForm from "../views/CategoryAForm.vue";
import ActionsForFacilitators from "@/views/ActionsForFacilitators.vue";
import CategoryBForm from "@/views/CategoryBForm.vue";
import CategoryCForm from "@/views/CategoryCForm.vue";

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
  {
    path: "/care-provider",
    name: "CareProviderForm",
    component: CareProviderForm,
  },
  {
    path: "/category-a",
    name: "CategoryAForm",
    component: CategoryAForm,
  },
  {
    path: "/actions",
    name: "ActionsForFacilitators",
    component: ActionsForFacilitators,
  },
  {
    path: "/category-b",
    name: "CategoryBForm",
    component: CategoryBForm,
  },
  {
    path: "/category-c",
    name: "CategoryCForm",
    component: CategoryCForm,
  },
  {
    path: "/category-d",
    name: "CategoryDForm",
    component: () => import("../views/CategoryDForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

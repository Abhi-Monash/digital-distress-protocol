import { createApp } from "vue";
import App from "./App.vue"; // ✅ Import App.vue here
import router from "./router"; // if you're using Vue Router

createApp(App).use(router).mount("#app");

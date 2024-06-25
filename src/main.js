import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import "quasar/dist/quasar.css";
import pinia from "./store";

createApp(App)
  .use(router)
  .use(pinia)
  .use(Quasar, { plugins: {} })
  .mount("#app");

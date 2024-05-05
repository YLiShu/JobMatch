import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "./store/index";
import router from "./router";
import "element-plus/dist/index.css";
import "./style.css";
import { registerGlobalComponents } from "./global-components";

const app = createApp(App);

setupStore(app);
registerGlobalComponents(app);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title as string || 'Job Match!';
  next();
});

app.use(router);

app.mount("#app");

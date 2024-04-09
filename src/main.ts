import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import "./style.css";
import { registerGlobalComponents } from "./global-components";

const app = createApp(App);
const pinia = createPinia();
registerGlobalComponents(app);

app.use(pinia);
app.use(router);
app.mount("#app");

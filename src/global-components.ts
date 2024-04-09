import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "./components/SvgIcon/index.vue";

export const registerGlobalComponents = (app: any): void => {
    Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
        app.component(key, component);
    });

    app.component("SvgIcon", SvgIcon);
};

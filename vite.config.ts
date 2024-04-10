import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { svgBuilder } from "./src/utils/tools/svgBuilder";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        svgBuilder("./src/assets/svg/"),
    ],
    server: {
        proxy: {
            "/location": {
                target: "http://api.map.baidu.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/location/, ""),
            },
        },
    },
});

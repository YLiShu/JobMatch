import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login/index.vue";
import Home from "../views/Home/index.vue";
import JobDetail from "../views/JobDetail/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/jobdetail",
        name: "JobDetail",
        component: JobDetail,
    },
    {
        path: "/resume",
        name: "Resume",
        component: () => import("../views/Resume/index.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

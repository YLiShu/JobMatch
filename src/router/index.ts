import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "../store/modules/user";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home/index.vue"),
    },
    {
        path: "/job-detail",
        name: "JobDetail",
        component: () => import("../views/JobDetail/index.vue"),
    },
    {
        path: "/job-recommend",
        name: "JobRecommend",
        component: () => import("../views/JobRecommend/index.vue"),
    },
    {
        path: "/job-search",
        name: "JobSearch",
        component: () => import("../views/JobSearch/index.vue"),
    },
    {
        path: "/resume",
        name: "Resume",
        component: () => import("../views/Resume/resume-view.vue"),
        meta: {
            title: "我的简历",
        },
    },
    {
        path: "/resume-edit",
        name: "ResumeEdit",
        component: () => import("../views/Resume/resume-edit.vue"),
        meta: {
            title: "编辑简历",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login/index.vue"),
    },
    {
        path: "/message",
        name: "Message",
        component: () => import("../views/Message/index.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (!token && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }
});

export default router;

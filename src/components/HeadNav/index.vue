<template>
    <div id="header" :class="{ 'fixed-top': isFixed }">
        <div class="header-container">
            <div class="left">
                <div class="brand">
                    <router-link to="/" title="JobMatch">JobMatch</router-link>
                </div>
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li
                            class="nav-list-item"
                            :class="{ active: $route.path === '/' }"
                        >
                            <router-link to="/">首页</router-link>
                        </li>
                        <li
                            class="nav-list-item"
                            :class="{ active: $route.path === '/job-search' }"
                        >
                            <router-link to="/job-search">搜索</router-link>
                        </li>
                        <li
                            class="nav-list-item"
                            :class="{
                                active: $route.path === '/job-recommend',
                            }"
                        >
                            <router-link to="/job-recommend"
                                >推荐职位</router-link
                            >
                        </li>
                        <!-- <li class="nav-list-item"><router-link to="/companies">公司</router-link></li> -->
                    </ul>
                </nav>
            </div>
            <div class="right">
                <div class="auth-nav" v-if="!isLoggedIn">
                    <button class="auth-button" @click="handleShowLoginDialog">
                        登录/注册
                    </button>
                </div>
                <div class="user-profile" v-if="isLoggedIn" @click="gotoResume">
                    <div class="user-avatar">
                        <img :src="userAvatar" :alt="userName" />
                    </div>
                    <div class="user-name">{{ userName }}</div>
                </div>
            </div>
        </div>
    </div>
    <LoginDialog
        :isShowLoginDialog="isShowLoginDialog"
        @goToRegister="handleRegisterDialog"
        @loginSuccess="handleLoginSuccess"
        @closeLoginDialog="handleCloseLoginDialog"
    />
    <RegisterDialog
        :isShowRegisterDialog="isShowRegisterDialog"
        @goToLogin="handleShowLoginDialog"
        @closeRegisterDialog="handleCloseRegisterDialog"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LoginDialog from "../LoginDialog/index.vue";
import RegisterDialog from "../RegisterDialog/index.vue";
import { getUserInfo } from "../../api/user";
import router from "../../router";

defineProps<{ isFixed: boolean }>();

const isShowLoginDialog = ref(false);
const handleShowLoginDialog = () => {
    isShowLoginDialog.value = true;
};
const handleCloseLoginDialog = () => {
    isShowLoginDialog.value = false;
};

const isShowRegisterDialog = ref(false);
const handleRegisterDialog = () => {
    isShowLoginDialog.value = false;
    isShowRegisterDialog.value = true;
};
const handleCloseRegisterDialog = () => {
    isShowRegisterDialog.value = false;
};

const userAvatar = ref("");
const userName = ref("");
const isLoggedIn = ref(Boolean(localStorage.getItem("TOKEN_KEY")));

const fetchUserInfo = async () => {
    try {
        const { data } = await getUserInfo();
        const { user } = data;

        userAvatar.value = `http://162.14.111.43:8080/${user.faceImageBig}`;
        userName.value = user.nickname;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    if (isLoggedIn.value) {
        fetchUserInfo();
    }
});

const gotoResume = () => {
    router.push("/resume");
};

const handleLoginSuccess = () => {
    isLoggedIn.value = true;
    fetchUserInfo();
};
</script>

<style lang="scss" scoped>
#header {
    background: linear-gradient(135deg, #090808 0%, #003d50 100%);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    z-index: 9999;
    font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;

    &.fixed-top {
        position: fixed;
        top: 0;
    }
}

.header-container {
    display: flex;
    align-items: center;
    height: 50px;
    margin: 0 auto;
    width: 1200px;

    .left {
        flex: 1;
        padding: 0 20px;
        height: 100%;
        align-items: center;
        display: flex;

        .brand a {
            margin-right: 60px;
            color: #fff;
            font-size: 1.5rem;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
            font-family: "Consoals", "Microsoft YaHei", Helvetica, Arial,
                sans-serif;

            &:hover {
                color: #3cb8b7;
            }
        }

        .main-nav .nav-list {
            list-style: none;
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;

            .nav-list-item {
                font-size: 14px;
                margin: 5px 10px;
                font-weight: bold;
                border-radius: 5px;
                transition: all 0.3s ease;
                cursor: pointer;

                &:hover {
                    background-color: #00bebd;
                }

                a {
                    display: inline-block;
                    padding: 5px 15px;
                    color: #fff;
                    text-decoration: none;
                }

                &.active {
                    background-color: #00bebd;
                }
            }
        }
    }

    .right {
        flex: 1;
        padding: 0 20px;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: flex-end;

        .auth-nav {
            display: flex;
            align-items: center;

            .auth-button {
                background-color: transparent;
                border: 1px solid #fff;
                border-radius: 6px;
                color: #fff;
                margin: 0 5px;
                padding: 5px 15px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    border: 1px solid #00cdcb;
                    background-color: rgba(61, 199, 197, 0.2);
                }
            }
        }

        .user-profile {
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover .user-name {
                color: #00bebd;
            }

            .user-avatar {
                border-radius: 50%;
                width: 35px;
                height: 35px;
                overflow: hidden;
                margin-right: 10px;
                border: 1px solid #00bebd;

                img {
                    height: 100%;
                    width: 100%;
                }
            }

            .user-name {
                color: #fff;
                font-size: 14px;
                font-weight: 700;
            }
        }
    }
}
</style>
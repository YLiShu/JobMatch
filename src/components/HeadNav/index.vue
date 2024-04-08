<template>
    <div id="header" :class="{ 'fixed-top': isFixed }">
        <div class="header-container">
            <div class="left">
                <div class="brand">
                    <router-link to="/" title="JobMatch">JobMatch</router-link>
                </div>
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li class="nav-list-item active">
                            <router-link to="/">首页</router-link>
                        </li>
                        <li class="nav-list-item">
                            <router-link to="/search">搜索</router-link>
                        </li>
                        <li class="nav-list-item">
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
                    <button class="auth-button" @click="goToLogin">
                        登录/注册
                    </button>
                </div>
                <div class="user-profile" v-if="isLoggedIn">
                    <div class="user-avatar">
                        <img :src="userAvatar" :alt="userName" />
                    </div>
                    <div class="user-name">{{ userName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ isFixed: boolean }>();

const isLoggedIn = ref(false);
const userAvatar = ref("https://avatars.githubusercontent.com/u/101794864?v=4"); // 用户头像URL
const userName = ref("黎曙");
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
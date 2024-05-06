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
                <div class="user-profile" v-if="isLoggedIn">
                    <div class="user-avatar" @click="triggerUpload">
                        <img :src="userAvatar" :alt="userName" />
                        <input
                            type="file"
                            ref="fileInput"
                            @change="uploadAvatar"
                            style="display: none"
                        />
                    </div>
                    <div class="user-name" @click="gotoResume">
                        {{ userName }}
                    </div>
                    <div class="logout-btn" @click="handleLogOut">退出登录</div>
                </div>
            </div>
        </div>
    </div>
    <LoginDialog
        v-if="isShowLoginDialog"
        :isShowLoginDialog="isShowLoginDialog"
        @goToRegister="handleRegisterDialog"
        @closeLoginDialog="handleCloseLoginDialog"
    />
    <RegisterDialog
        v-if="isShowRegisterDialog"
        :isShowRegisterDialog="isShowRegisterDialog"
        @goToLogin="handleShowLoginDialog"
        @closeRegisterDialog="handleCloseRegisterDialog"
    />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ElMessageBox } from "element-plus";
import LoginDialog from "../LoginDialog/index.vue";
import RegisterDialog from "../RegisterDialog/index.vue";
import messageHelper from "../../utils/tools/message";
import { useUserStore } from "../../store/modules/user";
import router from "../../router";

defineProps<{ isFixed: boolean }>();

const userStore = useUserStore();
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

const userAvatar = computed(
    () => `http://162.14.111.43:8080/${userStore.userInfo.user.faceImageBig}`
);
const userName = computed(() => userStore.userInfo?.user.nickname);
const isLoggedIn = computed(() => Boolean(userStore.token));

const gotoResume = () => {
    router.push("/resume");
};

const fileInput = ref(null);

const triggerUpload = () => {
    (fileInput.value as unknown as HTMLInputElement).click();
};

const uploadAvatar = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 2 * 1024 * 1024;
    const validTypes = ["image/jpeg", "image/png"];

    if (file.size > maxSize) {
        messageHelper.warning("文件过大，请上传小于2MB的文件。");
        return;
    }

    if (!validTypes.includes(file.type)) {
        messageHelper.warning("不支持的文件类型。请上传JPEG或PNG格式的图片。");
        return;
    }

    try {
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result as string;
            try {
                await userStore.updatedAvatar({
                    userId: userStore.userInfo!.user.userId,
                    faceData: base64Image,
                });
                messageHelper.success("上传成功！");
            } catch (uploadError) {
                console.error("上传失败：", uploadError);
                messageHelper.error("上传失败，请稍后再试。");
            }
        };
        reader.onerror = (readError) => {
            console.error("读取文件出错：", readError);
            messageHelper.error("无法读取图片，请尝试使用其他图片。");
        };

        reader.readAsDataURL(file);
    } catch (error) {
        console.error(error);
        messageHelper.error("上传过程中发生错误。");
    }
};

const handleLogOut = () => {
    ElMessageBox.confirm("确定要退出登录吗？", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            userStore.logOut();
        })
        .catch(() => {});
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

            .user-avatar {
                border-radius: 50%;
                width: 35px;
                height: 35px;
                overflow: hidden;
                margin-right: 10px;
                border: 1px solid #666;

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

            &:hover {
                .logout-btn {
                    opacity: 1;
                    background-image: linear-gradient(
                        to right,
                        #ff416c,
                        #ff4b2b
                    );
                }

                .user-name {
                    color: #00bebd;
                }
            }
            .logout-btn {
                margin-left: 15px;
                align-items: center;
                border: 1px solid #c10808;
                border-radius: 8px;
                color: #fff;
                background: #c10808;
                cursor: pointer;
                font-size: 14px;
                height: 36px;
                font-weight: 700;
                justify-content: center;
                width: 100px;
                display: flex;
                opacity: 0;
                transition: all 0.3s ease;
            }
        }
    }
}
</style>


<template>
    <div class="container" ref="containerRef">
        <LoginDialog
            v-if="isShowLoginDialog"
            :is-show-login-dialog="isShowLoginDialog"
            @login-success="handleLoginSuccess"
            @go-to-register="handleRegisterDialog"
        />
        <RegisterDialog
            v-if="isShowRegisterDialog"
            :is-show-register-dialog="isShowRegisterDialog"
            @go-to-login="handleShowLoginDialog"
            @close-register-dialog="handleCloseRegisterDialog"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import LoginDialog from "../../components/LoginDialog/index.vue";
import RegisterDialog from "../../components/RegisterDialog/index.vue";
import router from "../../router";
import { useUserStore } from "../../store/modules/user";

const isShowLoginDialog = ref(true);
const isShowRegisterDialog = ref(false);
const userStore = useUserStore();
const isLoggedIn = computed(() => Boolean(userStore.token));

const handleShowLoginDialog = () => {
    isShowLoginDialog.value = true;
};

const handleRegisterDialog = () => {
    isShowLoginDialog.value = false;
    isShowRegisterDialog.value = true;
};

const handleCloseRegisterDialog = () => {
    isShowRegisterDialog.value = false;
    isShowLoginDialog.value = true;
};

const handleLoginSuccess = () => {
    router.push("/");
};
onMounted(() => {
    if (isLoggedIn) {
        handleLoginSuccess();
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: linear-gradient(180deg, #00bebd 0, #e8fafa 50%, #f9f9f9 100%);
}
</style>
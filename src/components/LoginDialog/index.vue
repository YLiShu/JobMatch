<template>
    <div class="login-dialog">
        <el-dialog
            destroy-on-close
            :model-value="isShowLoginDialog"
            :show-close="false"
            align-center
            @close="closeDialog"
        >
            <template #header>
                <button type="button" class="close-btn" @click="closeDialog">
                    <SvgIcon name="close" size="20" />
                </button>
            </template>

            <div class="login-content">
                <div class="login-title">
                    <div class="login-logo">
                        <SvgIcon name="logo" size="80" />
                    </div>
                    <span>登录</span>
                </div>
                <el-form
                    @submit.prevent
                    ref="ruleFormRef"
                    :model="loginForm"
                    :rules="loginRules"
                    size="large"
                    class="login-form"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="loginForm.username"
                            placeholder="请输入账号"
                            clearable
                            @clear="clearPassword"
                        >
                            <template #prefix>
                                <el-icon class="icon"><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            show-password
                            placeholder="请输入密码"
                            clearable
                            @keyup.enter="handleLogin"
                        >
                            <template #prefix>
                                <el-icon class="icon"><Lock /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="agreement" class="agreement">
                        <el-checkbox v-model="loginForm.agreement"
                            ><span
                                >我已阅读并同意 <a href="#">用户协议</a> 和
                                <a href="#">隐私条款</a></span
                            ></el-checkbox
                        >
                    </el-form-item>
                    <button class="login-btn" @click="handleLogin">登录</button>
                    <div class="register-link">
                        <span>还没有账号？</span
                        ><a href="#" @click="handleRegister">点我注册</a>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { loginRules } from "../../utils/tools/rule";
import { ElMessage, type FormInstance } from "element-plus";
import { login } from "../../api/user/index";

const ruleFormRef = ref<FormInstance>();
const props = defineProps({
    isShowLoginDialog: {
        type: Boolean,
        required: true,
    },
});

const loginForm = reactive({
    username: "",
    password: "",
    agreement: false,
});

const clearPassword = () => {
    loginForm.password = "";
};

const handleLogin = async () => {
    try {
        await ruleFormRef.value!.validate();
        const { data } = await login(loginForm);
        localStorage.setItem("TOKEN_KEY", data as string);
        ElMessage({
            message: "登陆成功",
            type: "success",
        });
        closeDialog();
        emit("loginSuccess");
    } catch (error) {
        console.log(error);
    }
};

const emit = defineEmits(["closeLoginDialog", "goToRegister", "loginSuccess"]);

const resetForm = () => {
    loginForm.agreement = false;
    loginForm.username = "";
    loginForm.password = "";
};

const closeDialog = () => {
    resetForm();
    emit("closeLoginDialog");
};

const handleRegister = () => {
    emit("goToRegister");
};
</script>

<style scoped lang="scss">
.login-dialog {
    user-select: none;
    &:deep() {
        .el-dialog {
            height: 450px;
            border-radius: 12px;
            padding: 0;
            overflow: hidden;
            width: 450px;
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        }

        .el-dialog__header {
            padding: 0px;
            height: 0px;
        }

        .el-dialog__body {
            padding: 0 !important;
            height: 100%;
            color: #606266;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            word-break: break-all;
        }
    }

    .close-btn {
        background: none;
        z-index: 999;
        border: none;
        cursor: pointer;
        font-size: 16px;
        outline: 0;
        padding: 0;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .login-content {
        height: 100%;
        width: 100%;
        padding: 40px;

        &:deep() {
            &.el-input__wrapper {
                border-radius: 8px;

                &.is-focus {
                    box-shadow: 0 0 0 1px #00bebd inset;
                }
            }

            &.el-input__inner {
                font-weight: 700;
            }

            &.el-checkbox__input.is-checked .el-checkbox__inner {
                background-color: #00bebd;
                border-color: #00bebd;
            }

            &.el-checkbox__inner:hover {
                border: 1px solid #00bebd;
            }

            &.el-checkbox__input.is-checked + .el-checkbox__label {
                color: #81d6d6;
            }
        }

        .login-title {
            position: relative;
            color: #00bebd;
            font-size: 24px;
            font-weight: 600;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            .login-logo {
                height: 80px;
                position: absolute;
                left: 50%;
                transform: translate(-50%, -50%);
                top: 50%;
            }

            span {
                display: inline-block;
                width: 80px;
            }
        }

        .login-form {
            .icon {
                color: #c0c4cc;
            }

            .toggle-password {
                cursor: pointer;
            }

            .login-btn {
                border-radius: 8px;
                border-width: 0;
                color: #fff;
                font-size: 14px;
                height: 40px;
                width: 100%;
                margin-top: 12px;
                background-color: #00bebd;
                border-color: #00bebd;
            }
        }

        .agreement {
            display: flex;
            a {
                color: #00bebd;
            }
        }

        .register-link {
            margin-top: 20px;
            text-align: center;
            span {
                color: #606266;
                margin-right: 5px;
            }
            a {
                color: #00bebd;
                cursor: pointer;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
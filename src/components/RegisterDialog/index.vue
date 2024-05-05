<template>
    <div class="register-dialog">
        <el-dialog
            destroy-on-close
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :model-value="isShowRegisterDialog"
            :show-close="false"
            align-center
            @close="closeDialog"
        >
            <template #header>
                <button type="button" class="close-btn" @click="closeDialog">
                    <SvgIcon name="close" size="20" />
                </button>
            </template>

            <div class="register-content">
                <div class="register-title">
                    <div class="register-logo">
                        <SvgIcon name="logo" size="80" />
                    </div>
                    <span>注册</span>
                </div>
                <el-form
                    @submit.prevent
                    ref="ruleFormRef"
                    :model="registerForm"
                    :rules="registerRules"
                    size="large"
                    class="register-form"
                >
                    <div class="first-step" v-if="isFirstStep">
                        <el-form-item prop="phone">
                            <el-input
                                v-model="registerForm.phone"
                                placeholder="请输入手机号"
                                clearable
                            >
                                <template #prefix>
                                    <el-icon class="icon"><Iphone /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha" class="register-captcha">
                            <el-input
                                class="register-captcha-input"
                                v-model="registerForm.captcha"
                                placeholder="请输入图片验证码"
                                clearable
                            >
                                <template #prefix>
                                    <el-icon class="icon"
                                        ><Promotion
                                    /></el-icon>
                                </template>
                            </el-input>
                            <img
                                @click="getCaptcha"
                                class="register-captcha-img"
                                :src="captchaSrc"
                                alt="图片验证码"
                            />
                        </el-form-item>
                        <button
                            class="next-btn register-form-btn"
                            @click="handleGoNext"
                        >
                            下一步
                        </button>
                    </div>
                    <div class="second-step" v-else>
                        <el-form-item prop="password">
                            <el-input
                                v-model="registerForm.password"
                                show-password
                                placeholder="请输入密码"
                                clearable
                            >
                                <template #prefix>
                                    <el-icon class="icon"><Lock /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input
                                v-model="registerForm.confirmPassword"
                                placeholder="请再次输入密码"
                                clearable
                                show-password
                            >
                                <template #prefix>
                                    <el-icon class="icon"><Lock /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="agreement" class="agreement">
                            <el-checkbox v-model="registerForm.agreement"
                                ><span
                                    >我已阅读并同意
                                    <a href="#" target="_blank">用户协议</a> 和
                                    <a href="#" target="_blank"
                                        >隐私条款</a
                                    ></span
                                ></el-checkbox
                            >
                        </el-form-item>
                        <div class="second-step-btn">
                            <button
                                class="prev-btn register-form-btn"
                                @click="handleGoPrev"
                            >
                                上一步
                            </button>
                            <button
                                class="register-btn register-form-btn"
                                @click="handleRegister"
                            >
                                注册
                            </button>
                        </div>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { registerRules } from "../../utils/tools/rule";
import { ElMessage, type FormInstance } from "element-plus";
import { getCaptchaCode, register } from "../../api/user/index";

const captchaSrc = ref("");
const ruleFormRef = ref<FormInstance>();
const isFirstStep = ref(true);
const registerForm = reactive({
    phone: "",
    captcha: "",
    password: "",
    confirmPassword: "",
    captchaKey: "",
    agreement: false,
});

const getCaptcha = async () => {
    try {
        const { data } = await getCaptchaCode({ captchaToken: 0 });
        captchaSrc.value = data.captcha;
        registerForm.captchaKey = data.key;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    getCaptcha();
});

const handleRegister = async () => {
    try {
        await ruleFormRef.value!.validate();

        const registrationData = {
            mobile: registerForm.phone,
            captchaKey: registerForm.captchaKey,
            captchaCode: registerForm.captcha,
            password: registerForm.password,
            nickName: registerForm.phone,
        };

        const { data, msg } = await register(registrationData);
        if (data === true) {
            ElMessage({
                message: "注册成功",
                type: "success",
            });
            closeDialog();
            emit("goToLogin");
        } else {
            ElMessage({
                message: msg,
                type: "warning",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const handleGoNext = async () => {
    try {
        if (ruleFormRef.value) {
            await ruleFormRef.value.validate();
            isFirstStep.value = false;
        }
    } catch (error) {
        console.log(error);
    }
};

const handleGoPrev = () => {
    isFirstStep.value = true;
};

defineProps({
    isShowRegisterDialog: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["closeRegisterDialog", "goToLogin"]);

const resetForm = () => {
    registerForm.phone = "";
    registerForm.captcha = "";
    registerForm.password = "";
    registerForm.confirmPassword = "";
    registerForm.captchaKey = "";
    registerForm.agreement = false;
};

const closeDialog = () => {
    isFirstStep.value = true;
    resetForm();
    emit("closeRegisterDialog");
};
</script>

<style scoped lang="scss">
.register-dialog {
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

    .register-content {
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

        .register-title {
            position: relative;
            color: #00bebd;
            font-size: 24px;
            font-weight: 600;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            .register-logo {
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

        .register-form {
            .register-captcha {
                .register-captcha-input {
                    flex: 1;
                }

                .register-captcha-img {
                    margin-left: 5px;
                    height: 40px;
                    cursor: pointer;
                }
            }

            .icon {
                color: #c0c4cc;
            }

            .toggle-password {
                cursor: pointer;
            }

            .register-form-btn {
                border-radius: 8px;
                color: #fff;
                font-size: 14px;
                height: 40px;
            }

            .first-step {
                .next-btn {
                    width: 100%;
                    margin-top: 12px;
                    background-color: #00bebd;
                    border: 1px solid #00bebd;
                }
            }

            .second-step-btn {
                display: flex;

                .prev-btn {
                    color: #fff;
                    flex: 1;
                    margin-right: 10px;
                    margin-top: 12px;
                    background-color: #c0c4cc;
                    border: 1px solid #c0c4cc;
                }

                .register-btn {
                    border-radius: 8px;
                    border: 1px solid #00bebd;
                    color: #fff;
                    font-size: 14px;
                    height: 40px;
                    flex: 1;
                    margin-top: 12px;
                    background-color: #00bebd;
                }
            }
        }

        .agreement {
            display: flex;
            a {
                color: #00bebd;
            }
        }
    }
}
</style>
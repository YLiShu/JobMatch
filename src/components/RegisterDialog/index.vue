<template>
    <div class="register-dialog">
        <el-dialog
            destroy-on-close
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
                                class="register-captcha-img"
                                src="data:image/gif;base64,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"
                                alt=""
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
                                placeholder="请确认密码"
                                clearable
                                show-password
                            >
                                <template #prefix>
                                    <el-icon class="icon"><Lock /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <div class="agreement">
                            <el-checkbox v-model="agreement"
                                ><span
                                    >我已阅读并同意
                                    <a href="#" target="_blank">用户协议</a> 和
                                    <a href="#" target="_blank"
                                        >隐私条款</a
                                    ></span
                                ></el-checkbox
                            >
                        </div>
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
import { reactive, ref } from "vue";
import { registerRules } from "../../views/Login/utils/rule";
import { ElMessage, type FormInstance } from "element-plus";
import { register } from "../../api/user/index";

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const isFirstStep = ref(true);
const registerForm = reactive({
    phone: "",
    captcha: "",
    password: "",
    confirmPassword: "",
});

const agreement = ref(false);

const handleRegister = async () => {
    try {
        await ruleFormRef.value!.validate();
        const { data } = await register(registerForm);
        ElMessage({
            message: "注册成功",
            type: "success",
        });
    } catch (error) {}
};

const handleGoNext = () => {
    isFirstStep.value = false;
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

const emit = defineEmits(["closeRegisterDialog"]);

const closeDialog = () => {
    isFirstStep.value = true;
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
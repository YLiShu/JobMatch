<script setup lang="ts">
import { reactive, ref } from "vue";
import { loginRules } from "./utils/rule";
import { ElMessage, type FormInstance } from "element-plus";
import { login } from "../../api/user/index";

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const loginForm = reactive({
  username: "",
  password: "",
});

const passwordType = ref("password");

const clearPassword = () => {
  loginForm.password = "";
};

const handleLogin = async () => {
  loading.value = true;
  try {
    await ruleFormRef.value!.validate();
    const { data } = await login(loginForm);
    localStorage.setItem("TOKEN_KEY", data as unknown as string);
    ElMessage({
      message: "登陆成功",
      type: "success",
    });
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const showPwd = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div class="container">
    <div class="login-form">
      <img
        src="../../assets/login/login_left_img.png"
        alt=""
        class="left-img"
      />
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form-right"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">Hello !</h3>
          <h4 class="title-tips">欢迎来到JobMatch!</h4>
        </div>

        <el-form-item
          :rules="[
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur',
            },
          ]"
          prop="username"
        >
          <el-input
            clearable
            @clear="clearPassword"
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            autocomplete="on"
          >
            <template #prefix>
              <el-icon class="el-input__icon" :size="20"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            autocomplete="on"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon class="el-input__icon" :size="20"><Lock /></el-icon>
            </template>
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <el-icon
              :size="20"
              :color="'#ddd'"
              v-if="passwordType === 'password'"
            >
              <View />
            </el-icon>

            <el-icon :size="20" :color="'#ddd'" v-else>
              <Hide />
            </el-icon>
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.prevent="handleLogin"
          >Login</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.el-form-item__content {
  flex-wrap: nowrap;
  margin-bottom: 20px;
  height: 50px;

  .el-form-item__error {
    margin-top: 2px;
    text-align: left;
  }
}

.el-input {
  height: 100%;

  .el-input__inner {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>

<style lang="scss" scoped>
$login_bg: #fff;
$dark_gray: #889aa4;
$light_black: #515a6e;
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background: url(../../assets/login/background.png) center center fixed
    no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 550px;
    margin: 0 auto;
    border-radius: 15px;
    background-color: $login_bg;
    overflow: hidden;
    padding: 4.5vh;

    .left-img {
      float: left;
      width: 50%;
    }

    .login-form-right {
      float: left;
      width: 45%;
      margin-left: 5%;
    }
  }
  .svg-container {
    padding: 15px 6px;
    color: $dark_gray;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 54px;
      color: $light_black;
      margin: 0px auto 40px auto;
      font-weight: 500;
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: $light_black;
    }
  }

  .show-pwd {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-btn {
    height: 50px;
    width: 100%;
    border-radius: 15px;
    font-size: 20px;
    line-height: 50px;
    font-weight: 900;
  }

  @media only screen and (max-width: 576px) {
    .login-form {
      min-width: 375px;
      width: 85% !important;
      margin: auto !important;
    }

    .login-form .left-img {
      display: none !important;
    }

    .login-form .login-form-right {
      width: 100% !important;
      margin-left: 0;
    }
  }
}
</style>
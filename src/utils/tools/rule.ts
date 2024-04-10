import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";

export const passwordRegexp =
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;

// 共用的密码验证逻辑
const validatePassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("密码不能为空"));
    }
    if (!passwordRegexp.test(value)) {
        return callback(
            new Error("密码格式应为6-18位数字、字母、符号的任意两种组合")
        );
    }
    callback();
};

const validateAgreement = (rule, value, callback) => {
    if (value !== true) {
        return callback(new Error("请阅读并同意用户协议和隐私政策"));
    }
    callback();
};

export const loginRules = reactive<FormRules>({
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: validatePassword, trigger: "blur" },
    ],
    agreement: [
        {
            validator: validateAgreement,
            trigger: "change",
        },
    ],
});

const password = ref("");

export const registerRules = reactive<FormRules>({
    phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1\d{10}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
        },
    ],
    captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                password.value = value;
                return validatePassword(rule, value, callback);
            },
            trigger: "blur",
        },
    ],
    confirmPassword: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("请再次输入密码"));
                }
                callback();
            },
            trigger: "blur",
        },
        {
            validator: (rule, value, callback) => {
                if (value !== password.value) {
                    return callback(new Error("两次输入的密码不一致"));
                }
                callback();
            },
            trigger: "blur",
        },
    ],
    agreement: [
        {
            validator: validateAgreement,
            trigger: "change",
        },
    ],
});

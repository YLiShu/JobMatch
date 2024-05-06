import http from "../../utils/http";
import type {
    CaptchaData,
    CaptchaResult,
    LoginData,
    LoginResult,
    RegisterData,
    RegisterResult,
    UserInfoResponse,
    uploadFaceData,
    uploadFaceResponse,
} from "./types";

export const login = (data: LoginData) => {
    return http.post<LoginResult>("/api/user/loginPost", data);
};

export const getUserInfo = () => {
    return http.get<UserInfoResponse>("/api/user/info");
};

export const register = (data: RegisterData) => {
    return http.post<RegisterResult>("/api/user/registerPost", data);
};

export const getCaptchaCode = (data: CaptchaData) => {
    return http.get<CaptchaResult>("/api/code/getCaptchaCode", data);
};

export const uploadFaceBase64 = (data: uploadFaceData) => {
    return http.post<uploadFaceResponse>("/api/uploadFaceBase64", data);
};

export const getUserResume = () => {
    return http.get("/user/resume")
};

export const updateUserResume = (data: any) => {
    return http.post("/user/resume/update", data);
}
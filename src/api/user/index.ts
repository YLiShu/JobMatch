import http from "../../utils/http";
import type {
    CaptchaData,
    CaptchaResult,
    LoginData,
    LoginResult,
    RegisterData,
    RegisterResult,
    UserInfoResponse,
    FriendsList,
    userId,
    UnsignedMsg,
    acceptUserId,
} from "./types";

export const login = (data: LoginData) => {
    return http.post<LoginResult>("/user/loginPost", data);
};

export const getUserInfo = () => {
    return http.get<UserInfoResponse>("/user/info");
};

export const register = (data: RegisterData) => {
    return http.post<RegisterResult>("/user/registerPost", data);
};

export const getCaptchaCode = (data: CaptchaData) => {
    return http.get<CaptchaResult>("code/getCaptchaCode", data);
};


export const getFriends = (data: userId) => {
    return http.get<FriendsList>("/queryFriendList",data);
};

export const getUnsignedMsg = (data: acceptUserId) => {
    return http.get<UnsignedMsg>("/queryUnsignedMsg",data);
}
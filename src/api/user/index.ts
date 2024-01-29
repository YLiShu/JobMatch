import http from "../../utils/http"
import type { LoginData, LoginResult, UserInfoResponse } from "./types"


export const login = (data: LoginData) => {
    return http.post<LoginResult>('/user/loginPost', data)
}

export const getUserInfo = () => {
    return http.get<UserInfoResponse>('/user/info')
}
import { defineStore } from "pinia";
import {
    LoginData,
    LoginResult,
    UserInfoResponse,
    UserInfo,
    uploadFaceData,
    uploadFaceResponse,
} from "../../api/user/types";
import { login, getUserInfo, uploadFaceBase64 } from "../../api/user";
import store from "../index";

export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null as UserInfo | null,
        token: null as string | null,
    }),
    actions: {
        SET_TOKEN_AND_USERINFO(
            token: string | null,
            userInfo: UserInfo | null
        ) {
            this.token = token;
            this.userInfo = userInfo;
        },

        async loginByUsername(data: LoginData) {
            return new Promise<LoginResult>((resolve, reject) => {
                login(data)
                    .then(async (response) => {
                        const token = response.data;
                        this.SET_TOKEN_AND_USERINFO(token, null);
                        try {
                            const userInfo = await this.getUserInfo();
                            this.SET_TOKEN_AND_USERINFO(token, userInfo.data);
                            resolve(response);
                        } catch (error) {
                            reject(error);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        logOut() {
            this.token = null;
            this.userInfo = null;
            localStorage.removeItem("user");
        },

        async getUserInfo() {
            if (this.token) {
                return new Promise<UserInfoResponse>((resolve, reject) => {
                    getUserInfo()
                        .then((response) => {
                            const data = response.data;
                            this.SET_TOKEN_AND_USERINFO(this.token, data);
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            } else {
                throw new Error("不存在Token，用户未登录！");
            }
        },
        async updatedAvatar(data: uploadFaceData) {
            return new Promise<uploadFaceResponse>((resolve, reject) => {
                uploadFaceBase64(data)
                    .then(async (response) => {
                        const { faceImage, faceImageBig } = response.data;
                        if (this.userInfo) {
                            this.userInfo.user.faceImage = faceImage;
                            this.userInfo.user.faceImageBig = faceImageBig;
                        }
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
    persist: {
        key: "USER_INFO",
    },
});

export function useUserStoreHook() {
    return useUserStore(store);
}

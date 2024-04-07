import { defineStore } from "pinia";
import { LoginResult } from "../../api/user/types";
import { login } from "../../api/user";
import store from "..";

export const useUserStore = defineStore("user", {
    state: () => ({
        // 用户名
        username: "",
    }),

    actions: {
        /* 存储用户名 */
        SET_USERNAME(username: string) {
            this.username = username;
        },
        async loginByUsername(data: any) {
            return new Promise<LoginResult>((resolve, reject) => {
                login(data)
                    .then((data) => {
                        if (data) {
                            // setToken(data.data);
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        logOut() {
            this.username = "";
            // removeToken();
            // router.push("/login");
        },
    },
});

export function useUserStoreHook() {
    return useUserStore(store);
}

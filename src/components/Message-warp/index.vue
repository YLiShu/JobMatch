<template>
    <div class="chat-wrap">
        <!-- 聊天列表 -->
        <div class="list-wrap">
            <div class="chat-user">
                <!-- 筛选 -->
                <!-- <div class="label-list">

                </div> -->
                <div class="chat-content">
                    <div class="user-list">
                        <div class="user-list-content">

                            <ul role="group" style="padding: 0px;">
                                <li role="listitem" v-for="(item, index) in friends.hr" :key="index"
                                    class="user-list-item" @click="" style="height: 78px;">
                                    <div class="friend-content">
                                        <div class="avatar" style="    position: relative;
                                        float: left;
                                        width: 46px;
                                        height: 46px;">
                                            <img
                                                :src="item.friendFaceImage || 'https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp'"></img>

                                        </div>
                                        <div class="text">
                                            <div class="title-box">
                                                <span class="name-box">
                                                    <span class="name">{{ item.friendNickname }}</span>
                                                </span>

                                            </div>

                                        </div>
                                    </div>

                                </li>
                                <li role="listitem" v-for="(item, index) in friends.user" :key="index"
                                    class="user-list-item" @click="" style="height: 78px;">
                                    <div class="friend-content">
                                        <div class="avatar" style="    position: relative;
                                        float: left;
                                        width: 46px;
                                        height: 46px;">
                                            <img
                                                :src="item.friendFaceImage || 'https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp'"></img>

                                        </div>
                                        <div class="text">
                                            <div class="title-box">
                                                <span class="name-box">
                                                    <span class="name">{{ item.friendNickname }}</span>
                                                </span>

                                            </div>

                                        </div>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 聊天会话 -->
        <div class="chat-conversation">
            <div class="top-info">
                <div class="user-info">
                </div>
            </div>
            <!-- 聊天内容 -->
            <div class="message-content">
                <div class="chat-record">
                    <div class="chat-message">

                    </div>
                </div>
                <!-- 聊天内容 -->
            </div>

            <!-- 输入框 -->
            <div class="message-controls">
                <div class="chat-im chat-editor">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="input">

                    </el-input>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inputEmits } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import { getFriends, getUserInfo } from "../../api/user";

const input = ref("")
const userAvatar = ref("");
const isLoggedIn = ref(Boolean(localStorage.getItem("TOKEN_KEY")));
const friends = ref({
    user: [
        {
            userId: 1,
            friendNickname: "张三",
            friendFaceImage: "https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp",
        },
        {
            userId: 2,
            friendNickname: "李四",
            friendFaceImage: "https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp",
        },
    ],
    hr: [{
        userId: 3,
        friendNickname: "王五",
        friendFaceImage: "https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp",
    },]
}
);
const getFriendsList = async () => {

    try {
        const res = await getFriends({ userId: userInfo.value.data.user.userId });
        console.log(res);
        if (res.code === 200) {
            const result = res.data as { user: { userId: number; friendNickname: string; friendFaceImage: string; }[]; hr: { userId: number; friendNickname: string; friendFaceImage: string; }[]; };
            friends.value = result;

        }
    } catch (error) {
        console.log(error);
    }
}

const userInfo = ref()

const UserInfo = async () => {
    try {
        console.log("userInfo");
        userInfo.value = await getUserInfo()
        console.log(userInfo.value.data.user);
        getFriendsList();
    } catch (error) {
        console.log(error);
    }
}


const sendMessage = () => {
    console.log(input);
}

onMounted(() => {
    if (isLoggedIn.value) {
        UserInfo()
    }
});
</script>

<style scoped lang="scss">
.chat-wrap {
    max-width: 1184px;
    min-height: calc(100vh - 110px);
    top: 20px;
    bottom: 20px;
    margin: 0 auto;
    display: flex;

    .list-wrap {
        position: relative;
        overflow: hidden;
        height: 100%;
        width: 360px;
        border-radius: 12px;

        .chat-user {
            box-sizing: border-box;
            width: 360px;
            height: 100%;
            background-color: #fff;
            border-radius: 12px;
            display: flex;
            flex-direction: column;

            .chat-content {
                position: relative;
                overflow-y: auto;
                min-height: 0;
                flex: 1;

                .user-list {
                    position: relative;
                    height: 100%;

                    .user-list-content {
                        overflow-y: auto;
                        height: 100%;
                        padding: 6px 0;

                        ::selection {
                            background-color: cyan;
                        }

                        .friend-content {
                            position: relative;
                            display: block;
                            padding: 14px 12px;
                            cursor: pointer;
                            margin: 0 8px;
                            border-radius: 4px;

                            .avatar {
                                img {
                                    display: block;
                                    width: 46px;
                                    height: 46px;
                                    border-radius: 100%;
                                }
                            }

                            .text {
                                margin-left: 58px;
                                font-size: 14px;
                                color: #414a60;

                                .title-box {
                                    font-size: 13px;
                                    font-weight: 400;
                                    color: #333;
                                    line-height: 16px;
                                    display: flex;

                                    .name-box {
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        display: inline-block;

                                        .name {
                                            font-size: 15px;
                                            font-weight: 500;
                                            color: #222;
                                            margin-right: 10px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .chat-conversation {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        margin-left: 4px;
        background-color: #fff;
        width: 820px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;

        .top-info {
            .user-info {
                display: flex;
                align-items: center;
            }
        }

        .message-content {
            flex: 1;
            overflow: hidden;
            position: relative;
            z-index: 1;

            .chat-record {
                position: relative;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                background-color: #fff;

                .chat-message {
                    overflow-y: auto;
                }
            }
        }

        .message-controls {
            height: 160px;

            .chat-editor {
                position: relative;
                padding: 0 30px;
                border-top: 1px solid #e6e8eb;
            }

            .chat-im {
                margin-bottom: -152px;
            }
        }
    }
}
</style>

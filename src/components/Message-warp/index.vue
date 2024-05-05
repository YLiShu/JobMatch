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
                                <li role="listitem" v-for="(item, index) in friends" :key="index" class="user-list-item"
                                    @click="" style="height: 78px;">
                                    <div class="friend-content">
                                        <div class="avatar" style="    position: relative;
                                        float: left;
                                        width: 46px;
                                        height: 46px;">
                                            <img :src="item.userAvatar"></img>
                                        </div>
                                        <div class="text">
                                            <div class="title-box">
                                                <span class="name-box">
                                                    <span class="name">{{ item.userName }}</span>
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
            <div class="chat-content">
                <!-- 聊天内容 -->
            </div>

            <!-- 输入框 -->
            <div class="chat-input">
                <!-- 输入框 -->
            </div>

            <!-- 聊天输入框 -->
            <div class="chat-input-warp">
                <!-- 聊天输入框 -->
            </div>

            <!-- 聊天输入框 -->
            <div class="chat-input-warp">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const userAvatar = ref("");
const friends = ref([
    {
        userId: 1,
        userName: "张三",
        userAvatar: "https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp",
    },
    {
        userId: 2,
        userName: "李四",
        userAvatar: "https://img.bosszhipin.com/boss/avatar/avatar_8.png?x-oss-process=image/resize,l_900,h_600/format,webp",
    }]
);
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
    }
}
</style>

<template>
    <div class="chat-container">
        <div class="chat-wrap">
            <div class="chat-sidebar">
                <div class="chat-sidebar-content">
                    <ul class="hr-list">
                        <li
                            class="hr-item"
                            :class="{
                                selected: hr.hrInfo === selectedHr?.hrInfo,
                            }"
                            v-for="hr in hrList"
                            :key="hr.hrInfo.id"
                            @click="selectHr(hr.hrInfo.id)"
                        >
                            <div class="hr-card">
                                <div class="hr-card__avatar">
                                    <img
                                        :src="hr.hrInfo.avatar"
                                        alt=""
                                        class="image-circle"
                                    />
                                </div>
                                <div class="hr-card__info">
                                    <div class="hr-card__header">
                                        <span class="hr-card__name">{{
                                            hr.hrInfo.name
                                        }}</span>
                                        <i class="vline"></i>
                                        <span class="hr-card__details">{{
                                            hr.hrInfo.details
                                        }}</span>
                                    </div>
                                    <div class="hr-card__last-msg">
                                        <p class="last-msg__text">
                                            {{
                                                hr.messages[
                                                    hr.messages.length - 1
                                                ].content
                                            }}
                                        </p>
                                        <span class="last-msg__time">{{
                                            hr.messages[hr.messages.length - 1]
                                                .timestamp
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="sidebar-footer">
                        <span class="sidebar-footer__text">没有更多了</span>
                    </div>
                </div>
            </div>
            <div class="chat-main">
                <template v-if="selectedHr">
                    <div class="chat-header">
                        <div class="chat-header__hrinfo">
                            <span class="hrinfo__name">夏女士</span>
                            <i class="vline"></i>
                            <span class="hrinfo__details">闪马智能 - HRD</span>
                        </div>
                        <div class="chat-header__jobinfo">
                            <span class="jobinfo__title"
                                >前端实习生 (MJ000415)</span
                            >
                            <span class="jobinfo__salary">180-250元/天</span>
                            <span class="jobinfo__location">上海</span>
                        </div>
                    </div>
                    <div class="chat-body">
                        <ul class="message-group">
                            <li
                                class="message"
                                v-for="message in messages"
                                :key="message.id"
                                :class="{
                                    'message--friend': message.isFriend,
                                    'message--self': !message.isFriend,
                                }"
                            >
                                <img
                                    class="message__avatar"
                                    :src="selectedHrDetails.avatar"
                                    v-if="message.isFriend"
                                    alt="hr avatar"
                                />
                                <div class="message__content">
                                    <p>
                                        {{ message.content }}
                                    </p>
                                </div>
                                <img
                                    v-if="!message.isFriend"
                                    class="message__avatar"
                                    :src="userAvatar"
                                    alt="user avatar"
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="chat-footer">
                        <textarea
                            class="chat-footer__input"
                            v-model="pendingMessage"
                        ></textarea>
                        <button class="chat-footer__send" @click="sendMessage">
                            发送
                        </button>
                    </div>
                </template>
                <div class="chat-no-data" v-else>
                    <img
                        src="../../assets/message.png"
                        alt=""
                        class="chat-img"
                    />
                    <div class="chat-tips">
                        <p>与您进行过沟通的 Hr 都会在左侧列表中显示</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "../../store/modules/user";

const userStore = useUserStore();
const userAvatar = ref<string>(
    `http://162.14.111.43:8080/${userStore.userInfo!.user.faceImageBig}`
);
const userId = ref<number>(userStore.userInfo!.user.userId);
const hrList = ref<any>([]);
const selectedHr = ref<any>(null);
const selectedHrDetails = ref<any>(null);
const messages = ref<any>([]);
const pendingMessage = ref<any>("");
const ws = ref<any>(null);

const fetchAllChatRecords = async () => {
    hrList.value = [
        {
            hrInfo: {
                id: "1",
                name: "夏女士",
                avatar: "https://img.bosszhipin.com/beijin/upload/avatar/20220121/607f1f3d68754fd091159c1507b8cb401fc08cd012f3a48a3cfdd7664327131b75c1624c2ac72456_s.png?x-oss-process=image/resize,l_900,h_600/format,webp",
                details: "闪马智能 - HRD",
            },
            messages: [
                {
                    id: "msg1",
                    isFriend: true,
                    content: "你好，欢迎加入我们公司！",
                    timestamp: "2024/05/07 14:48",
                },
                {
                    id: "msg2",
                    isFriend: false,
                    content: "非常感谢，很高兴加入！",
                    timestamp: "2024/05/07 15:09",
                },
            ],
        },
        {
            hrInfo: {
                id: "2",
                name: "李先生",
                avatar: "https://img.bosszhipin.com/beijin/upload/avatar/20220121/607f1f3d68754fd091159c1507b8cb401fc08cd012f3a48a3cfdd7664327131b75c1624c2ac72456_s.png?x-oss-process=image/resize,l_900,h_600/format,webp",
                details: "项目经理",
            },
            messages: [
                {
                    id: "msg3",
                    isFriend: true,
                    content: "明日的会议安排了吗？",
                    timestamp: "2024/05/06 09:34",
                },
                {
                    id: "msg4",
                    isFriend: false,
                    content: "已经安排好了，会议室在501室。",
                    timestamp: "2024/05/06 09:45",
                },
            ],
        },
    ];
};

const setupWebSocketConnection = (hrId: string) => {
    ws.value = new WebSocket("ws://47.108.153.136:8898/ws");

    ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.hrId === selectedHr.value.hrInfo.id) {
            messages.value.push(data);
        }
    };

    ws.value.onclose = () => {
        console.log("WebSocket connection closed");
    };
};

const checkURLForId = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const hrId = queryParams.get("id");
    if (hrId) {
        selectHr(hrId);
    }
};

const selectHr = (hrId: string) => {
    if (ws.value) {
        ws.value.close();
        ws.value = null;
    }

    const foundHr = hrList.value.find((hr: any) => hr.hrInfo.id === hrId);

    if (foundHr) {
        selectedHr.value = foundHr;
        selectedHrDetails.value = foundHr.hrInfo;
        messages.value = foundHr.messages;
        setupWebSocketConnection(hrId);
    }
};

const sendMessage = () => {
    if (ws.value && selectedHr.value && pendingMessage.value.trim()) {
        const messageData = {
            userId: userId.value,
            hrId: selectedHr.value.hrInfo.id,
            content: pendingMessage.value.trim(),
        };

        ws.value.send(JSON.stringify(messageData));
        pendingMessage.value = "";
    }
};

onMounted(async () => {
    await fetchAllChatRecords();
    checkURLForId();
});

onUnmounted(() => {
    if (ws.value) {
        ws.value.close();
    }
});
</script>

<style scoped lang="scss">
.chat-container {
    height: calc(100vh - 90px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .chat-wrap {
        display: flex;
        width: 100%;
        max-width: 1200px;
        height: 100%;

        .chat-sidebar {
            margin-right: 5px;
            background-color: #fff;
            border: 1px solid #ddd;
            height: 100%;
            width: 360px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

            .chat-sidebar-content {
                height: 100%;
                overflow-y: auto;
                padding: 10px;

                .hr-item {
                    cursor: pointer;
                    margin-bottom: 5px;
                    border-radius: 12px;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }

                    &.selected {
                        background-color: rgba(0, 0, 0, 0.2);
                    }
                }

                .hr-card {
                    padding: 10px;
                    display: flex;
                    align-items: center;

                    .hr-card__avatar {
                        margin-right: 10px;
                        img {
                            width: 45px;
                            height: 45px;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }

                    .hr-card__info {
                        flex: 1;
                        display: flex;
                        width: calc(100% - 51px);
                        flex-direction: column;
                        margin-top: 5px;

                        .hr-card__header {
                            display: flex;
                            align-items: center;

                            .hr-card__name {
                                font-weight: 900;
                            }

                            .vline {
                                background-color: #e1e3e8;
                                display: inline-block;
                                height: 12px;
                                margin: 0 4px;
                                width: 1px;
                            }

                            .hr-card__details {
                                font-size: 13px;
                                color: #333;
                            }
                        }

                        .hr-card__last-msg {
                            display: flex;
                            justify-content: space-between;
                            color: #999;
                            font-size: 13px;

                            .last-msg__text {
                                white-space: nowrap;
                                overflow: hidden;
                                flex: 1;
                                text-overflow: ellipsis;
                            }

                            .last-msg__time {
                                display: inline-flex;
                                font-size: 10px;
                                margin-left: 5px;
                                flex-direction: column;
                                justify-content: flex-end;
                            }
                        }
                    }
                }

                .sidebar-footer {
                    font-size: 13px;
                    text-align: center;
                    color: #bfbfbf;
                }
            }
        }

        .chat-main {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border: 1px solid #ddd;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 12px;

            .chat-header {
                border-bottom: 1px solid #eee;
                padding: 10px 30px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;

                .chat-header__hrinfo {
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    color: #666;

                    .hrinfo__name {
                        font-weight: 900;
                    }

                    .vline {
                        background-color: #e1e3e8;
                        display: inline-block;
                        height: 12px;
                        margin: 0 4px;
                        width: 1px;
                    }
                }

                .chat-header__jobinfo {
                    display: flex;
                    align-items: center;
                    font-weight: 500;

                    .jobinfo__title {
                        margin-right: 10px;
                    }

                    .jobinfo__salary {
                        color: #00bebd;
                        margin-right: 10px;
                    }

                    .jobinfo__location {
                        font-weight: normal;
                    }
                }
            }

            .chat-body {
                flex: 1;
                padding: 10px;
                overflow-y: auto;

                .message-group {
                    display: flex;
                    flex-direction: column;

                    .message {
                        display: flex;
                        margin-top: 20px;
                        align-items: flex-start;
                        text-align: left;
                        font-size: 13px;

                        .message__avatar {
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            overflow: hidden;
                            margin: 0 10px;

                            img {
                                width: 100%;
                            }
                        }

                        .message__content {
                            line-height: 22px;
                            max-width: 420px;
                            padding: 8px 12px;
                            word-break: break-all;
                            background-color: #f0f0f5;
                            color: #333;
                            border-radius: 10px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                        }
                    }

                    .message--friend {
                        align-self: flex-start;
                    }

                    .message--self {
                        align-self: flex-end;

                        .message__content {
                            background-color: #00bebd;
                            color: #fff;
                        }
                    }
                }
            }

            .chat-footer {
                padding: 10px;
                display: flex;
                align-items: center;
                height: 75px;

                .chat-footer__input {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    line-height: 33px;
                    font-size: 16px;
                    padding: 10px;
                    border-radius: 18px;
                    border: 1px solid #ddd;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;

                    &:focus {
                        outline: none;
                        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
                    }
                }

                .chat-footer__send {
                    margin-left: 5px;
                    align-items: center;
                    height: 100%;
                    border: 1px solid #3ec6c5;
                    border-radius: 18px;
                    color: #fff;
                    background: #3ec6c5;
                    cursor: pointer;
                    display: flex;
                    font-size: 14px;
                    font-weight: 700;
                    justify-content: center;
                    width: 100px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

                    &:active {
                        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
                    }
                }
            }

            .chat-no-data {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .chat-img {
                    width: 200px;
                }

                .chat-tips {
                    font-size: 13px;
                    width: 100%;
                    margin-top: 10px;
                    color: #666;
                }
            }
        }
    }
}
</style>
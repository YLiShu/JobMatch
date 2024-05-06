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
                                    class="user-list-item" @click="select(item)" style="height: 78px;">
                                    <div class="friend-content"
                                        :class="{ selection: item.friendNickname === selectedName }">
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
                                    class="user-list-item" @click="select(item)" style="height: 78px;">
                                    <div class="friend-content"
                                        :class="{ selection: item.friendNickname === selectedName }">
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
                        <div v-for="(item, index) in message" :key="index">
                            <div :class="{ 'item-myself': item.senderId === userId }" v-if="item.senderId === userId">
                                <div class="message-text">
                                    <div class="text">
                                        {{ item.msg }}
                                    </div>
                                </div>
                            </div>
                            <div :class="{ 'item-other': item.receiverId === userId }"
                                v-if="item.receiverId === userId">
                                <div class="message-text">
                                    <div class="text">
                                        {{ item.msg }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 聊天内容 -->
            </div>

            <!-- 输入框 -->
            <div class="message-controls">
                <div class="chat-im chat-editor">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="input">

                    </el-input>
                    <div class="sendButton">
                        <el-button @click="sendMessage">发送</el-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inputEmits } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import { getFriends, getUserInfo, getUnsignedMsg } from "../../api/user";
import useWebSocket from '../../utils/tools/websocket';


const wsOptions = {
    url: 'ws://47.108.153.136:8898/ws',
};


const { open, close, reconnect, on, send } = useWebSocket(wsOptions);

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
const userId = ref()
const UserInfo = async () => {
    try {
        console.log("userInfo");
        userInfo.value = await getUserInfo()
        console.log(userInfo.value.data.user);
        userId.value = userInfo.value.data.user.userId
        getFriendsList();
    } catch (error) {
        console.log(error);
    }
}

const selectedName = ref()
const selectedUserId = ref()
const select = (item: any) => {
    console.log(item);
    selectedName.value = item.friendNickname;
    selectedUserId.value = item.friendUserId
}



const sendMessage = () => {
    console.log(input.value);
    send({
        "action": 2, "chatMsgVO": {
            "senderId": userId.value, // 发送者id
            "receiverId": selectedUserId.value, //接受者id
            "msg": input.value
        },
    })
    message.value.push({
        senderId: userId.value,
        receiverId: selectedUserId.value,
        msg: input.value
    })
    console.log(message.value);
    input.value = ""
}

const receivedMessage = ref()

const message = ref([])

let unsignedMsg: { value: any; forEach: (arg0: (msg: any) => void) => void; } | null = null

const setUnsignedMsg = (item: any) => {
    unsignedMsg = item
}

const receiveMessage = (item: any) => {
    message.value.push({
        senderId: item.sendUserId,
        receiverId: item.acceptUserId,
        msg: item.msg
    })
    send({
        "action": 3,
        "extend":item.id
    })
}


onMounted(() => {
    open();//在onMounted钩子中调用open函数，链接websocket

    // 注册消息接收处理函数
    on('message', (data) => {
        receivedMessage.value = data;
        console.log(data)
    });



    setInterval(() => {
        console.log("保持心跳")
        send({ "action": 4 })
        getUnsignedMsg({ acceptUserId: userId.value }).then(res => {
            console.log(res);
            if (res.code === 200) {
                setUnsignedMsg(res.data);
                console.log(unsignedMsg);
                unsignedMsg.forEach(msg => {
                    receiveMessage(msg);
                });

            }
        })
    }, 4000); // 每4秒发送一次

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

                        .selection {
                            background-color: rgb(184, 184, 184);
                        }

                        .friend-content {
                            height: 78px;
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
            border-radius: 12px;

            .chat-record {
                position: relative;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                background-color: #fff;


            }

            .chat-message {
                overflow-y: auto;

                .item-myself {
                    margin-top: 20px;
                    color: #333;
                    display: list-item;
                    text-align: -webkit-match-parent;
                    unicode-bidi: isolate;

                    .message-text {
                        margin-top: 20px;

                        .text {
                            line-height: 22px;
                            position: relative;
                            display: inline-block;
                            max-width: 420px;
                            padding: 8px 12px;
                            margin-right: 20px;
                            vertical-align: top;
                            word-break: break-all;
                            border-radius: 8px;
                            background-color: #f8f8f8;
                            color: #333;
                            float: right;
                            color: #333;
                            border-top-right-radius: 0;
                            background-color: rgba(0, 190, 189, .2);
                        }

                    }
                }

                .item-other {
                    margin-top: 20px;
                    color: #333;
                    display: list-item;
                    text-align: -webkit-match-parent;
                    unicode-bidi: isolate;

                    .message-text {
                        margin-top: 20px;

                        .text {
                            line-height: 22px;
                            position: relative;
                            display: inline-block;
                            max-width: 420px;
                            padding: 8px 12px;
                            margin-left: 20px;
                            vertical-align: top;
                            word-break: break-all;
                            border-radius: 8px;
                            background-color: #f8f8f8;
                            color: #333;
                            float: left;
                            color: #333;
                            border-top-right-radius: 0;
                            background-color: rgba(0, 190, 189, .2);
                        }
                    }
                }
            }
        }

        .message-controls {
            height: 160px;

            .chat-editor {
                position: relative;
                padding: 0 30px;
                border-top: 1px solid #e6e8eb;

                .sendButton {
                    text-align: right;
                }
            }

            .chat-im {
                margin-bottom: -152px;
            }



        }
    }
}
</style>

<template>
    <div class="chat-container">
        <div class="chat-wrap">
            <div class="chat-sidebar">
                <div class="chat-sidebar-content">
                    <ul class="user-list">
                        <li
                            class="user-item"
                            v-for="index of Array.from({ length: 10 })"
                            :key="index"
                        >
                            <div class="user-card">
                                <div class="user-card__avatar">
                                    <img
                                        src="https://img.bosszhipin.com/beijin/upload/avatar/20220121/607f1f3d68754fd091159c1507b8cb401fc08cd012f3a48a3cfdd7664327131b75c1624c2ac72456_s.png?x-oss-process=image/resize,l_900,h_600/format,webp"
                                        alt=""
                                        class="image-circle"
                                    />
                                </div>
                                <div class="user-card__info">
                                    <div class="user-card__header">
                                        <span class="user-card__name"
                                            >夏女士</span
                                        >
                                        <i class="vline"></i>
                                        <span class="user-card__details"
                                            >闪马智能 - HRD</span
                                        >
                                    </div>
                                    <div class="user-card__last-msg">
                                        <p class="last-msg__text">您好</p>
                                        <span class="last-msg__time"
                                            >17:17</span
                                        >
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
                <div class="chat-header">
                    <div class="chat-header__userinfo">
                        <h2 class="userinfo__name">夏女士</h2>
                        <span class="userinfo__details">闪马智能 - HRD</span>
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
                    <div class="message-group">
                        <div class="message message--friend">
                            <img
                                class="message__avatar"
                                src="https://img.bosszhipin.com/beijin/upload/avatar/20220121/friendly.png"
                                alt="user avatar"
                            />
                            <div class="message__content">
                                <p>
                                    你好，我们正在诚招前端实习生
                                    (MJ000415)，想跟你沟通一下
                                </p>
                            </div>
                        </div>
                        <div class="message message--self">
                            <div class="message__content">
                                <p>您好</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-footer">
                    <textarea class="chat-footer__input"></textarea>
                    <button class="chat-footer__send">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
                padding: 5px;

                .user-item {
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

                .user-card {
                    padding: 10px;
                    display: flex;
                    align-items: center;

                    .user-card__avatar {
                        margin-right: 10px;
                        img {
                            width: 45px;
                            height: 45px;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }

                    .user-card__info {
                        flex: 1;
                        display: flex;
                        width: calc(100% - 51px);
                        flex-direction: column;
                        margin-top: 5px;

                        .user-card__header {
                            display: flex;
                            align-items: center;

                            .user-card__name {
                                font-weight: 900;
                            }

                            .vline {
                                background-color: #e1e3e8;
                                display: inline-block;
                                height: 12px;
                                margin: 0 4px;
                                width: 1px;
                            }

                            .user-card__details {
                                font-size: 13px;
                                color: #333;
                            }
                        }

                        .user-card__last-msg {
                            display: flex;
                            justify-content: space-between;
                            color: #999;
                            font-size: 13px;

                            .last-msg__text {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .last-msg__time {
                                margin-left: 5px;
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

            .top-info {
                border-bottom: 1px solid #eee;
                padding: 10px;

                .user-info,
                .chat-position-content {
                    display: flex;
                    align-items: center;

                    .vline {
                        margin: 0 5px;
                    }
                }
            }

            .message-content {
                flex: 1;
                padding: 10px;
                overflow-y: auto;

                .chat-message {
                    display: flex;
                    flex-direction: column;

                    .item-friend,
                    .item-myself {
                        display: flex;
                        margin-bottom: 10px;

                        .message-text {
                            max-width: 70%;
                            transition: all 0.3s ease;

                            .figure {
                                width: 45px;
                                height: 45px;
                                border-radius: 50%;
                                overflow: hidden;
                                margin-right: 10px;

                                img {
                                    width: 100%;
                                }
                            }

                            .text {
                                padding: 10px;
                                border-radius: 10px;
                                background-color: #f0f0f5;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

                                &:hover {
                                    background-color: rgba(240, 242, 245, 0.9);
                                }
                            }
                        }

                        .item-myself & {
                            .text {
                                background-color: #d8eaff;
                                align-self: flex-end;
                            }
                        }
                    }
                }
            }

            .message-controls {
                padding: 10px;

                .chat-input {
                    width: 100%;
                    resize: none;
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
            }
        }
    }
}
</style>
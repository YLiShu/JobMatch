<template>
    <div class="hot-enterprise-position">
        <h2>热门企业</h2>
        <ul class="hot-enterprise-position-list">
            <li
                class="hot-enterprise-position-item"
                v-for="(
                    hotEnterprisePosition, index
                ) in hotEnterprisePositionList"
                :key="index"
            >
                <div class="enterprise-info-top">
                    <div class="enterprise-img">
                        <img
                            :src="hotEnterprisePosition.imageUrl"
                            :alt="hotEnterprisePosition.name"
                        />
                    </div>
                    <div class="enterprise-info">
                        <h3>{{ hotEnterprisePosition.name }}</h3>
                        <p>
                            {{ hotEnterprisePosition.finance
                            }}<span class="line"></span
                            >{{ hotEnterprisePosition.size
                            }}<span class="line"></span
                            >{{ hotEnterprisePosition.industry }}
                        </p>
                    </div>
                </div>
                <ul class="enterprise-position-list">
                    <li
                        class="enterprise-position-item"
                        v-for="(
                            position, positionIndex
                        ) in hotEnterprisePosition.positions"
                        :key="positionIndex"
                    >
                        <div class="position-info">
                            <div class="position-info-top">
                                <p class="name">{{ position.title }}</p>
                                <p class="salary">{{ position.salary }}</p>
                            </div>
                            <p class="position-text">
                                <span
                                    class="position-tag"
                                    v-for="(
                                        positionTag, positionTagIndex
                                    ) in position.tags"
                                    :key="positionTagIndex"
                                    >{{ positionTag }}</span
                                >
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="more-position-btn">查看更多职位</div>
            </li>
        </ul>
        <div class="hot-enterprise-position-more">
            <button
                class="hot-enterprise-position-btn"
                @click="navigateToEnterprise"
            >
                查看更多
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Position {
    title: string;
    salary: string;
    tags: string[];
}

interface Enterprise {
    name: string;
    finance: string;
    size: string;
    industry: string;
    imageUrl: string;
    positions: Position[];
}

const hotEnterprisePositionList = ref<Enterprise[]>([
    {
        name: "之了",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/faa27a0fa674064165375fb88807bbf7cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "销售经理（销售团队管理）",
                salary: "15-20K",
                tags: ["成都 武侯区 新会展中心", "3-5年", "本科"],
            },
            {
                title: "专升本讲师",
                salary: "10-15K·13薪",
                tags: ["成都 郫都区 犀浦", "1-3年", "本科"],
            },
            {
                title: "会计助教/六险一金 13薪",
                salary: "4-6K·13薪",
                tags: ["成都 青羊区 草堂", "经验不限", "本科"],
            },
        ],
    },
    {
        name: "鸿联九五",
        finance: "未融资",
        size: "10000人以上",
        industry: "互联网金融",
        imageUrl:
            "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220516/7bf6f160950405e955333a55919f5015a8b8141358d02008d90538eff816b3da33c6eade502c91bd.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "保底7000起、国企行政班可带朋友",
                salary: "7-12K",
                tags: ["成都 青羊区 黄田坝", "经验不限", "大专"],
            },
            {
                title: "西门7300招本科5人",
                salary: "7-11K",
                tags: ["成都 青羊区 青羊万达", "经验不限", "本科"],
            },
            {
                title: "国企后台岗无责底薪4500朝九晚六不加班",
                salary: "6-11K·13薪",
                tags: ["成都 青羊区 黄田坝", "1年以内", "中专/中技"],
            },
        ],
    },
    {
        name: "极客数学帮",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/f39c9b7f52b5813b47352c5719904844cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "总经理助理",
                salary: "9-12K",
                tags: ["成都 成华区 建设路", "1-3年", "本科"],
            },
            {
                title: "数学教师-保底年薪20万",
                salary: "13-17K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
            {
                title: "招聘专员",
                salary: "7-9K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
        ],
    },
    {
        name: "之了",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/faa27a0fa674064165375fb88807bbf7cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "销售经理（销售团队管理）",
                salary: "15-20K",
                tags: ["成都 武侯区 新会展中心", "3-5年", "本科"],
            },
            {
                title: "专升本讲师",
                salary: "10-15K·13薪",
                tags: ["成都 郫都区 犀浦", "1-3年", "本科"],
            },
            {
                title: "会计助教/六险一金 13薪",
                salary: "4-6K·13薪",
                tags: ["成都 青羊区 草堂", "经验不限", "本科"],
            },
        ],
    },
    {
        name: "鸿联九五",
        finance: "未融资",
        size: "10000人以上",
        industry: "互联网金融",
        imageUrl:
            "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220516/7bf6f160950405e955333a55919f5015a8b8141358d02008d90538eff816b3da33c6eade502c91bd.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "保底7000起、国企行政班可带朋友",
                salary: "7-12K",
                tags: ["成都 青羊区 黄田坝", "经验不限", "大专"],
            },
            {
                title: "西门7300招本科5人",
                salary: "7-11K",
                tags: ["成都 青羊区 青羊万达", "经验不限", "本科"],
            },
            {
                title: "国企后台岗无责底薪4500朝九晚六不加班",
                salary: "6-11K·13薪",
                tags: ["成都 青羊区 黄田坝", "1年以内", "中专/中技"],
            },
        ],
    },
    {
        name: "极客数学帮",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/f39c9b7f52b5813b47352c5719904844cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "总经理助理",
                salary: "9-12K",
                tags: ["成都 成华区 建设路", "1-3年", "本科"],
            },
            {
                title: "数学教师-保底年薪20万",
                salary: "13-17K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
            {
                title: "招聘专员",
                salary: "7-9K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
        ],
    },
    {
        name: "之了",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/faa27a0fa674064165375fb88807bbf7cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "销售经理（销售团队管理）",
                salary: "15-20K",
                tags: ["成都 武侯区 新会展中心", "3-5年", "本科"],
            },
            {
                title: "专升本讲师",
                salary: "10-15K·13薪",
                tags: ["成都 郫都区 犀浦", "1-3年", "本科"],
            },
            {
                title: "会计助教/六险一金 13薪",
                salary: "4-6K·13薪",
                tags: ["成都 青羊区 草堂", "经验不限", "本科"],
            },
        ],
    },
    {
        name: "鸿联九五",
        finance: "未融资",
        size: "10000人以上",
        industry: "互联网金融",
        imageUrl:
            "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220516/7bf6f160950405e955333a55919f5015a8b8141358d02008d90538eff816b3da33c6eade502c91bd.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "保底7000起、国企行政班可带朋友",
                salary: "7-12K",
                tags: ["成都 青羊区 黄田坝", "经验不限", "大专"],
            },
            {
                title: "西门7300招本科5人",
                salary: "7-11K",
                tags: ["成都 青羊区 青羊万达", "经验不限", "本科"],
            },
            {
                title: "国企后台岗无责底薪4500朝九晚六不加班",
                salary: "6-11K·13薪",
                tags: ["成都 青羊区 黄田坝", "1年以内", "中专/中技"],
            },
        ],
    },
    {
        name: "极客数学帮",
        finance: "不需要融资",
        size: "1000-9999人",
        industry: "在线教育",
        imageUrl:
            "https://img.bosszhipin.com/beijin/mcs/banner/f39c9b7f52b5813b47352c5719904844cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
        positions: [
            {
                title: "总经理助理",
                salary: "9-12K",
                tags: ["成都 成华区 建设路", "1-3年", "本科"],
            },
            {
                title: "数学教师-保底年薪20万",
                salary: "13-17K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
            {
                title: "招聘专员",
                salary: "7-9K",
                tags: ["成都 成华区 驷马桥", "经验不限", "本科"],
            },
        ],
    },
]);
</script>

<style scoped lang="scss">
.hot-enterprise-position {
    width: 100%;
    max-width: 1200px;

    .hot-enterprise-position-list {
        margin-top: 15px;
        width: 100%;
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        grid-row-gap: 15px;
        grid-column-gap: 15px;

        .hot-enterprise-position-item {
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
            background: linear-gradient(135deg, #eff6f6 0, #ffffff 100%);
            border-radius: 12px;
            height: 390px;
            overflow: hidden;
            user-select: none;

            .enterprise-info-top {
                height: 76px;
                padding: 16px 20px;
                overflow: hidden;
                background: linear-gradient(90deg, #ebfafa 0, #fcfbfa 100%);
                display: flex;
                align-items: center;
                cursor: pointer;

                .enterprise-img {
                    height: 44px;
                    width: 44px;
                    overflow: hidden;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 100%;
                    }
                }

                .enterprise-info {
                    margin-left: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    h3 {
                        height: 22px;
                        font-size: 16px;
                        color: #222;
                        line-height: 22px;
                        margin: 0 0 4px 0;
                        padding: 0;
                        max-width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        transition: all 0.2s ease-in-out;

                        &:hover {
                            color: #00a6a7;
                            transform: scale(1.03);
                        }
                    }

                    p {
                        height: 18px;
                        font-size: 13px;
                        font-weight: 400;
                        color: #999;
                        line-height: 18px;

                        .line {
                            display: inline-block;
                            width: 1px;
                            height: 10px;
                            vertical-align: middle;
                            background: #e0e0e0;
                            margin: 0 10px;
                        }
                    }
                }
            }

            .enterprise-position-list {
                padding: 4px 20px;

                .enterprise-position-item {
                    width: 100%;
                    padding: 12px 0;
                    box-sizing: border-box;

                    .position-info {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;

                        .position-info-top {
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 12px;
                            cursor: pointer;
                            &:hover .name {
                                font-weight: 700;
                                color: #00a6a7;
                                transform: scale(1.01);
                            }

                            .name {
                                max-width: 200px;
                                font-size: 16px;
                                font-weight: 500;
                                color: #222;
                                margin-right: 8px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                transition: all linear 0.2s;
                            }

                            .salary {
                                font-size: 16px;
                                color: #3ec6c5;
                                flex: 1;
                                text-align: right;
                                font-weight: 500;
                            }
                        }

                        .position-text {
                            text-align: left;
                            font-size: 13px;
                            color: #666;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            .position-tag {
                                padding: 2px 8px;
                                color: #666;
                                border-radius: 15px;
                                transition: all 0.3s ease;
                                background-color: #f0efef;
                                font-size: 14px;
                                cursor: pointer;

                                &:hover {
                                    color: #fff;
                                    background: #00bebd;
                                }

                                &:not(:last-child) {
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                }
            }

            .more-position-btn {
                margin: 10px auto;
                width: 122px;
                height: 30px;
                cursor: pointer;
                line-height: 30px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid rgba(0, 190, 189, 0.6);
                font-size: 14px;
                font-weight: 400;
                color: #00a6a7;
                transition: all 0.2s linear;

                &:hover {
                    font-weight: 500;
                    color: #fff;
                    background: #00bebd;
                    transform: scale(1.03);
                }
            }
        }
    }

    .hot-enterprise-position-more {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;

        .hot-enterprise-position-btn {
            height: 40px;
            width: 180px;
            text-align: center;
            background: rgba(0, 190, 189, 0.1);
            border-radius: 8px;
            font-size: 14px;
            font-weight: 400;
            color: #00a6a7;
            line-height: 40px;
            border: none;
            transition: all 0.2s ease-in-out;

            &:hover {
                font-weight: 700;
                transform: scale(1.05);
            }
        }
    }
}
</style>

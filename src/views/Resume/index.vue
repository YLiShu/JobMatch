<template>
    <div class="resume-view">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="false" />
            </div>
        </div>
        <div class="content">
            <div class="resume-header">
                <div class="header-left">
                    <div class="header-text">我的简历</div>
                    <div class="last-update">
                        <el-icon><Timer /></el-icon>
                        <span class="update-time"
                            >最后更新时间: 2023-03-01</span
                        >
                    </div>
                </div>
                <div class="header-right upload-button">
                    <svg width="16" height="16">
                        <path
                            id="icon"
                            fill="#fff"
                            fill-rule="evenodd"
                            d="M8.188 3.745L9.531 5.09l.997-.998-1.349-1.356-.99 1.01zm.401 2.287L7.255 4.697 2.688 9.353v.002l1.29 1.29h.002l4.61-4.613zm3.12-1.207l.004.004L4.543 12H2a.667.667 0 0 1-.667-.667V8.791L8.26 1.81l-.007-.007.47-.47a.667.667 0 0 1 .944.002l2.29 2.301a.667.667 0 0 1-.002.942l-.246.246zM1.667 13.333h12.666c.184 0 .334.15.334.334v.666c0 .184-.15.334-.334.334H1.667a.333.333 0 0 1-.334-.334v-.666c0-.184.15-.334.334-.334z"
                        ></path>
                    </svg>
                    <span class="upload-text">上传</span>
                </div>
            </div>
            <!--基本信息-->
            <div class="resume-content">
                <div class="resume-section">
                    <div class="section-title">基本信息</div>
                    <ul class="section-content">
                        <li class="resume-item" v-for="item in basicInfo">
                            <div class="item-title">{{ item.title }}</div>
                            <div class="item-content">
                                {{ item.content }}
                            </div>
                        </li>
                    </ul>
                </div>
                <!--工作经历-->
                <div class="resume-section">
                    <div class="section-title">{{ experience.title }}</div>
                    <ul
                        class="section-content experience-grid"
                        v-for="item in experience.list"
                    >
                        <li class="resume-item" v-if="item.company">
                            <div class="item-title">公司</div>
                            <div class="item-content">
                                {{ item.company }}
                            </div>
                        </li>
                        <li class="resume-item" v-if="item.range">
                            <div class="item-title">起止时间</div>
                            <div class="item-content">
                                {{ item.range }}
                            </div>
                        </li>
                        <li class="resume-item" v-if="item.position">
                            <div class="item-title">职位</div>
                            <div class="item-content">
                                {{ item.position }}
                            </div>
                        </li>
                        <li class="resume-item" v-if="item.desc">
                            <div class="item-title">描述</div>
                            <div class="item-content">
                                {{ item.desc }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts" setup>
import HeadNav from "../../components/HeadNav/index.vue";
import Footer from "../../components/Footer/index.vue";
import { basicInfo, experience } from "./mock";
</script>

<style lang="scss" scoped>
.resume-view {
    background: linear-gradient(180deg, #00bebd 0, #e8fafa 50%, #f9f9f9 100%);

    .content {
        width: 1016px;
        margin: 0 auto 115px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            "PingFang SC", "Hiragino Sans GB";

        .resume-header {
            display: flex;
            min-height: 146px;
            justify-content: space-between;
            align-items: center;

            .header-left {
                display: flex;
                flex-direction: column;
                text-align: left;
                .header-text {
                    color: #fff;
                    height: 59px;
                    line-height: 59px;
                    font-size: 30px;
                    font-weight: 800;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                        "PingFang SC", "Hiragino Sans GB";
                }

                .last-update {
                    display: flex;
                    align-items: center;
                    color: white;
                    font-size: 16px;
                    .update-time {
                        margin-left: 4px;
                    }
                }
            }

            .header-right {
                height: 40px;
                box-sizing: border-box;
                padding: 0 12px;
                border-radius: 20px;
                border: 1px solid #fff;
                display: flex;
                align-items: center;
                color: #fff;

                .upload-text {
                    margin-left: 6px;
                    font-size: 16px;
                }

                &:hover {
                    background-color: white;
                    .upload-text {
                        color: #00bebd;
                    }

                    #icon {
                        fill: #00bebd;
                    }
                }
            }
        }

        .resume-content {
            padding: 8px 50px 40px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 8px 24px 0 rgba(54, 97, 174, 0.14);
        }
    }
}

.resume-section {
    margin-top: 32px;

    .section-title {
        position: relative;
        height: 32px;
        margin-bottom: 38px;
        text-align: left;
        font-size: 20px;
        font-weight: 800;
        line-height: 1.6;
        color: #1f2329;

        &::after {
            position: absolute;
            bottom: -8px;
            left: 0;
            content: "";
            width: 24px;
            height: 4px;
            background-color: #3370ff;
        }
    }

    .section-content {
        display: grid;
        // 2列布局
        grid-template-columns: repeat(2, 1fr);
        text-align: left;

        // 211布局
        &.experience-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            .resume-item:nth-child(3),
            .resume-item:nth-child(4) {
                grid-column: span 2;
            }

            &:nth-child(n + 3) {
                border-top: 1px dashed #eff1f1;
                padding-top: 24px;
            }
        }

        .resume-item {
            margin-bottom: 12px;

            .item-title {
                margin-bottom: 4px;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.71;
                color: #1f2329;
                opacity: 0.45;
            }

            .item-content {
                word-wrap: break-word;
                font-size: 16px;
                line-height: 1.75;
                color: #1f2329;
            }
        }
    }
}
</style>
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
                            >最后更新时间: {{ lastUpdateTime }}</span
                        >
                    </div>
                </div>
                <div class="header-right upload-button" @click="selectResume">
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
            <!--文件选择, 限制word、pdf、txt-->
            <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt,"
                style="display: none"
                ref="uploader"
                @change="uploadResume"
            />
            <!--基本信息-->
            <div class="resume-content">
                <div class="resume-section">
                    <div class="section-title">基本信息</div>
                    <ul class="section-content layout-222">
                        <li class="resume-item" v-for="item in basicInfoData">
                            <div class="item-title">{{ item.title }}</div>
                            <div class="item-content">
                                {{ item.content }}
                            </div>
                        </li>
                    </ul>
                </div>
                <!--工作经历-->
                <div class="resume-section">
                    <div class="section-title">{{ experienceData.title }}</div>
                    <ul
                        class="section-content layout-211"
                        v-for="item in experienceData.list"
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
                <!--荣誉 / 竞赛-->
                <div class="resume-section" v-if="awards && awards.length">
                    <div class="section-title">{{ "荣誉 / 奖项" }}</div>
                    <ul class="section-content layout-111">
                        <li class="resume-item" v-for="item in awards">
                            <div class="item-title">{{ "获奖名称" }}</div>
                            <div class="item-content">
                                {{ item }}
                            </div>
                        </li>
                    </ul>
                </div>
                <!--技能-->
                <div class="resume-section" v-if="ability && ability.length">
                    <div class="section-title">{{ "技能" }}</div>
                    <div>{{ ability }}</div>
                </div>
                <!--个人标签-->
                <div class="resume-section" v-if="tagsData && tagsData.length">
                    <div class="section-title">{{ "个人标签" }}</div>
                    <div>
                        <template v-for="item in tagsData">
                            <template v-for="tag in item.list">
                                <el-tag
                                    :color="
                                        colors[
                                            Math.floor(
                                                Math.random() * colors.length
                                            )
                                        ]
                                    "
                                    style="
                                        margin-right: 8px;
                                        color: white;
                                        border: white 1px solid;
                                    "
                                >
                                    {{ tag }}
                                </el-tag>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <Loading :loading="loading" />
    </div>
</template>

<script lang="ts" setup>
import HeadNav from "../../components/HeadNav/index.vue";
import Footer from "../../components/Footer/index.vue";
import Loading from "../../components/Loading/index.vue";

import { nextTick, onMounted, ref } from "vue";
import axios from "axios";

import { parseResume } from "../../api/resume/index";
import { ResumeData } from "./type";
import { basicInfo, experience, tags } from "./mock";
import colors from "./colorSys";

let token = "";
const uploader = ref<HTMLInputElement | null>(null);

const basicInfoData = ref(basicInfo);
const experienceData = ref(experience);
const ability = ref("");
const awards = ref<string[]>([]);
const tagsData = ref(tags);
const lastUpdateTime = ref("2024-03-01");
const loading = ref(false);

onMounted(() => {
    axios.get("http://47.108.153.136:8000/authorize").then((res) => {
        token = res.data.token;
    });
});

// 调起文件选择
function selectResume() {
    if (uploader.value) {
        uploader.value.click();
    }
}

function uploadResume(e: Event) {
    console.log(e);
    const files = (e.target as HTMLInputElement).files;
    const resume = files && files[0];
    if (!resume) {
        return;
    }
    let param = new FormData();
    param.append("file", resume);
    loading.value = true;
    parseResume(param, token).then((res) => {
        console.log("简历数据", res.data.res);
        handleResumeData(res.data.res as ResumeData);
        nextTick(() => {
            loading.value = false;
        });
    });
}

const basicInfoEnum = {
    name: "姓名",
    age: "年龄",
    birth: "出生日期",
    tel: "联系电话",
    email: "邮箱",
    edu: "学历",
    college: "教育经历",
    loc: "所在地",
};

const tagsEnum = {
    edu_tag: "教育",
    experience_tag: "经历",
    ability_tag: "技能",
};

// 解析后端简历数据
function handleResumeData(data: ResumeData) {
    lastUpdateTime.value = new Date().toLocaleDateString();
    // 基本信息
    const newBasicInfo = [];
    const basic_data = data.basic_data;
    for (const key in basicInfoEnum) {
        if ((basic_data as any)[key]) {
            const val = (basic_data as any)[key] as string | string[];
            newBasicInfo.push({
                title: (basicInfoEnum as any)[key],
                content: Array.isArray(val) ? val.join(", ") : val,
            });
        } else {
            newBasicInfo.push({
                title: (basicInfoEnum as any)[key],
                content: "暂无",
            });
        }
    }
    basicInfoData.value = newBasicInfo;

    // 工作经历
    const newExperience = {
        title: "工作经历",
        list: [] as {
            company: string;
            range: string;
            position: string;
            desc: string;
        }[],
    };
    const experience_data = data.experience;
    for (let i = 0; i < experience_data.length; i += 3) {
        const rangeAndPosition = experience_data[i].split(" ");
        const company = experience_data[i + 1];
        const desc = experience_data[i + 2];

        // 解析起止时间和职位
        const range = rangeAndPosition.slice(0, -1).join(" ");
        const position = rangeAndPosition[rangeAndPosition.length - 1];

        newExperience.list.push({
            company,
            range,
            position,
            desc,
        });
    }
    experienceData.value = newExperience;
    // 技能
    ability.value = data.ability.join(", ");

    // 获奖
    awards.value = data.award;

    // 标签
    const tags = data.tag;
    const newTags = [];
    for (const key in tagsEnum) {
        if ((tags as any)[key]) {
            newTags.push({
                title: (tagsEnum as any)[key],
                list: (tags as any)[key] as string[],
            });
        }
    }
    tagsData.value = newTags;

    console.log("解析完成");
}
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
                cursor: pointer;

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
    text-align: left;

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
            background-color: #00bebd;
        }
    }

    .section-content {
        text-align: left;
        // 2列布局
        &.layout-222 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        // 211布局
        &.layout-211 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            .resume-item:nth-child(3),
            .resume-item:nth-child(4) {
                grid-column: span 2;
            }

            &:nth-child(n + 3) {
                border-top: 2px dashed #eff1f1;
                padding-top: 24px;
            }
        }

        // 一列布局
        &.layout-111 {
            display: flex;
            flex-direction: column;
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
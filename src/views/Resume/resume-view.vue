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
                <div class="control">
                    <div class="header-right upload-button" @click="editeResume">
                        <svg width="16" height="16">
                            <path
                                class="icon"
                                fill="#fff"
                                fill-rule="evenodd"
                                d="M8.188 3.745L9.531 5.09l.997-.998-1.349-1.356-.99 1.01zm.401 2.287L7.255 4.697 2.688 9.353v.002l1.29 1.29h.002l4.61-4.613zm3.12-1.207l.004.004L4.543 12H2a.667.667 0 0 1-.667-.667V8.791L8.26 1.81l-.007-.007.47-.47a.667.667 0 0 1 .944.002l2.29 2.301a.667.667 0 0 1-.002.942l-.246.246zM1.667 13.333h12.666c.184 0 .334.15.334.334v.666c0 .184-.15.334-.334.334H1.667a.333.333 0 0 1-.334-.334v-.666c0-.184.15-.334.334-.334z"
                            ></path>
                        </svg>
                        <span class="upload-text">编辑</span>
                    </div>
                    <div class="header-right upload-button" @click="selectResume">
                        <svg t="1714926132534" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1466" width="16" height="16"><path d="M1024 896v128H0v-320h128v192h768v-192h128v192zM576 234.688V768H448V234.688L213.312 469.312 128 384l384-384 384 384-85.312 85.312L576 234.688z" fill="#ffffff" p-id="1467" class="icon"></path></svg>
                        <span class="upload-text">上传</span>
                    </div>
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
import { storeToRefs } from 'pinia'
import { parseResume } from "../../api/resume/index";
import colors from "./colorSys";
import { useResumeStore } from '../../store/modules/Resume/resume';
import { ResumeData } from '../../store/modules/Resume/type';
import { useRouter } from "vue-router";

let token = "";
const uploader = ref<HTMLInputElement | null>(null);
const resumeStore = useResumeStore();
const {
  basicInfoData, 
  experienceData, 
  ability, 
  awards, 
  tagsData,
  lastUpdateTime
} = storeToRefs(resumeStore);
const {handleResumeData} = resumeStore;
const loading = ref(false);
const router = useRouter();

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

function editeResume() {
    router.push({
        name: "ResumeEdit"
    });
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

            .control {
                display: flex;
                gap: 12px;
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

                    .icon {
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
</style>
<style lang="scss" src="./resume-section.scss" scoped/>
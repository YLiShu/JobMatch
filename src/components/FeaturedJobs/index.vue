<template>
    <div class="featured-jobs">
        <h2>精选职位</h2>
        <Tabs
            :activeTab="activeTab"
            :tabs="jobCategorizations"
            @changeTab="handleTabChange"
        >
            <ul class="featured-jobs-box">
                <li
                    @click="gotoTest"
                    class="job-list-item"
                    v-for="(job, jobIndex) in jobList"
                    :key="jobIndex"
                >
                    <p class="job-list-item-top">
                        <span class="job-list-item-title">{{ job.title }}</span
                        ><span class="job-list-item-salary">{{
                            job.salary
                        }}</span>
                    </p>
                    <p class="job-list-item-tagbox">
                        <span
                            class="job-list-item-tag"
                            v-for="(tag, tagIndex) in job.tags"
                            :key="tagIndex"
                            >{{ tag }}</span
                        >
                    </p>
                    <div class="job-list-item-company">
                        <div class="left">
                            <div class="logo">
                                <img :src="job.company.logoURL" />
                            </div>
                            <span class="job-list-item-company-name">{{
                                job.company.name
                            }}</span>
                        </div>
                        <span class="job-list-item-com-address">{{
                            job.company.address
                        }}</span>
                    </div>
                </li>
            </ul>
        </Tabs>
        <div class="featured-jobs-more">
            <button class="featured-jobs-btn" @click="navigateToEnterprise">
                查看更多
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "../../router";
import Tabs from "../Tabs/index.vue";
import { ref } from "vue";

interface JobCategorization {
    title: string;
}
interface Job {
    title: string;
    salary: string;
    tags: string[];
    company: {
        name: string;
        logoURL: string;
        address: string;
    };
}

const gotoTest = () => {
    router.push("/job-detail?id=012a");
};
const jobCategorizations = ref<JobCategorization[]>([
    {
        title: "技术",
    },
    {
        title: "金融",
    },
    {
        title: "人力/财务/行政",
    },
    {
        title: "服务业",
    },
    {
        title: "销售",
    },
    {
        title: "运营",
    },
    {
        title: "教育",
    },
    {
        title: "传媒",
    },
]);
const jobList = ref<Job[]>([
    {
        title: "前端开发工程师",
        salary: "7千-1万",
        tags: ["在校生/应届生", "本科"],
        company: {
            name: "中冶赛迪集团",
            logoURL:
                "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_internet.png",
            address: "上海",
        },
    },
    {
        title: "前端开发工程师实习生",
        salary: "3千-4千",
        tags: ["在校生/应届生", "本科"],
        company: {
            name: "中国电信研究院",
            logoURL:
                "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_internet.png",
            address: "成都-武侯区",
        },
    },
    {
        title: "亚马逊产品开发岗实习生",
        salary: "7千-1万",
        tags: ["在校生/应届生", "本科", "全职"],
        company: {
            name: "广州艾科米尔电子商务有限公司",
            logoURL:
                "https://img01.51jobcdn.com/fansImg/CompLogo/5/4230/4229106/4229106_300.png",
            address: "广州-天河区",
        },
    },
    {
        title: "高级前端开发工程师",
        salary: "8千-1.1万",
        tags: ["在校生/应届生", "本科"],
        company: {
            name: "上海识装信息科技有限公司",
            logoURL:
                "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
            address: "上海",
        },
    },
    {
        title: "前端开发实习生",
        salary: "6千-9千",
        tags: ["在校生/应届生", "本科"],
        company: {
            name: "中冶赛迪集团",
            logoURL:
                "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
            address: "成都-武侯区",
        },
    },
    {
        title: "IOS开发工程师",
        salary: "1万-1.2万",
        tags: ["在校生/应届生", "本科"],
        company: {
            name: "三快科技有限公司",
            logoURL:
                "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
            address: "上海-杨浦区",
        },
    },
]);
const activeTab = ref<number>(0);
const handleTabChange = (index: number) => {
    activeTab.value = index;
    if (jobCategorizations.value[index].title === "金融") {
        jobList.value = [
            {
                title: "银行贷款专员-实习",
                salary: "2-4万",
                tags: ["在校生/应届生", "本科", "银行", "市场开拓"],
                company: {
                    name: "恒昌国际投资担保（北京）",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京-朝阳区",
                },
            },
            {
                title: "银行贷款专员",
                salary: "5-10K",
                tags: ["北京", "本科", "银行", "全职"],
                company: {
                    name: "巨程普惠",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京",
                },
            },
            {
                title: "银行贷款客户经理",
                salary: "2-4万",
                tags: ["在校生/应届生", "本科", "银行"],
                company: {
                    name: "北京恒衍鑫商务咨询",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京-朝阳区",
                },
            },
            {
                title: "银行贷款专员",
                salary: "1-3万",
                tags: ["在校生/应届生", "本科", "银行", "市场开拓"],
                company: {
                    name: "恒昌国际投资担保（北京）",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京-朝阳区",
                },
            },
            {
                title: "贷款专员-实习",
                salary: "3-5K",
                tags: ["在校生", "本科", "银行"],
                company: {
                    name: "昌济国际投资担保",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京-朝阳区",
                },
            },
            {
                title: "银行贷款专员-实习",
                salary: "2-4万",
                tags: ["在校生/应届生", "本科", "银行", "市场开拓"],
                company: {
                    name: "恒昌国际投资担保（北京）",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_finance.png",
                    address: "北京-朝阳区",
                },
            },
        ];
    } else {
        jobList.value = [
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
            {
                title: "前端开发工程师",
                salary: "7千-1万",
                tags: ["在校生/应届生", "本科"],
                company: {
                    name: "中冶赛迪集团",
                    logoURL:
                        "https://img04.51jobcdn.com/im/mkt/app/51job_phone/app/homelogo/new/home_logo_default_rawmaterial.png",
                    address: "成都-武侯区",
                },
            },
        ];
    }
};
const navigateToEnterprise = () => {
    router.push("xxx");
};
</script>

<style scoped lang="scss">
.featured-jobs {
    width: 100%;
    max-width: 1200px;

    h2 {
        margin-bottom: 30px;
    }

    .featured-jobs-box {
        margin-top: 10px;
        width: 100%;
        border-radius: 12px;
        background: linear-gradient(135deg, #f4ffff 0, #fcfbfa 100%);
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 24px 20px;
        grid-row-gap: 20px;
        grid-column-gap: 20px;

        .job-list-item {
            border: 1px solid #edeff2;
            height: 150px;
            border-radius: 12px;
            padding: 16px 20px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            user-select: none;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            .job-list-item-top {
                display: flex;
                width: 100%;
                flex: 1;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;

                .job-list-item-title {
                    max-width: 200px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    transition: all linear 0.2s;
                }

                .job-list-item-salary {
                    font-size: 16px;
                    color: #3ec6c5;
                    flex: 1;
                    text-align: right;
                    font-weight: 500;
                }
            }

            .job-list-item-tagbox {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-bottom: 12px;
                text-align: left;
                font-size: 13px;
                color: #666;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                .job-list-item-tag {
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

            .job-list-item-company {
                display: flex;
                flex: 1;
                width: 100%;
                justify-content: space-between;
                font-size: 13px;
                font-weight: 600;
                align-items: flex-end;

                .left {
                    display: flex;
                    align-items: flex-end;
                    .logo {
                        width: 44px;
                        height: 44px;
                        border-radius: 4px;
                        border: 1px solid #edeff2;
                        margin-right: 5px;

                        img {
                            width: 100%;
                        }
                    }
                }
                .job-list-item-com-address {
                    color: #666;
                }
            }
            &:hover {
                transform: scale(1.05);

                .job-list-item-title {
                    font-weight: 700;
                    color: #00a6a7;
                    transform: scale(1.01);
                }
            }
        }
    }

    .featured-jobs-more {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;

        .featured-jobs-btn {
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
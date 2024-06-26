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
                    @click="goToDetail(jobIndex)"
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
        <!-- <div class="featured-jobs-more">
            <button class="featured-jobs-btn" @click="navigateToEnterprise">
                查看更多
            </button>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Tabs from "../Tabs/index.vue";
import { getCategoryList, getPositionByCategory } from "../../api/jobs/index";
import router from "../../router";

interface Job {
    positionId: number;
    title: string;
    salary: string;
    tags: string[];
    company: {
        name: string;
        logoURL: string;
        address: string;
    };
}

interface JobCategorization {
    categoryId: number;
    categoryName: string;
    description: string;
}

const jobCategorizations = ref<JobCategorization[]>([]);
const jobList = ref<Job[]>([]);
const activeTab = ref<number>(0);

const getCategory = async () => {
    const { data } = await getCategoryList();
    jobCategorizations.value = data.slice(0, 6);
    if (jobCategorizations.value.length) handleTabChange(0);
};

const getPosition = async (categoryId: number) => {
    const path = {
        categoryId,
        page: "1",
    };
    const { data } = await getPositionByCategory(path, { limit: 6 });
    jobList.value = data.posInfo.list.map((item: any) => {
        return {
            positionId: item.positionId,
            title: item.title,
            salary: `${item.salaryUp}K-${item.salaryDown}K`,
            tags: item.tags ? item.tags.split(",") : [],
            company: {
                name: item.companyName,
                logoURL: `http://162.14.111.43:8080/${item.logoImageBig}`,
                address: item.workCity,
            },
        };
    });
};

const handleTabChange = (tabIndex: number) => {
    activeTab.value = tabIndex;
    const categoryId = jobCategorizations.value[tabIndex].categoryId;
    getPosition(categoryId);
};

const goToDetail = (index: number) => {
    const { positionId } = jobList.value[index];
    router.push(`/job-detail?positionId=${positionId}`);
};

onMounted(async () => {
    await getCategory();
});
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
<template>
    <div class="recommended-positions">
        <h2>推荐职位</h2>

        <ul class="recommended-positions-box">
            <li
                @click="goToDetail(jobIndex)"
                class="recommended-positions-item"
                v-for="(job, jobIndex) in jobList"
                :key="jobIndex"
            >
                <p class="recommended-positions-item-top">
                    <span class="recommended-positions-item-title">{{
                        job.title
                    }}</span
                    ><span class="recommended-positions-item-salary">{{
                        job.salary
                    }}</span>
                </p>
                <p class="recommended-positions-item-tagbox">
                    <span
                        class="recommended-positions-item-tag"
                        v-for="(tag, tagIndex) in job.tags"
                        :key="tagIndex"
                        >{{ tag }}</span
                    >
                </p>
                <div class="recommended-positions-item-company">
                    <div class="left">
                        <div class="logo">
                            <img :src="job.company.logoURL" />
                        </div>
                        <span class="recommended-positions-item-company-name">{{
                            job.company.name
                        }}</span>
                    </div>
                    <span class="recommended-positions-item-com-address">{{
                        job.company.address
                    }}</span>
                </div>
            </li>
            <Loading :loading="loading" />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRecommendedPositions } from "../../api/jobs";
import router from "../../router";
import Loading from "../../components/Loading/index.vue";

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
const jobList = ref<Job[]>([]);
const loading = ref(false);

const getRecommendedJobs = async () => {
    loading.value = true;
    const { data } = await getRecommendedPositions(
        { page: "1" },
        { limit: 12 }
    );
    loading.value = false;
    jobList.value = data.posInfo.map((item: any) => {
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

const goToDetail = (index: number) => {
    const { positionId } = jobList.value[index];
    router.push(`/job-detail?positionId=${positionId}`);
};

onMounted(async () => {
    await getRecommendedJobs();
});
</script>

<style scoped lang="scss">
.recommended-positions {
    width: 100%;
    max-width: 1200px;

    .recommended-positions-box {
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
        position: relative;
        min-height: 300px;

        &:deep() {
            .loading-wrapper {
                position: absolute;
                width: 100%;
                height: 100%;
                background: transparent;

                .loading {
                    width: 10px;
                    height: 10px;

                    i {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }

        .recommended-positions-item {
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

            .recommended-positions-item-top {
                display: flex;
                width: 100%;
                flex: 1;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;

                .recommended-positions-item-title {
                    max-width: 200px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    transition: all linear 0.2s;
                }

                .recommended-positions-item-salary {
                    font-size: 16px;
                    color: #3ec6c5;
                    flex: 1;
                    text-align: right;
                    font-weight: 500;
                }
            }

            .recommended-positions-item-tagbox {
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

                .recommended-positions-item-tag {
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

            .recommended-positions-item-company {
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
                .recommended-positions-item-com-address {
                    color: #666;
                }
            }
            &:hover {
                transform: scale(1.05);

                .recommended-positions-item-title {
                    font-weight: 700;
                    color: #00a6a7;
                    transform: scale(1.01);
                }
            }
        }
    }
}
</style>

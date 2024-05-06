<template>
    <div class="search-list">
        <div
            class="search-list-item"
            v-for="position in positions"
            :key="position.positionId"
        >
            <div
                class="search-list-item-content"
                @click="goToDetail(position.positionId)"
            >
                <div class="left">
                    <div class="left-title">
                        <div class="left-title-name">{{ position.title }}</div>
                    </div>
                    <div class="left-tag">
                        <span
                            class="left-tag-item"
                            v-for="tag in position.tags"
                            :key="tag"
                            >{{ tag }}</span
                        >
                    </div>
                    <div
                        class="left-describe"
                        v-if="position.tags.length === 0"
                    >
                        <span class="left-desc">{{
                            position.description
                        }}</span>
                    </div>
                    <div class="left-detail">
                        <img
                            :src="position.imgSrc"
                            alt="img"
                            class="left-detail-img"
                        />
                        <div class="left-detail-text left-detail-company">
                            {{ position.company }}
                        </div>
                        <div class="left-detail-text">
                            {{ position.releaseDate }}
                        </div>
                        <span class="line"></span>
                        <div class="left-detail-text">
                            {{ position.workCity }}
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="right-salary">{{ position.salary }}</div>
                    <div
                        v-if="!isDelivery"
                        class="right-btn"
                        @click.stop="goToDetail(position.positionId)"
                    >
                        立即申请
                    </div>
                </div>
            </div>
        </div>

        <div class="search-list-empty" v-if="positions.length === 0">
            <el-empty :image-size="200" description="暂无数据" />
        </div>
        <div class="search-list-pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalItems"
                :current-page="pagination.page"
                :page-size="pagination.limit"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRecommendedPositions, searchPosition } from "../../api/jobs";
import moment from "moment";
import { watch } from "vue";
import router from "../../router";

interface Position {
    positionId: string;
    title: string | null;
    imgSrc: string | null;
    company: string | null;
    releaseDate: string | null;
    workCity: string | null;
    tags: string[];
    salary: string | null;
    description: string | null;
}

const props = defineProps({
    keyWord: {
        type: String,
        default: "",
    },
    filterSettings: {
        type: Object,
        default: () => ({
            categoryId: 0,
            salaryId: "salaryUp",
        }),
    },
    types: {
        type: String,
        required: true,
    },
});
const positions = ref<Position[]>([]);
const totalItems = ref(0);
const isDelivery = ref<boolean>(false);
const pagination = ref({
    page: 1,
    limit: 10,
});

const mapToFrontendPosition = (data: any): Position => {
    let tagsArray = data.tags ? data.tags.split(",") : [];
    let salary = `${data.salaryDown}K-${data.salaryUp}K`;

    return {
        positionId: data.positionId,
        title: data.title || "",
        imgSrc: `http://162.14.111.43:8080/${data.logoImageBig}`,
        company: data.companyName,
        releaseDate: moment(data.releaseDate).format("YYYY/MM/DD"),
        workCity: data.workCity,
        tags: tagsArray,
        salary: salary,
        description: data.description,
    };
};

const fetchPositions = async (page = pagination.value.page) => {
    try {
        if (props.types === "search") {
            const response = await searchPosition({
                keyword: props.keyWord.trim(),
                orderBy: props.filterSettings.salaryId,
                page: page,
                limit: pagination.value.limit,
                categoryId: props.filterSettings.categoryId,
            });
            positions.value = response.data.posInfo.list.map(
                mapToFrontendPosition
            );
            totalItems.value = response.data.posInfo.total;
        } else if (props.types === "recommend") {
            const response = await getRecommendedPositions(
                { page: page.toString() },
                { limit: pagination.value.limit }
            );
            positions.value = response.data.posInfo.map((item: any) => {
                return {
                    positionId: item.positionId,
                    title: item.title,
                    salary: `${item.salaryUp}K-${item.salaryDown}K`,
                    tags: item.tags ? item.tags.split(",") : [],
                    imgSrc: `http://162.14.111.43:8080/${item.logoImageBig}`,
                    company: item.companyName,
                    releaseDate: moment(item.releaseDate).format("YYYY/MM/DD"),
                    workCity: item.workCity,
                    description: item.description,
                };
            });
            totalItems.value = response.data.total;
        }
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    await fetchPositions();
});

const handlePageChange = (newPage: number) => {
    pagination.value.page = newPage;
    fetchPositions(newPage);
};

const goToDetail = (positionId: string) => {
    router.push(`/job-detail?positionId=${positionId}`);
};

watch(
    () => [props.keyWord, props.filterSettings],
    async (newValues, oldValues) => {
        await fetchPositions();
    }
);
</script>

<style scoped lang="scss">
.search-list {
    min-height: 400px;
    position: relative;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .search-list-empty {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 600px;
        width: 100%;
    }

    .search-list-item {
        background-color: #fff;
        margin-bottom: 15px;
        border-radius: 12px;
        padding: 16px 24px;
        width: 100%;
        max-width: 1000px;
        min-height: 170px;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease-in-out;

        .search-list-item-content {
            cursor: pointer;
            display: flex;
            height: 100%;
            width: 100%;

            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                width: calc(100% - 230px);

                .left-title {
                    display: flex;
                    align-items: center;
                    .left-title-name {
                        color: #222;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 700;
                        height: 22px;
                        transition: all 0.3s ease-in-out;
                    }
                }

                .left-tag {
                    margin-top: 12px;
                    text-align: left;

                    .left-tag-item {
                        background-color: #f5f6f7;
                        border-radius: 6px;
                        color: #7c8087;
                        cursor: pointer;
                        display: inline-block;
                        font-size: 13px;
                        height: 24px;
                        line-height: 24px;
                        margin-right: 8px;
                        margin-bottom: 4px;
                        padding: 0 8px;
                    }
                }

                .left-describe {
                    margin-top: 12px;
                    width: 100%;

                    .left-desc {
                        padding: 8px;
                        text-align: left;
                        color: #666;
                        border-radius: 12px;
                        background-color: #f0efef;
                        cursor: pointer;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                        white-space: nowrap;
                    }
                }

                .left-detail {
                    align-items: center;
                    display: flex;
                    height: 32px;
                    margin-top: 12px;

                    .left-detail-img {
                        border: 1px solid rgba(225, 227, 232, 0.3);
                        border-radius: 6px;
                        margin-right: 10px;
                        height: 32px;
                        width: 32px;
                    }

                    .left-detail-text {
                        font-size: 14px;
                        line-height: 22px;
                        margin: 0 4px;
                        color: #666;
                        max-width: 180px;
                    }

                    .left-detail-company {
                        font-weight: 700;
                        color: #222;
                        font-size: 14px;
                    }

                    .line {
                        background-color: #e1e3e8;
                        display: inline-block;
                        height: 10px;
                        margin: 0 4px;
                        width: 1px;
                    }
                }
            }

            .right {
                width: 230px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;

                .right-salary {
                    color: #3ec6c5;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 20px;
                    text-align: right;
                }

                .right-btn {
                    align-items: center;
                    border: 1px solid #3ec6c5;
                    border-radius: 8px;
                    color: #fff;
                    background: #3ec6c5;
                    cursor: pointer;
                    display: flex;
                    font-size: 14px;
                    height: 36px;
                    font-weight: 700;
                    justify-content: center;
                    width: 100px;

                    &.active {
                        background: #00bebd;
                        color: #fff;
                    }
                }
            }
        }

        &:hover {
            transform: scale(1.01);

            .left-title-name {
                color: #00bebd !important;
            }
        }
    }

    .search-list-pagination {
        display: flex;
        width: 100%;
        justify-content: center;
        margin: 36px 0;

        &:deep() {
            &.el-pagination.is-background .el-pager li.is-active {
                border-radius: 6px;
                background-color: #3ec6c5;
            }

            &.el-pagination.is-background .el-pager li {
                margin: 0 4px;
                border-radius: 6px;
                font-weight: 700;
                background-color: #fff;

                &:not(.is-active):hover {
                    color: #00bebd;
                }
            }

            &.el-pagination.is-background .btn-prev,
            .btn-next {
                border-radius: 6px;
                background-color: #fff;
            }
        }
    }
}
</style>
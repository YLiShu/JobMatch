<template>
    <div class="search-list">
        <div
            class="search-list-item"
            v-for="position in positions"
            :key="position.title"
        >
            <div class="search-list-item-content">
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
                            {{ position.companyType }}
                        </div>
                        <span class="line"></span>
                        <div class="left-detail-text">
                            {{ position.industry }}
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="right-salary">{{ position.salary }}</div>
                    <div class="right-btn">立即申请</div>
                </div>
            </div>
        </div>
        <div class="search-list-pagination">
            <el-pagination background layout="prev, pager, next" :total="100" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    positions_1,
    positions_2,
    positions_z_1,
    positions_z_2,
} from "./mock.ts";
const positions = ref(positions_z_1);
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
<template>
    <div class="job-title">
        <div class="job-title-left">
            <div class="job-title-left-top">
                <div class="job">亚马逊产品开发岗实习生</div>
                <div class="salary">3.3-4千</div>
            </div>
            <div class="job-title-left-center">
                <div
                    class="item"
                    v-for="(jobInfoTag, index) in jobInfoTags"
                    :key="index"
                >
                    <img :src="jobInfoTag.img" alt="" /><span>{{
                        jobInfoTag.content
                    }}</span>
                </div>
            </div>
            <div class="job-title-left-bottom">
                <div class="tag">专业培训</div>
                <div class="tag">员工旅游</div>
                <div class="tag">假日福利</div>
                <div class="tag">下午茶零食</div>
            </div>
        </div>
        <div class="job-title-right">
            <div class="collect job-title-right-btn">
                <span>收藏</span>
            </div>
            <div class="right-appload-btn job-title-right-btn">先聊聊</div>
            <div class="delivery-btn job-title-right-btn">立即申请</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const jobInfoTags = ref([
    {
        img: "xxx",
        content: "广州-天河区",
    },
    {
        img: "xxx",
        content: "在校生/应届生",
    },
    {
        img: "xxx",
        content: "本科",
    },
    {
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASVJREFUWEftlj1uwkAUhOcZgXIGpDSUGAnMT5ljQEUZQUmOkpQgSio4RkpCDBJQ0iDlDFEQHrQhBTEWuyCDKdbt25337byVZwUJf5Jwf1gA60CkA7PZsrAJ+AwgG9Ml/Uo70i8W8/Ow3hGAav6z5RjgQ0zN/2TkO5OSWhjiCODDX7yS7MTbfK8mIm9Vz3051I4CGJKsXwlgVPXchgWwDlgHrAN370Cyv+LEw0jNxyiOyRyBym/IABOIrE7kh3kcm4bQxJ+3AqKr1juCdsUr9Ez3nryEpiI3BZhOF96WrP2Hk6eAbO4dkAHA98N6SmRcKrm+7kDaR6lqvgn4qROKqqcdKesg7h9AnSx6BOqJhUdVJ7EOOxDbCC6x/pw92hGcI3bJWguwA6UCwiGQwxKcAAAAAElFTkSuQmCC",
        content: "全职",
    },
    {
        img: "xxx",
        content: "更新于03-28",
    },
]);
</script>

<style scoped lang="scss">
.job-title {
    background-color: #fff;
    display: flex;
    margin: 0 auto;
    padding: 24px;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    align-items: center;
    max-width: 1200px;
    width: 100%;

    .job-title-left {
        flex: 1;

        .job-title-left-top {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-right: 40px;

            .job {
                color: #222;
                line-height: 50px;
                max-width: 550px;
                font-size: 36px;
                font-weight: 600;
            }

            .salary {
                color: #3ec6c5;
                height: 48px;
                line-height: 48px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 36px;
                font-weight: 600;
            }
        }

        .job-title-left-center {
            display: flex;
            flex-wrap: wrap;

            .item {
                align-items: center;
                color: #222;
                display: flex;
                font-size: 14px;
                font-weight: 400;
                height: 20px;
                line-height: 20px;
                margin-right: 24px;
                margin-top: 12px;

                img {
                    height: 16px;
                    width: 16px;
                }
            }
        }

        .job-title-left-bottom {
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;

            .tag {
                background-color: #ecfffd;
                border: 1px solid #a6fdf7;
                border-radius: 6px;
                color: #3ec6c5;
                margin: 4px 8px 4px 0;
                max-width: 100px;
                overflow: hidden;
                padding: 4px 8px;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
            }
        }
    }

    .job-title-right {
        align-items: center;
        display: flex;
        position: relative;
        width: fit-content;

        .job-title-right-btn {
            align-items: center;
            border: 1px solid #3ec6c5;
            border-radius: 8px;
            color: #3ec6c5;
            cursor: pointer;
            display: flex;
            font-size: 18px;
            height: 48px;
            justify-content: center;
            margin-right: 12px;
            width: 130px;
        }
    }
}
</style>
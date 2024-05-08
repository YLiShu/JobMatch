<template>
    <div class="job-title">
        <div class="job-title-left">
            <div class="job-title-left-top">
                <div class="job">{{ content.title }}</div>
                <div class="salary">{{ content.salary }}</div>
            </div>
            <!-- <div class="job-title-left-center">
                <div
                    class="item"
                    v-for="(jobInfoTag, index) in jobInfoTags"
                    :key="index"
                >
                    <img :src="jobInfoTag.img" alt="" /><span>{{
                        jobInfoTag.content
                    }}</span>
                </div>
            </div> -->
            <div class="job-title-left-bottom">
                <div
                    class="tag"
                    v-for="(jobInfoTag, index) in content.tags"
                    :key="index"
                >
                    {{ jobInfoTag }}
                </div>
            </div>
        </div>
        <div class="job-title-right">
            <div
                class="collect job-title-right-btn"
                v-if="!isCollected"
                @click="handleCollect"
            >
                <span>收藏</span>
            </div>
            <div
                class="active job-title-right-btn"
                v-else
                @click="handleCancelCollect"
            >
                <span>取消收藏</span>
            </div>
            <div
                class="right-appload-btn job-title-right-btn"
                @click="handleChat"
            >
                先聊聊
            </div>
            <div
                class="delivery-btn job-title-right-btn"
                v-if="!isDelivery"
                @click="handleDelivery"
            >
                立即申请
            </div>
            <div class="active delivery-btn job-title-right-btn" v-else>
                已申请
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    content: {
        type: Object,
        required: true,
    },
    isDelivery: {
        type: Boolean,
        required: true,
    },
    isCollected: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits([
    "collectedHandler",
    "cancelCollectedHandler",
    "deliveryHandler",
    "chatHandler",
]);
const handleCollect = () => {
    emit("collectedHandler");
};

const handleCancelCollect = () => {
    emit("cancelCollectedHandler");
};

const handleDelivery = () => {
    emit("deliveryHandler");
};

const handleChat = () => {
    emit("chatHandler");
};
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

            &.active {
                background: #3ec6c5;
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div class="job-condition">
        <div class="job-address">
            <h3 class="job-address-title">工作地址</h3>
            <div class="job-address-text">
                <span>{{ content.address }}</span>
            </div>

            <img
                class="job-address-img"
                src="https://iconfont.alicdn.com/p/illus_3d/file/2OEYpu98KSmI/b4943678-fba8-4ac2-b919-d9f71ec9982a.png?image_process=resize,l_1000"
                alt=""
            />
        </div>
        <div class="job-company">
            <h3 class="job-company-title">公司信息</h3>
            <div class="job-company-info">
                <img :src="content.companyLogo" alt="" />
                <div class="job-company-text">
                    <div class="job-company-name">
                        {{ content.companyName }}
                    </div>
                    <div class="job-company-description">
                        <span class="job-company-desc">{{
                            content.description
                        }}</span>
                    </div>
                    <!-- <div class="job-company-tags">
                        <span
                            class="job-company-tag"
                            v-for="(tag, index) in content.tags"
                            :key="index"
                            >{{ tag }}</span
                        >
                    </div> -->
                </div>
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
});
</script>

<style scoped lang="scss">
.job-condition {
    display: flex;
    max-width: 1200px;
    justify-content: space-between;
    width: 100%;

    .job-address {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        padding: 24px;
        display: flex;
        width: 49%;
        position: relative;

        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .job-address-text {
            align-items: center;
            display: flex;
            color: #4c4f54;
            font-size: 14px;
            line-height: 26px;
            margin: 16px 0;

            img {
                height: 16px;
                width: 16px;
            }
        }
    }

    .job-address-img {
        width: 250px;
        right: 0;
        position: absolute;
    }

    .job-company {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        padding: 24px;
        display: flex;
        justify-content: center;
        width: 49%;
        flex-direction: column;
        align-items: flex-start;

        .job-company-info {
            align-items: flex-start;
            display: flex;
            color: #4c4f54;
            font-size: 14px;
            line-height: 26px;
            margin: 16px 0;
            width: 100%;

            img {
                height: 48px;
                width: 48px;
                border-radius: 4px;
                border: 1px solid #aaaaaa;
            }

            .job-company-text {
                margin-left: 15px;
                flex: 1;
                align-items: flex-start;
                justify-content: flex-end;
                display: flex;
                flex-direction: column;
                width: calc(100% - 63px);

                .job-company-name {
                    font-weight: 700;
                    font-size: 16px;
                }

                .job-company-tags {
                    font-size: 14px;
                    margin-top: 5px;

                    .job-company-tag {
                        padding: 2px 8px;
                        color: #666;
                        border-radius: 15px;
                        transition: all 0.3s ease;
                        background-color: #f0efef;
                        cursor: pointer;

                        &:hover {
                            color: #fff;
                            background: #00bebd;
                        }

                        &:not(:last-child) {
                            margin-right: 8px;
                        }
                    }
                }

                .job-company-description {
                    font-size: 14px;
                    margin-top: 5px;
                    width: 100%;

                    .job-company-desc {
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
            }
        }
    }
}
</style>
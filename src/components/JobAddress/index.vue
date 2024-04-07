<template>
    <div class="job-condition">
        <div class="job-address">
            <h3 class="job-address-title">工作地址</h3>
            <div class="job-address-text">
                <img
                    src="https://img01.51jobcdn.com/yjs/img/job-map-d58b178.png"
                    alt=""
                />
                <span>林和西路157号保利中汇大厦A座</span>
            </div>
        </div>
        <div class="job-company">
            <h3 class="job-company-title">公司信息</h3>
            <div class="job-company-info">
                <img
                    src="https://img01.51jobcdn.com/fansImg/CompLogo/5/4230/4229106/4229106_300.png"
                    alt=""
                />
                <div class="job-company-text">
                    <div class="job-company-name">
                        广州艾科米尔电子商务有限公司
                    </div>
                    <div class="job-company-tags">
                        <span class="job-company-tag">民营</span>
                        <span class="job-company-tag">少于50人</span>
                        <span class="job-company-tag">互联网/电子商务</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.job-condition {
    display: flex;
    max-width: 1200px;
    justify-content: space-between;
    width: 100%;

    .job-address {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        padding: 24px;
        display: flex;
        width: 49%;
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
            align-items: flex-end;
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
            }
        }
    }
}
</style>
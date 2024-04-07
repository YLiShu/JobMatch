<template>
    <div class="hot-enterprise-list">
        <h2>热招企业</h2>
        <div class="hot-enterprise-list-box">
            <a
                :href="enterprise.linkTo"
                target="_blank"
                rel="noopener noreferrer"
                class="hot-enterprise-item"
                v-for="(enterprise, index) in enterpriseList"
                :key="index"
            >
                <div class="hot-enterprise-item-img">
                    <img :src="enterprise.src" alt="" />
                </div>
                <div class="hot-enterprise-item-title">
                    {{ enterprise.title }}
                </div>
            </a>
        </div>
        <div class="hot-enterprise-more">
            <button class="hot-enterprise-btn" @click="navigateToEnterprise">
                查看更多
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";

interface enterpriseList {
    src: string;
    linkTo: string;
    title: string;
}

const navigateToEnterprise = () => {
    router.push("xxx");
};

const enterpriseList = ref<enterpriseList[]>([
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38126/38125535/38125535.jpg",
        linkTo: "https://career.abchina.com/build/index.html#/RecruitmentOrgDetails/99/217",
        title: "中国农业银行北京市分行",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38126/38125498/542-280PC2A02.jpg",
        linkTo: "https://cntp.zhiye.com/Campus",
        title: "中国太平保险集团有限责任公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38128/38127214/542-280PC2A01.jpg",
        linkTo: "",
        title: "工行业务研发中心2024春季招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38125/38124860/jsnx.jpg",
        linkTo: "",
        title: "江苏辖区农商银行2024春季招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38126/38125345/542-280PC2A04.jpg",
        linkTo: "",
        title: "三棵树2024春季校园招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38126/38125042/38125042.jpg",
        linkTo: "",
        title: "华夏银行2024春季校园招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38123/38122966/38122966.jpg",
        linkTo: "",
        title: "北方集成电路技术创新中心",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38127/38126386/542-280PC2A02.jpg",
        linkTo: "",
        title: "强生（中国）投资有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38127/38126441/542-280PC2A.jpg",
        linkTo: "",
        title: "华海智汇技术有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38127/38126636/38126636.jpg",
        linkTo: "",
        title: "泸州老窖股份有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38127/38126459/38126459.jpg",
        linkTo: "",
        title: "中国宝武钢铁集团有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38125/38124538/542-280PC2A03.jpg",
        linkTo: "",
        title: "中国移动咪咕公司2024校园招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38127/38126255/542-280PC2A03-1.jpg",
        linkTo: "",
        title: "北京达佳互联信息技术有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38122/38121694/38121694.jpg",
        linkTo: "",
        title: "上海浦东发展银行股份有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38080/38079853/542-280PC2A05.jpg",
        linkTo: "",
        title: "中国民生银行股份有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38064/38063216/zx.jpg",
        linkTo: "",
        title: "中信银行2024年校园招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38124/38123877/542-280PC2A07.jpg",
        linkTo: "",
        title: "中国太平洋产险2024校园招聘",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38126/38125625/38125622.jpg",
        linkTo: "",
        title: "中移物联网有限公司",
    },
    {
        src: "https://img01.51jobcdn.com/im/images/ads/39/38124/38123722/542-280PC2A05.jpg",
        linkTo: "",
        title: "中国移动终端公司2024校园招聘",
    },
]);
</script>

<style scoped lang="scss">
.hot-enterprise-list {
    max-width: 1200px;
    width: 100%;

    .hot-enterprise-list-box {
        margin-top: 15px;
        width: 100%;
        border-radius: 12px;
        background: linear-gradient(135deg, #eff6f6 0, #ffffff 100%);
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        display: inline-grid;
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: 20px;
        grid-column-gap: 20px;
        padding: 20px;

        .hot-enterprise-item {
            width: 100%;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease-in-out;
            position: relative;
            color: #6cb5b5;
            display: block;

            .hot-enterprise-item-img {
                height: 140px;
                width: 100%;
                border-radius: 12px;
                overflow: hidden;

                img {
                    height: 100%;
                    width: 100%;
                }
            }

            .hot-enterprise-item-title {
                bottom: 0;
                position: absolute;
                font-size: 14px;
                border-radius: 0 0 12px 12px;
                width: 100%;
                height: 40px;
                -webkit-backdrop-filter: blur(3px);
                backdrop-filter: blur(3px);
                display: none;
                background: rgba(0, 0, 0, 0.3);
            }

            &:hover {
                color: #53e6e6;
                font-weight: 900;
                transform: scale(1.05);

                .hot-enterprise-item-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

    .hot-enterprise-more {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;

        .hot-enterprise-btn {
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
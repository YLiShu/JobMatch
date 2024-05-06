<template>
    <div class="container" ref="containerRef">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="isScroll" />
            </div>
            <div class="job-title-container">
                <JobTitle
                    :content="jobTitleContent"
                    :isCollected="isCollected"
                    :isDelivery="isDelivery"
                    @collectedHandler="collectedHandler"
                    @cancelCollectedHandler="cancelCollectedHandler"
                    @deliveryHandler="deliveryHandler"
                />
            </div>
        </div>
        <div class="content">
            <div class="job-info-container">
                <JobInfo :content="jobInfoContent" />
            </div>
            <div class="job-address-container">
                <JobAddress :content="jobAddressContent" />
            </div>
            <div class="job-safe-tips-container">
                <SafeTips />
            </div>
            <div class="company-info-container">
                <JobInfo :content="companyInfoContent" />
            </div>
        </div>
        <div class="footer">
            <Footer />
        </div>
        <div class="side-bar-container">
            <SideBar :isShow="isScroll" @backUp="backUpHandler" />
        </div>
    </div>
</template>

<script setup lang="ts">
import HeadNav from "../../components/HeadNav/index.vue";
import JobTitle from "../../components/JobTitle/index.vue";
import JobInfo from "../../components/JobInfo/index.vue";
import JobAddress from "../../components/JobAddress/index.vue";
import SafeTips from "../../components/SafeTips/index.vue";
import Footer from "../../components/Footer/index.vue";
import SideBar from "../../components/SideBar/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {
    cancelCollectedPosition,
    collectedPosition,
    deliveryPosition,
    getApplyOrNotPosition,
    getFavorOrNotPosition,
    getPositionDetail,
} from "../../api/jobs";
import messageHelper from "../../utils/tools/message";
import { useRoute } from "vue-router";

interface JobTitleContent {
    title: string | null;
    salary: string | null;
    tags: string[];
}

interface JobInfoContent {
    title: string | null;
    content: string | null;
}

interface CompanyInfoContent {
    title: string | null;
    content: string | null;
}

interface JobAddressContent {
    address: string | null;
    companyLogo: string | null;
    companyName: string | null;
    tags?: string[];
    description: string | null;
}

const isScroll = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);
const isCollected = ref<boolean>(false);
const isDelivery = ref<boolean>(false);

const route = useRoute();
const positionId = route.query.positionId as string;

const jobTitleContent = ref<JobTitleContent>({
    title: "",
    salary: "",
    tags: [],
});

const jobInfoContent = ref<JobInfoContent>({
    title: "职位信息",
    content: "",
});

const companyInfoContent = ref<CompanyInfoContent>({
    title: "公司详情",
    content: "",
});

const jobAddressContent = ref<JobAddressContent>({
    address: null,
    companyLogo: null,
    companyName: null,
    tags: [],
    description: null,
});

const getJobDetail = async () => {
    if (!positionId) return;

    try {
        const { data } = await getPositionDetail(
            { page: "1", positionId },
            { limit: 12 }
        );

        if (data) {
            let tagsArray = data.position.tags
                ? data.position.tags.split(",")
                : [];
            const workCity = data.position.workCity
                ? `${data.position.workCity}`
                : "";
            const releaseDate = data.position.releaseDate
                ? `${new Date(data.position.releaseDate).toLocaleDateString()}`
                : "";
            if (workCity) tagsArray.push(workCity);
            if (releaseDate) tagsArray.push(releaseDate);
            jobTitleContent.value = {
                title: data.position.title,
                salary: `${data.position.salaryDown}K-${data.position.salaryUp}K`,
                tags: tagsArray,
            };
            jobInfoContent.value = {
                title: "职位信息",
                content: data.position.describe,
            };
            companyInfoContent.value = {
                title: "公司详情",
                content: data.company.description,
            };
            jobAddressContent.value = {
                address: workCity,
                companyLogo: `http://162.14.111.43:8080/${data.company.logoImageBig}`,
                companyName: data.company.companyName,
                tags: [],
                description: data.company.description,
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const getFavorOrNot = async () => {
    const { data } = await getFavorOrNotPosition({ positionId });
    isCollected.value = data;
};

const getApplyOrNot = async () => {
    const { data } = await getApplyOrNotPosition({ positionId });
    isDelivery.value = data;
};

const collectedHandler = async () => {
    try {
        await collectedPosition({ positionId });
        messageHelper.success("收藏成功！");
        await getFavorOrNot();
    } catch (error) {
        console.error(error);
        messageHelper.error("收藏失败！");
    }
};
const cancelCollectedHandler = async () => {
    try {
        await cancelCollectedPosition({ positionId });
        messageHelper.success("取消收藏成功！");
        await getFavorOrNot();
    } catch (error) {
        console.error(error);
        messageHelper.error("取消收藏失败！");
    }
};
const deliveryHandler = async () => {
    try {
        await deliveryPosition({ positionId });
        messageHelper.success("投递成功！");
        await getApplyOrNot();
    } catch (error) {
        console.error(error);
        messageHelper.error("投递失败！");
    }
};

const handleScroll = () => {
    if (containerRef.value) {
        const top = containerRef.value.scrollTop;
        isScroll.value = top > 100;
    }
};

const backUpHandler = () => {
    if (containerRef.value) {
        containerRef.value.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
};

onMounted(async () => {
    await getJobDetail();
    await getFavorOrNot();
    await getApplyOrNot();
    if (containerRef.value) {
        containerRef.value.addEventListener("scroll", handleScroll);
    }
});

onUnmounted(() => {
    if (containerRef.value) {
        containerRef.value.removeEventListener("scroll", handleScroll);
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: linear-gradient(180deg, #00bebd 0, #e8fafa 50%, #f9f9f9 100%);

    .content {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-shrink: 0;
        margin-top: 20px;
        width: 100%;
        background: transparent;

        .job-info-container {
            display: flex;
            max-width: 1200px;
            width: 100%;
        }

        .job-address-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }

        .job-safe-tips-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }

        .company-info-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }
    }

    .header {
        height: auto;
        display: flex;
        flex-direction: column;

        .job-title-container {
            margin-top: 20px;
        }
    }

    .footer {
        margin-top: 20px;
    }

    .side-bar-container {
        position: fixed;
        bottom: 80px;
        right: 20px;
    }
}
</style>

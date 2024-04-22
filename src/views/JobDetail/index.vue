<template>
    <div class="container" ref="containerRef">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="isScroll" />
            </div>
            <div class="job-title-container">
                <JobTitle />
            </div>
        </div>
        <div class="content">
            <div class="job-info-container">
                <JobInfo
                    :content="jobInfoMock.jobContent"
                    :title="jobInfoMock.jobTitle"
                />
            </div>
            <div class="job-address-container">
                <JobAddress />
            </div>
            <div class="job-safe-tips-container">
                <SafeTips />
            </div>
            <div class="company-info-container">
                <JobInfo
                    :content="companyInfoMock.companyContent"
                    :title="companyInfoMock.companyTitle"
                />
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
import { jobInfoMock, companyInfoMock } from "./mock";

const isScroll = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);

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

onMounted(() => {
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

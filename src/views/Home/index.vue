<template>
    <div class="container" ref="containerRef">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="isScroll" />
            </div>
            <div class="search-bar">
                <SearchBar :isFixed="isScroll" />
            </div>
        </div>
        <div class="content">
            <CityBar />
            <div class="industry-ad-container">
                <div class="industry-container">
                    <IndustryNav />
                </div>
                <div class="ad-container">
                    <AdCarousel />
                </div>
            </div>
            <div class="featured-jobs-container">
                <FeaturedJobs />
            </div>
            <div class="hot-enterprise-positions-container">
                <HotEnterPrisePositions />
            </div>
            <div class="hot-enterprises-container">
                <HotEnterPriseList />
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
import SearchBar from "../../components/SearchBar/index.vue";
import Footer from "../../components/Footer/index.vue";
import CityBar from "../../components/CityBar/index.vue";
import IndustryNav from "../../components/IndustryNav/index.vue";
import AdCarousel from "../../components/AdCarousel/index.vue";
import HotEnterPriseList from "../../components/HotEnterPriseList/index.vue";
import SideBar from "../../components/SideBar/index.vue";
import FeaturedJobs from "../../components/FeaturedJobs/index.vue";
import HotEnterPrisePositions from "../../components/HotEnterprisePositions/index.vue";
import { onMounted, onUnmounted, ref } from "vue";

const isScroll = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
    if (containerRef.value) {
        const top = containerRef.value.scrollTop;
        isScroll.value = top > 240;
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

        .industry-ad-container {
            display: flex;
            max-width: 1200px;
            width: 100%;
            justify-content: space-between;

            .ad-container {
                flex: 1;
                margin-left: 20px;
                box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
                border-radius: 12px;
                overflow: hidden;
            }
        }

        .featured-jobs-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }

        .hot-enterprises-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }

        .hot-enterprise-positions-container {
            max-width: 1200px;
            width: 100%;
            margin-top: 30px;
        }
    }

    .header {
        height: auto;
        display: flex;
        flex-direction: column;

        .search-bar {
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
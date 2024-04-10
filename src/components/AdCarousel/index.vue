<template>
    <div class="ad-carousel">
        <div class="swiper-container">
            <div
                class="swiper-wrapper"
                :style="{
                    transform: `translateX(-${currentAdIndex * 100}%)`,
                }"
            >
                <a
                    :href="adCarousel.linkTo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="swiper-slide"
                    v-for="(adCarousel, index) in adCarouselList"
                    :key="index"
                >
                    <img
                        :src="adCarousel.src"
                        alt="carousel-img"
                        class="ad-carousel-img"
                    />
                </a>
            </div>
        </div>
        <div class="swiper-pagination">
            <span
                class="swiper-pagination-item"
                :class="{
                    'swiper-pagination-item-active': currentAdIndex === index,
                }"
                v-for="(adCarousel, index) in adCarouselList"
                :key="index"
                @click="setCurrentAdIndex(index)"
            >
                {{ adCarousel.title }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const currentAdIndex = ref(0);

const setCurrentAdIndex = (index: number) => {
    if (interval) {
        clearInterval(interval);
        startAutoPlay();
    }
    currentAdIndex.value = index;
};

let interval: any;
const startAutoPlay = () => {
    interval = setInterval(() => {
        currentAdIndex.value =
            (currentAdIndex.value + 1) % adCarouselList.value.length;
    }, 3000);
};

const stopAutoPlay = () => {
    clearInterval(interval);
};

onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});

interface adCarouselList {
    src: string;
    title: string;
    linkTo: string;
}

const adCarouselList = ref<adCarouselList[]>([
    {
        src: "https://lf3-atsx-tob.feishucdn.com/obj/static-atsx-online-ee-tob/939416d59711a3ad896a1b64e01fff97/9bd51c1c50ae25f0ee6304d29bea564c1b00bd2934949cec84fc895d45adee7f.png",
        title: "得物招聘",
        linkTo: "https://campus.dewu.com/578078/position/list",
    },
    {
        src: "https://s3plus.meituan.net/zhaopin-official-website-prod/imgs/campus/swiper_qihang%402x.png",
        title: "美团招聘",
        linkTo: "https://zhaopin.meituan.com/web/campus",
    },
    {
        src: "https://lf6-files.qingfuwucdn.net/obj/inspirecloud-file/baas/ttoiwq/fca6fccc0425a0f1_1709544382667.png",
        title: "字节跳动招聘",
        linkTo: "https://jobs.bytedance.com/campus/",
    },
]);
</script>

<style scoped lang="scss">
.ad-carousel {
    width: 100%;
    max-width: 900px;
    height: 320px;
    position: relative;

    .swiper-container {
        height: 100%;
        width: 100%;
        display: flex;

        .swiper-wrapper {
            height: 100%;
            width: 100%;
            display: flex;

            .swiper-slide {
                display: block;
                height: 100%;
                width: 100%;
                flex-shrink: 0;
                cursor: pointer;

                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

    .swiper-pagination {
        height: 45px;
        width: 100%;
        position: absolute;
        bottom: 0px;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.4);
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .swiper-pagination-item {
            color: #fff;
            padding: 0 20px;
            text-align: center;
            cursor: pointer;
            width: 20%;

            &:hover {
                font-weight: 900;
                transform: scale(1.05);
            }
        }

        .swiper-pagination-item-active {
            font-weight: 900;
            color: #53e6e6;
        }
    }
}
</style>
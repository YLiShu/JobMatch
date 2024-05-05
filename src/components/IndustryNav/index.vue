<template>
    <div class="industry-nav">
        <div class="industry-nav-title">
            <b>热招职位</b>
            <div class="swiper-pagination">
                <span>{{ currentSlideIndex }}</span>
                <span> / </span>
                <span>{{ totalSlides }}</span>
            </div>
            <div class="swiper-button">
                <button
                    class="swiper-button-prev"
                    @click="prevSlide"
                    :class="{
                        'swiper-button-disable': currentSlideIndex === 1,
                    }"
                >
                    <SvgIcon name="prev" size="16" />
                </button>
                <button
                    class="swiper-button-next"
                    @click="nextSlide"
                    :class="{
                        'swiper-button-disable':
                            currentSlideIndex === totalSlides,
                    }"
                >
                    <SvgIcon name="next" size="16" />
                </button>
            </div>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper" :style="swiperTransform">
                <ul
                    class="swiper-slide"
                    v-for="(
                        chunkedIndustry, chunkedIndustryIndex
                    ) in chunkedIndustryList"
                    :key="chunkedIndustryIndex"
                >
                    <li
                        class="swiper-slide-item"
                        @click="navigateToIndustry(item.categoryId)"
                        v-for="(item, index) in chunkedIndustry"
                        :key="index"
                    >
                        <span class="swiper-slide-text">
                            {{ item.categoryName }}
                        </span>
                        <span class="swiper-slide-btn">
                            <SvgIcon name="go" size="16" />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getCategoryList } from "../../api/jobs";
import router from "../../router";

interface IndustryList {
    categoryId: number;
    categoryName: string;
    description: string;
}

const industryList = ref<IndustryList[]>([]);
const getCategory = async () => {
    const { data } = await getCategoryList();
    industryList.value = data;
};

onMounted(async () => {
    await getCategory();
});

const slideSize = 6;

const chunkedIndustryList = computed(() => {
    let result = [];
    for (let i = 0; i < industryList.value.length; i += slideSize) {
        result.push(industryList.value.slice(i, i + slideSize));
    }
    return result;
});

const totalSlides = computed(() => {
    return chunkedIndustryList.value.length;
});

const swiperTransform = computed(() => {
    return {
        transition: "all ease-in-out 0.5s",
        transform: `translateX(${(1 - currentSlideIndex.value) * 250}px)`,
    };
});

const navigateToIndustry = (categoryId: string) => {
    router.push({ path: `/job-search`, query: { categoryId } });
};

const currentSlideIndex = ref(1);

const updateCurrentSlide = (index: number) => {
    currentSlideIndex.value = index;
};

const prevSlide = () => {
    if (currentSlideIndex.value > 1) {
        updateCurrentSlide(currentSlideIndex.value - 1);
    }
};

const nextSlide = () => {
    if (currentSlideIndex.value < totalSlides.value) {
        updateCurrentSlide(currentSlideIndex.value + 1);
    }
};
</script>

<style scoped lang="scss">
.industry-nav {
    height: 320px;
    width: 280px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #eaf8f8 0, #ffffff 100%);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
    border-radius: 12px;

    .industry-nav-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 15px 25px 5px 25px;

        b {
            flex: 1;
            text-align: left;
        }

        .swiper-pagination {
            flex: 1;
            justify-content: center;
            color: #00bebd;
            font-size: 14px;
            font-weight: 700;
        }

        .swiper-button {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            align-items: center;
            opacity: 0.6;

            .swiper-button-next {
                margin-left: 5px;
            }

            .swiper-button-disable {
                opacity: 0.3;
                &:hover {
                    transform: none;
                }
            }

            button {
                border: none;
                display: flex;
                align-items: center;
                background: transparent;
                outline: none;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }

    .swiper-container {
        overflow: hidden;
        position: relative;
        margin: 5px 15px;
        flex: 1;

        .swiper-wrapper {
            display: flex;
            height: 100%;
            width: 100%;

            .swiper-slide {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                flex-shrink: 0;

                .swiper-slide-item {
                    padding: 0 10px;
                    border-radius: 12px;
                    list-style: none;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;

                    .swiper-slide-text {
                        width: 80%;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    &:hover {
                        background: #00bebd;
                        color: #ffffff;
                        font-weight: 600;
                    }

                    .swiper-slide-btn {
                        display: flex;
                        width: 10%;
                        justify-content: flex-end;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>
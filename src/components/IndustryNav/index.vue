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
                    <svg
                        t="1710907294351"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="24728"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512-282.760533 0-512-229.239467-512-512C0 229.239467 229.239467 0 512 0z m87.381333 306.858667a51.2 51.2 0 0 0-72.362666 0l-168.96 168.96-3.345067 3.618133a51.2 51.2 0 0 0 3.345067 68.778667l168.96 168.96 3.618133 3.310933a51.2 51.2 0 0 0 68.778667-3.345067l3.310933-3.652266a51.2 51.2 0 0 0-3.310933-68.744534L466.602667 512l132.778666-132.778667 3.310934-3.618133a51.2 51.2 0 0 0-3.310934-68.744533z"
                            fill="#00bebd"
                            p-id="24729"
                        ></path>
                    </svg>
                </button>
                <button
                    class="swiper-button-next"
                    @click="nextSlide"
                    :class="{
                        'swiper-button-disable':
                            currentSlideIndex === totalSlides,
                    }"
                >
                    <svg
                        t="1710907355025"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7284"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M512 0C229.239467 0 0 229.239467 0 512c0 282.760533 229.239467 512 512 512 282.760533 0 512-229.239467 512-512 0-282.760533-229.239467-512-512-512z m-87.381333 306.858667a51.2 51.2 0 0 1 72.362666 0l168.96 168.96 3.345067 3.618133a51.2 51.2 0 0 1-3.345067 68.778667l-168.96 168.96-3.618133 3.310933a51.2 51.2 0 0 1-68.778667-3.345067l-3.310933-3.652266a51.2 51.2 0 0 1 3.310933-68.744534L557.397333 512l-132.778666-132.778667-3.310934-3.618133a51.2 51.2 0 0 1 3.310934-68.744533z"
                            fill="#00bebd"
                            p-id="7285"
                        ></path>
                    </svg>
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
                        @click="navigateToIndustry(item.query)"
                        v-for="(item, index) in chunkedIndustry"
                        :key="index"
                    >
                        <span class="swiper-slide-text">
                            {{ item.name }}
                        </span>
                        <span class="swiper-slide-btn"
                            ><svg
                                t="1710921790258"
                                class="icon"
                                viewBox="0 0 1029 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="22722"
                                width="16"
                                height="16"
                            >
                                <path
                                    d="M516.861569 0.511744C234.378811 0.511744 5.117441 229.773113 5.117441 512.255872s229.261369 511.744128 511.744128 511.744128 511.744128-229.261369 511.744128-511.744128S799.344328 0.511744 516.861569 0.511744zM332.121939 556.265867c-24.051974 0-44.009995-19.446277-44.009995-44.009995s19.446277-44.009995 44.009995-44.009995 44.009995 19.446277 44.009995 44.009995-19.446277 44.009995-44.009995 44.009995z m407.86007-31.216392l-153.011494 153.011495c-3.070465 3.582209-7.676162 5.629185-12.793603 5.117441-4.605697 0-9.211394-2.046977-12.793604-5.117441s-5.117441-7.676162-5.117441-12.793604v-92.113943H473.875062c-2.046977 0-4.093953 0.511744-6.140929 0.511744-33.775112 0-60.897551-27.122439-60.897551-60.897551s27.122439-60.897551 60.897551-60.897551c2.046977 0 4.093953 0 6.140929 0.511744h82.390805v-92.113943c0-4.605697 1.535232-9.211394 5.117441-12.793603s7.676162-5.117441 12.793604-5.117441c4.605697 0 9.211394 1.535232 12.793603 5.117441l153.011494 153.011494c3.582209 3.582209 5.117441 7.676162 5.117441 12.793603 0 3.582209-2.046977 8.187906-5.117441 11.770115z"
                                    fill="#f9fdfe"
                                    p-id="22723"
                                ></path></svg
                        ></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import router from "../../router";

const industryList = ref([
    {
        name: "机械/电气设备/自动化/重工/轻工",
        query: "机械/电气设备/自动化/重工/轻工",
    },
    {
        name: "汽车行业(整车及零部件设计生产商)",
        query: "汽车行业(整车及零部件设计生产商)",
    },
    {
        name: "石油/钢铁/电力/能源/煤矿",
        query: "石油/钢铁/电力/能源/煤矿",
    },
    {
        name: "化工/生物/制药/医疗/农林/畜牧/养殖",
        query: "化工/生物/制药/医疗/农林/畜牧/养殖",
    },
    {
        name: "交通运输/物流仓储",
        query: "交通运输/物流仓储",
    },
    {
        name: "仪器仪表/电器/家电/电子类",
        query: "仪器仪表/电器/家电/电子类",
    },
    {
        name: "移动通信/电信运营、增值服务",
        query: "移动通信/电信运营、增值服务",
    },
    {
        name: "通信设备/网络设备",
        query: "通信设备/网络设备",
    },
    {
        name: "芯片/电子技术/半导体/集成电路",
        query: "芯片/电子技术/半导体/集成电路",
    },
    {
        name: "计算机硬件",
        query: "计算机硬件",
    },
    {
        name: "计算机软件",
        query: "计算机软件",
    },
    {
        name: "互联网/电子商务",
        query: "互联网/电子商务",
    },
    {
        name: "银行/投资公司",
        query: "银行/投资公司",
    },
    {
        name: "证券/基金/保险/期货",
        query: "证券/基金/保险/期货",
    },
    {
        name: "会计师事务所/财务公司",
        query: "会计师事务所/财务公司",
    },
    {
        name: "咨询公司/法律/人力资源",
        query: "咨询公司/法律/人力资源",
    },
    {
        name: "消费品/零售/服装/家具/贸易",
        query: "消费品/零售/服装/家具/贸易",
    },
    {
        name: "媒体/广告/旅游/公关/文化/影视/酒店/会展",
        query: "媒体/广告/旅游/公关/文化/影视/酒店/会展",
    },
    {
        name: "建筑/房地产/工程建设",
        query: "建筑/房地产/工程建设",
    },
    {
        name: "教育/国家机关/高校/研究所/事业单位",
        query: "教育/国家机关/高校/研究所/事业单位",
    },
]);

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

const navigateToIndustry = (query: string) => {
    router.push({ path: `/search`, query: { query } });
};

const currentSlideIndex = ref(1);

const updateCurrentSlide = (index) => {
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
    max-width: 280px;
    width: 100%;
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
<template>
    <div class="container" ref="containerRef">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="isScroll" />
            </div>
            
        </div>
        <div class="content">
           <Message_warp></Message_warp>
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
import Footer from "../../components/Footer/index.vue";
import SideBar from "../../components/SideBar/index.vue";
import Message_warp from "../../components/Message-warp/index.vue"; 
import SearchList from "../../components/SearchList/index.vue";
import SearchForm from "../../components/SearchForm/index.vue";
import OtherFilters from "../../components/OtherFilters/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { getUserInfo } from "../../api/user";

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
    }

    .header {
        height: auto;
        display: flex;
        flex-direction: column;

        .job-search-bar {
            background: #fff;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);

            .search-form-container {
                width: 1000px;
                margin-top: 20px;
            }

            .other-filters-container {
                width: 1000px;
                margin: 10px 0;
            }

            &.fixed-top {
                position: fixed;
                top: 50px;
                z-index: 999;
            }
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
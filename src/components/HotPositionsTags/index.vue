<template>
    <div class="search-hot">
        <b>热门职位:</b>
        <span
            v-for="(item, index) in hotPositions"
            :key="index"
            class="link"
            @click="navigateToPosition(item.query)"
        >
            {{ item.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";

const hotPositions = ref([
    { name: "Java", query: "Java" },
    { name: "PHP", query: "PHP" },
    { name: "C#", query: "C#" },
    { name: "Python", query: "Python" },
    { name: "算法工程师", query: "算法工程师" },
    { name: "Android", query: "Android" },
    { name: "测试工程师", query: "测试工程师" },
    { name: "运维工程师", query: "运维工程师" },
    { name: "网络工程师", query: "网络工程师" },
    { name: "IT技术支持", query: "IT技术支持" },
]);

const navigateToPosition = (query: string) => {
    router.push({ path: `/search`, query: { query } });
};
</script>

<style lang="scss" scoped>
.search-hot {
    padding: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    align-items: center;
    justify-content: center;

    b {
        color: #757575;
        margin-right: 10px;
    }

    span {
        padding: 2px 8px;
        color: #00a6a7;
        border-radius: 15px;
        transition: all 0.3s ease;
        background-color: #f8f9fa;
        text-decoration: none;
        font-size: 14px;
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
</style>
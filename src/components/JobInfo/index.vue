<template>
    <div class="job-info">
        <h3 class="job-info-title">{{ content.title }}</h3>
        <div class="job-info-text">{{ content.content }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    content: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped lang="scss">
.job-info {
    width: 100%;
    max-height: 600px;
    max-width: 1200px;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);

    .job-info-title {
        color: #222;
    }

    .job-info-text {
        text-align: left;
        color: #4c4f54;
        font-size: 14px;
        line-height: 26px;
        margin: 16px 0;
        height: auto;
        white-space: pre-line;
        overflow-y: auto;
    }
}
</style>
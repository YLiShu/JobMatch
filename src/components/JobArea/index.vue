<template>
    <div class="job-area">
        <div class="job-area-text">工作地点</div>
        <div class="job-area-option">
            <div class="job-area-option-item">北京</div>
            <div class="job-area-option-item active">上海</div>
            <div class="job-area-option-item">广州</div>
            <div class="job-area-option-item">深圳</div>
            <div class="job-area-option-item">天津</div>
            <div class="job-area-option-item">重庆</div>
            <div class="job-area-option-item">南京</div>
            <div class="job-area-option-item">杭州</div>
            <div class="job-area-option-item">成都</div>
            <div class="job-area-option-item">武汉</div>
            <div class="job-area-option-item">西安</div>
            <div class="job-area-option-item">其他城市</div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.job-area {
    align-items: center;
    color: #222;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    height: 22px;
    line-height: 48px;
    min-height: 48px;
    width: 1000px;

    .job-area-text {
        font-size: 15px;
        width: 80px;
    }

    .job-area-option {
        display: flex;
        align-items: center;
        flex: 1;
        margin-right: 12px;

        .job-area-option-item {
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            margin-right: 10px;
            padding: 2px 8px;
            color: #666;
            border-radius: 6px;

            &:not(.active):hover {
                color: #00bebd;
            }

            &.active {
                background: #3ec6c5;
                color: #fff;
                font-weight: 700;
            }
        }
    }
}
</style>
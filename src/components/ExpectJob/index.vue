<template>
    <div class="expect-job">
        <div class="expect-job-content">
            <div class="expect-job-name">前端开发</div>
            <div class="line"></div>
        </div>
        <!-- <div class="expect-job-edit">
                <SvgIcon name="edit" size="16" />
            <span>编辑求职意向</span>
        </div> -->
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.expect-job {
    width: 100%;
    max-width: 1000px;
    align-items: center;
    display: flex;
    height: 45px;
    border-bottom: 1px solid #edeff2;
    padding: 30px 0;

    .expect-job-content {
        color: #222;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        margin-right: 24px;
        position: relative;

        .line {
            background-color: #00bebd;
            border-radius: 2px;
            bottom: -10px;
            height: 4px;
            left: 50%;
            position: absolute;
            transform: translateX(-50%);
            width: 20px;
        }
    }

    .expect-job-edit {
        color: #00bebd;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        align-items: center;
        display: flex;

        svg {
            margin-right: 2px;
            width: 14px;
        }
    }
}
</style>
<template>
    <div class="safe-tips">
        <h3 class="safe-tips-title">JobMatch安全提醒</h3>
        <div class="safe-tips-text">
            <span
                >求职过程中如果遇到违规收费、信息不实、以招聘名义的培训收费或者微信营销等虚假招聘行为，请保留证据，维护自己的合法权益。谨防上当受骗！</span
            ><img
                src="https://iconfont.alicdn.com/p/illus_3d/file/OsF5GhIAoVEF/d6ae1792-de12-4844-8c92-ead6fc45d8e8.png?image_process=resize,l_1000"
                alt=""
            />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.safe-tips {
    width: 100%;
    max-width: 1200px;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);

    .safe-tips-title {
        color: #222;
    }

    .safe-tips-text {
        padding: 10px;
        margin-top: 15px;
        background-color: #f6f8ff;
        height: 96px;
        display: flex;
        width: 100%;
        border-radius: 12px;
        align-items: center;
        justify-content: space-between;

        span {
            line-height: 24px;
            border-radius: 12px;
            color: #4c4f54;
            font-size: 14px;
        }

        img {
            height: 96px;
        }
    }
}
</style>
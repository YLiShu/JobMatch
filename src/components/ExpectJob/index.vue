<template>
    <div class="expect-job">
        <div class="expect-job-content">
            <div class="expect-job-name">前端开发</div>
            <div class="line"></div>
        </div>
        <!-- <div class="expect-job-edit">
            <svg
                t="1712493550856"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10820"
                width="16"
                height="16"
            >
                <path
                    d="M0 0h1024v1024H0z"
                    fill="#00bebd"
                    fill-opacity="0"
                    p-id="10821"
                ></path>
                <path
                    d="M512 85.333333a42.666667 42.666667 0 0 1 0 85.333334H256a85.333333 85.333333 0 0 0-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333333h512a85.333333 85.333333 0 0 0 85.333333-85.333333v-213.333333a42.666667 42.666667 0 0 1 85.333334 0v213.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H256a170.666667 170.666667 0 0 1-170.666667-170.666667V256a170.666667 170.666667 0 0 1 170.666667-170.666667h256z m-130.901333 392.533334l367.530666-367.530667a85.333333 85.333333 0 0 1 120.661334 0l30.165333 30.165333a85.333333 85.333333 0 0 1 0 120.661334l-367.488 367.530666L341.333333 668.458667l39.765334-190.592z"
                    fill="#00bebd"
                    p-id="10822"
                ></path></svg
            ><span>编辑求职意向</span>
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
<template>
    <div :class="{ 'fixed-top': isFixed }" class="search-bar-container">
        <div class="inner">
            <div class="search-box">
                <SearchForm />
                <HotPositionsTags v-show="!isFixed" />
            </div>
            <div class="search-box-scan" v-show="isFixed">
                <div class="search-box-scan-button">
                    <SvgIcon name="applet" size="54" />
                    <span class="search-box-scan-tips scan-tips"
                        >去小程序<br />与HR随时沟通</span
                    >
                </div>
                <div class="search-box-scan-container">
                    <div class="search-box-scan-qrcode"></div>
                    <span class="search-box-qrcode-tips scan-tips"
                        >前往小程序<br />与HR随时沟通</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchForm from "../SearchForm/index.vue";
import HotPositionsTags from "../HotPositionsTags/index.vue";
defineProps<{ isFixed: boolean }>();
</script>

<style lang="scss">
.search-bar-container {
    z-index: 999;
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    background: transparent;

    .inner {
        width: 100%;
        max-width: 1000px;

        .search-box {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
            padding: 25px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            max-width: 1000px;
            align-items: center;
        }
    }

    &.fixed-top {
        position: fixed;
        top: 50px;
        width: 100%;
        padding: 10px 0;
        height: 130px;
        background-color: #e8fafa;
        box-shadow: 0 8px 8px 8px #e8fafa;

        .inner {
            max-width: 1200px;
            margin: auto;
            display: flex;
            height: 100%;
            justify-content: space-around;
            align-items: center;

            .search-box {
                height: 100%;
                width: 80%;
                border-radius: 0px;
                background-color: #e8fafa;
                box-shadow: none;
                padding: 25px 0;
            }

            .search-box-scan {
                width: 20%;
                height: 100%;
                display: flex;
                position: relative;
                justify-content: center;
                align-items: center;

                &:hover .search-box-scan-button {
                    display: none;
                }

                &:hover .search-box-scan-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .search-box-scan-container {
                    display: none;
                    height: 100%;
                    font-size: 14px;
                    width: 110px;
                    border-radius: 4px;
                    overflow: hidden;

                    .search-box-scan-qrcode {
                        width: 70%;
                        height: 70%;
                        background: url(https://static.zhipin.com/zhipin-geek/v703/web/geek/images/boss-download-qrcode.png)
                            center / 100% no-repeat;
                    }

                    .search-box-qrcode-tips {
                        text-align: center;
                        font-size: 10px;
                    }
                }
                .scan-tips {
                    font-size: 12px;
                    font-weight: 500;
                    color: #01a6ac;
                }
                .search-box-scan-button {
                    align-items: flex-end;
                    display: flex;

                    .search-box-scan-tips {
                        text-align: left;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div :class="{ 'fixed-top': isFixed }" class="search-bar-container">
        <div class="inner">
            <div class="search-box">
                <div class="search-form">
                    <form action="/job_detail/" method="get">
                        <div
                            class="search-form-con"
                            @click="handleShowWorkPlaceDialog"
                        >
                            <div class="position-sel">
                                <span class="label-text">
                                    <b>{{ workPlaceTitle }}</b>
                                    <svg
                                        t="1710841093315"
                                        class="icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="28208"
                                        width="14"
                                        height="14"
                                    >
                                        <path
                                            d="M798.8 339.2c0 124-214 414-270 489.6-7.6 8.8-20.8 8.8-28 0-58-75.6-272-365.2-272-489.6C228.4 196.8 356 80 513.6 80c157.6 0 285.2 116.8 285.2 259.2z m0 0"
                                            fill="#B3B3B3"
                                            p-id="28209"
                                        ></path>
                                        <path
                                            d="M512 340m-120 0a120 120 0 1 0 240 0 120 120 0 1 0-240 0Z"
                                            fill="#FFFFFF"
                                            p-id="28210"
                                        ></path>
                                        <path
                                            d="M665.2 741.6c-12.8 16-23.6 31.6-36.4 44.4 131.2 8 159.6 34.8 166 49.2-6.4 16-94.8 53.6-270.4 53.6-175.6 1.6-264-38-268.8-52.4 4.8-12.8 25.2-38 145.6-47.6-11.2-12.8-23.6-28.4-36.4-44.4-98 11.2-156.8 34.8-156.8 90 0 80.8 199.2 101.2 318 101.2 118.8 0 318-22 318-101.2 0-58-72.8-83.6-178.8-92.8z m0 0"
                                            fill="#B3B3B3"
                                            p-id="28211"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                            <p class="ipt-wrap">
                                <input
                                    type="text"
                                    name="query"
                                    class="ipt-search"
                                    maxlength="50"
                                    autocomplete="off"
                                    placeholder="搜索职位、公司"
                                />
                            </p>
                        </div>
                        <input
                            type="hidden"
                            name="industry"
                            class="industry-code"
                            value=""
                        />
                        <button class="btn-search">搜索</button>
                        <div class="suggest-result">
                            <ul></ul>
                        </div>
                    </form>
                </div>
                <HotPositionsTags v-show="!isFixed" />
            </div>
            <div class="search-box-scan" v-show="isFixed">
                <div class="search-box-scan-button">
                    <svg
                        t="1710837239616"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="15201"
                        width="54"
                        height="54"
                    >
                        <path
                            d="M950.857143 0a73.142857 73.142857 0 0 1 73.142857 73.142857v877.714286a73.142857 73.142857 0 0 1-73.142857 73.142857H73.142857a73.142857 73.142857 0 0 1-73.142857-73.142857V73.142857a73.142857 73.142857 0 0 1 73.142857-73.142857h877.714286z"
                            fill="#00A6AB"
                            p-id="15202"
                        ></path>
                        <path
                            d="M512.438857 219.721143a290.596571 290.596571 0 1 0 0 581.193143 290.596571 290.596571 0 0 0 0-581.193143z m101.888 314.587428s-40.301714 3.291429-30.939428-30.72c-1.389714-10.020571 49.005714-33.206857 42.422857-65.170285-10.752-38.034286-72.777143-49.078857-88.868572-1.316572V588.068571c0.658286 21.211429-41.398857 90.770286-128.292571 61.44 0 0-58.075429-24.722286-54.857143-87.04 2.56-28.306286 29.257143-62.902857 59.318857-74.313142 33.353143-9.362286 45.641143 23.771429 30.939429 38.4-10.678857 5.339429-76.434286 32.768-30.939429 76.8 24.722286 24.722286 66.121143 9.142857 76.068572-14.628572 1.316571-16.676571 1.316571-137.728 1.316571-154.331428 0-16.749714 49.517714-105.764571 139.922286-55.149715 0 0 101.741714 59.245714-16.091429 155.062857z"
                            fill="#FFFFFF"
                            p-id="15203"
                        ></path>
                    </svg>
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
    <WorkPlaceDialog
        :isShowWorkPlaceDialog="isShowWorkPlaceDialog"
        @closeWorkPlaceDialog="handleCloseWorkPlace"
        @confirmWorkPlaceDialog="handleConfirmWorkPlace"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import HotPositionsTags from "../HotPositionsTags/index.vue";
import WorkPlaceDialog from "../WorkPlaceDialog/index.vue";
defineProps<{ isFixed: boolean }>();
const workPlace = ref<any>([
    {
        title: "",
        code: "",
        value: "全国",
        hasSubArea: "",
    },
]);
const isShowWorkPlaceDialog = ref(false);
const handleShowWorkPlaceDialog = () => {
    isShowWorkPlaceDialog.value = true;
};
const handleCloseWorkPlace = () => {
    isShowWorkPlaceDialog.value = false;
};
const workPlaceTitle = computed(() => {
    let title = "全国";
    if (!workPlace.value.length) {
        return title;
    } else if (workPlace.value.length >= 2) {
        title = `${workPlace.value[0].value}...(${workPlace.value.length})`;
    } else {
        title = workPlace.value[0].value;
    }
    return title;
});
const handleConfirmWorkPlace = (newWorkPlace: []) => {
    workPlace.value = [...newWorkPlace];
    handleCloseWorkPlace();
};

const getCurrentCity = () => {
    return new Promise((resolve, reject) => {
        fetch("/location/ip?coor=bd09ll&ak=zvrhKoe2A1u8PMjJsSuE5GkeNL78mLXh")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject("API 请求失败");
                }
            })
            .then((data) => {
                const { city, adcode } = data.content.address_detail;
                const address = {
                    value: city,
                    code: adcode,
                    title: "",
                    hasSubArea: "",
                };
                resolve(address);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

onMounted(async () => {
    try {
        const city = await getCurrentCity();
        workPlace.value = [city];
    } catch (error) {
        console.error("无法加载当前城市", error);
    }
});
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

            .search-form {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                form {
                    width: 100%;
                    display: flex;
                }

                .search-form-con {
                    border-radius: 10px;
                    box-shadow: none;
                    z-index: 1;
                    width: 780px;
                    font-size: 20px;
                    height: 54px;
                    line-height: 54px;
                    background: #fff;
                    border-radius: 10px 0 0 10px;
                    border: 2px solid #00bebd;
                    display: flex;
                    flex: 1;
                    overflow: hidden;

                    .position-sel {
                        display: flex;
                        align-items: center;
                        padding: 0 15px;
                        user-select: none;
                        border-right: 2px solid #00bebd;
                        color: #70757a;
                        transition: all ease 0.3;
                        cursor: pointer;

                        &:hover {
                            color: #00bebd;
                        }

                        .label-text {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 14px;
                            font-weight: 500;

                            b {
                                max-width: 82px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                    .ipt-wrap {
                        flex: 1;
                        display: flex;
                        align-items: center;

                        .ipt-search {
                            flex: 1;
                            border: none;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #5f6368;

                            &::placeholder {
                                color: #9e9e9e;
                            }

                            &:focus {
                                outline: none;
                            }
                        }
                    }
                }

                .btn-search {
                    width: 128px;
                    background: #00bebd;
                    border-radius: 0 10px 10px 0;
                    font-size: 20px;
                    height: 54px;
                    line-height: 54px;
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    border: none;
                    transition: background-color 0.15s;
                    outline: none;
                }
            }
        }
    }

    &.fixed-top {
        position: fixed;
        top: 50px;
        width: 100%;
        background-color: #e8fafa;
        padding: 10px 0;
        height: 130px;
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
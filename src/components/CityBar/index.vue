<template>
    <div class="city">
        <div class="city-hot">
            <b class="city-title city-hot-title">热门城市</b>
            <div class="city-desc city-hot-desc">
                <span
                    class="city-label"
                    v-for="(item, index) in hotCities"
                    :key="index"
                    @click="navigateToCites(item.query)"
                    >{{ item.name }}</span
                >
            </div>
            <div class="city-more" @click="showMoreHandler">
                <div class="city-more-btn" v-show="!isShowMore">
                    <b>更多</b>
                    <SvgIcon name="more" size="16" />
                </div>
                <div class="city-more-btn" v-show="isShowMore">
                    <b>收起</b>
                    <SvgIcon name="less" size="16" />
                </div>
            </div>
        </div>
        <div class="city-other" v-show="isShowMore">
            <b class="city-title city-other-title">其他城市</b>
            <div class="city-desc">
                <span
                    class="city-label"
                    v-for="(item, index) in otherCities"
                    :key="index"
                    @click="navigateToCites(item.query)"
                    >{{ item.name }}</span
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";

const isShowMore = ref(false);
const hotCities = ref([
    { name: "北京", query: "010000" },
    { name: "上海", query: "020000" },
    { name: "广州", query: "030200" },
    { name: "深圳", query: "040000" },
    { name: "南京", query: "070200" },
    { name: "武汉", query: "180200" },
    { name: "成都", query: "090200" },
    { name: "天津", query: "050000" },
    { name: "杭州", query: "080200" },
    { name: "苏州", query: "070300" },
    { name: "济南", query: "120200" },
    { name: "大连", query: "230300" },
    { name: "重庆", query: "060000" },
    { name: "青岛", query: "120300" },
    { name: "福州", query: "110200" },
    { name: "厦门", query: "110300" },
    { name: "西安", query: "200200" },
]);

const otherCities = ref([
    { name: "广东", query: "030000" },
    { name: "江苏", query: "070000" },
    { name: "山东", query: "120000" },
    { name: "河北", query: "160000" },
    { name: "河南", query: "170000" },
    { name: "浙江", query: "080000" },
    { name: "四川", query: "090000" },
    { name: "安徽", query: "150000" },
    { name: "湖北", query: "180000" },
    { name: "辽宁", query: "230000" },
    { name: "山西", query: "210000" },
    { name: "湖南", query: "190000" },
    { name: "福建", query: "110000" },
    { name: "陕西", query: "200000" },
    { name: "江西", query: "130000" },
    { name: "黑龙江", query: "220000" },
    { name: "广西", query: "140000" },
    { name: "甘肃", query: "270000" },
    { name: "吉林", query: "240000" },
    { name: "云南", query: "250000" },
    { name: "贵州", query: "260000" },
    { name: "内蒙古", query: "280000" },
    { name: "新疆", query: "310000" },
    { name: "海南", query: "100000" },
    { name: "宁夏", query: "290000" },
    { name: "青海", query: "320000" },
    { name: "西藏", query: "300000" },
    { name: "其它", query: "000000" },
]);

const navigateToCites = (query: string) => {
    router.push({ path: `/search`, query: { query } });
};

const showMoreHandler = () => {
    isShowMore.value = !isShowMore.value;
};
</script>

<style scoped lang="scss">
.city {
    background: #fff;
    border-radius: 12px;
    margin-bottom: 20px;
    padding: 0 20px 18px;
    max-width: 1200px;
    width: 100%;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);

    .city-more {
        color: #00bebd;
    }

    .city-title {
        color: #222;
        font-size: 16px;
        left: 0;
        line-height: 22px;
        padding-right: 10px;
        position: absolute;
        text-align: right;
        top: 18px;
        width: 105px;

        &:after {
            background-color: #e1e3e8;
            content: "";
            display: block;
            height: 16px;
            margin-top: -8px;
            position: absolute;
            right: 0;
            top: 50%;
            width: 1px;
        }
    }

    .city-desc {
        line-height: 20px;
        margin-left: 102px;
        margin-right: 62px;
        position: relative;
        text-align: left;

        .city-label {
            color: #757575;
            display: inline-block;
            font-size: 14px;
            padding-left: 16px;
            padding-top: 18px;
            cursor: pointer;

            &:hover {
                color: #00a6a7;
                font-weight: 900;
                transform: scale(1.05);
            }
        }
    }

    .city-hot {
        position: relative;

        .city-hot-title:before {
            background: url(https://img01.51jobcdn.com/yjs/img/icon_hotcity-382e072.png)
                50% no-repeat;
            background-size: contain;
            content: "";
            display: inline-block;
            height: 16px;
            margin-right: 6px;
            margin-top: -2px;
            vertical-align: middle;
            width: 16px;
        }

        .city-hot-desc {
            .city-label {
                &:nth-of-type(-n + 3) {
                    font-weight: 900;
                }
            }
        }
    }

    .city-other {
        border-top: 1px solid #edeff2;
        margin-top: 20px;
        position: relative;
    }

    .city-more {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;
        position: absolute;
        font-size: 14px;
        font-weight: 900;
        right: 20px;
        top: 18px;
        user-select: none;

        &:active {
            transform: scale(1.05);
        }

        .city-more-btn {
            display: flex;
            align-items: center;
        }
    }
}
</style>
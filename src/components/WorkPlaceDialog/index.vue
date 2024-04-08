<template>
    <div class="work-place-dialog">
        <el-dialog
            :model-value="isShowWorkPlaceDialog"
            :show-close="false"
            width="850px"
            align-center
        >
            <template #header>
                <span class="dialog-header-wrapper">
                    <span class="work-place-dialog-title">请选择地区</span>
                </span>
                <button
                    type="button"
                    @click="closeDialog"
                    class="dialog-header-btn"
                >
                    ✖️
                </button>
            </template>
            <div class="work-place-selected" v-if="selectedCities.length">
                <div class="count-total">
                    已选(
                    <span class="count-checked">{{
                        selectedCities.length
                    }}</span>
                    /{{ maxSelectedCnt }})
                </div>
                <div class="work-place-selected-tag">
                    <el-tag
                        closable
                        @close="handleTagClose(selectedCity)"
                        v-for="selectedCity in selectedCities"
                        :key="selectedCity.code"
                        >{{ selectedCity.value }}
                    </el-tag>
                </div>
            </div>
            <div class="work-place-panel">
                <div class="work-place-left-container">
                    <div
                        class="work-place-left-title-box"
                        :class="{
                            'work-place-left-title-box-active':
                                selectedGroup === group,
                        }"
                        v-for="group in letterGroups"
                        :key="group"
                        @click="selectGroup(group)"
                    >
                        <span class="work-place-left-title">{{ group }}</span>
                    </div>
                </div>
                <div class="work-place-right-container">
                    <div class="work-place-right-group">
                        <div
                            class="work-place-right-box"
                            v-for="(
                                citiesGroup, index
                            ) in citiesGroupedByLetter"
                            :key="index"
                        >
                            <div class="work-place-right-title">
                                {{ citiesGroup[0].title }}
                            </div>
                            <span
                                class="work-place-right-city"
                                :class="{
                                    'work-place-right-city-active':
                                        selectedCities.includes(city),
                                }"
                                v-for="city in citiesGroup"
                                :key="city.code"
                                :title="city.value"
                                @click="selectCities(city)"
                            >
                                {{ city.value }}
                                <i
                                    class="work-place-icon-check"
                                    v-if="selectedCities.includes(city)"
                                    ><svg
                                        t="1711704557744"
                                        class="icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="70779"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            d="M872.1 447.67l25.15 7.71C872.2 285.54 738.93 152.11 569.12 126.86l8.16 25.26c150.34 27.35 267.87 145.2 294.82 295.61M128.03 454.32l25.21-7.49c27.31-150.02 144.74-267.4 294.77-294.66l7.71-25.21c-169.27 25.32-302.2 158.12-327.69 327.36M446.44 870.71C297.52 843.02 181.03 726.49 153.4 577.56l-25.32-8.27c25.57 168.49 157.67 300.82 326.12 326.68l-7.76-25.26zM897.31 567.5l-25.21 8.16c-27.05 150.36-144.62 268.11-294.94 295.38L569 896.3c169.98-25.2 303.37-158.79 328.31-328.8"
                                            p-id="70780"
                                            fill="#00bebd"
                                        ></path>
                                        <path
                                            d="M840.13 474.83l-178.35-57.96 57.01-110.55-111.11 56.62-57.4-179.19-23.58-73.05-14.08-45.94-15.31 47.12-22.36 73.05-56.39 178.35-111-56.95 56.84 111.11-178.18 56.28L112 496.08l-47.12 15.31L112 526.7l71.88 23.59L363.5 606.9l-57.06 110.72 110.55-58.29 56.73 179.74 22.36 73.05 15.31 46.89 15.31-47.12 23.59-73.05 57.74-180.3 110.78 58.01-56.9-110.22 177.06-57.23 73.05-23.59 47.12-15.31-45.94-12.97-73.07-22.4z m-8.38 51.87l-180.81 58.35-23.7-45.89a117.61 117.61 0 0 1-11.18 29.68l47.67 92.28-90.99-47.4a116.24 116.24 0 0 1-27.95 12.07l41.86 21.85-58.91 184.44-16.26 50.3-15.43-50.3-57.9-183.88 42.37-22.36a116.65 116.65 0 0 1-27.95-11.96l-91.05 48.01 47.73-92.67c-5.05-9.28-8.81-19.21-11.18-29.51l-23.59 45.77-183.32-57.62-49.41-15.98 51.64-15.65 181.81-57.51 23.19 45.33c2.52-10.2 6.41-20.02 11.57-29.17l-48.18-94.23 94.29 48.46c9.36-5.06 19.36-8.82 29.73-11.18l-46.17-23.7 57.74-182.37 14.98-48.85 15.54 47.95 58.46 182.82-47.23 24.09c10.39 2.34 20.42 6.11 29.79 11.18l95.46-48.62-48.85 95.01c5.02 9.2 8.78 19.03 11.18 29.23l23.98-46.45 182.54 59.13 45.77 14.03-47.24 15.32z"
                                            p-id="70781"
                                            fill="#00bebd"
                                        ></path>
                                        <path
                                            d="M512.61 430.12c-45.56-0.03-82.52 36.88-82.55 82.44-0.03 45.56 36.88 82.52 82.44 82.55 45.52 0.03 82.46-36.81 82.55-82.33 0-45.56-36.93-82.49-82.49-82.49m0 141.4c-32.53-0.03-58.88-26.43-58.85-58.96 0.03-32.53 26.43-58.88 58.96-58.85 32.51 0.03 58.85 26.4 58.85 58.91 0 32.53-26.37 58.91-58.91 58.91h-0.05z"
                                            p-id="70782"
                                            fill="#00bebd"
                                        ></path></svg></i
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <button @click="closeDialog" class="dialog-footer-btn">
                        取消
                    </button>
                    <button
                        @click="confirmSelection"
                        class="dialog-footer-btn dialog-footer-confirm"
                    >
                        确定
                    </button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
defineProps({
    isShowWorkPlaceDialog: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["closeWorkPlaceDialog", "confirmWorkPlaceDialog"]);

const dialogData = ref([
    {
        title: "热门城市",
        type: "1",
        items: [
            {
                code: "010000",
                value: "北京",
                hasSubArea: true,
            },
            {
                code: "020000",
                value: "上海",
                hasSubArea: true,
            },
            {
                code: "030200",
                value: "广州",
                hasSubArea: true,
            },
            {
                code: "040000",
                value: "深圳",
                hasSubArea: true,
            },
            {
                code: "180200",
                value: "武汉",
                hasSubArea: true,
            },
            {
                code: "200200",
                value: "西安",
                hasSubArea: true,
            },
            {
                code: "080200",
                value: "杭州",
                hasSubArea: true,
            },
            {
                code: "070200",
                value: "南京",
                hasSubArea: true,
            },
            {
                code: "090200",
                value: "成都",
                hasSubArea: true,
            },
            {
                code: "060000",
                value: "重庆",
                hasSubArea: true,
            },
            {
                code: "030800",
                value: "东莞",
                hasSubArea: true,
            },
            {
                code: "230300",
                value: "大连",
                hasSubArea: true,
            },
            {
                code: "230200",
                value: "沈阳",
                hasSubArea: true,
            },
            {
                code: "070300",
                value: "苏州",
                hasSubArea: true,
            },
            {
                code: "250200",
                value: "昆明",
                hasSubArea: true,
            },
            {
                code: "190200",
                value: "长沙",
                hasSubArea: true,
            },
            {
                code: "150200",
                value: "合肥",
                hasSubArea: true,
            },
            {
                code: "080300",
                value: "宁波",
                hasSubArea: true,
            },
            {
                code: "170200",
                value: "郑州",
                hasSubArea: true,
            },
            {
                code: "050000",
                value: "天津",
                hasSubArea: true,
            },
            {
                code: "120300",
                value: "青岛",
                hasSubArea: true,
            },
            {
                code: "120200",
                value: "济南",
                hasSubArea: true,
            },
            {
                code: "220200",
                value: "哈尔滨",
                hasSubArea: true,
            },
            {
                code: "240200",
                value: "长春",
                hasSubArea: true,
            },
            {
                code: "110200",
                value: "福州",
                hasSubArea: true,
            },
        ],
    },
    {
        title: "一线/新一线",
        type: "5",
        items: [
            {
                code: "010000",
                value: "北京",
                hasSubArea: true,
            },
            {
                code: "020000",
                value: "上海",
                hasSubArea: true,
            },
            {
                code: "030200",
                value: "广州",
                hasSubArea: true,
            },
            {
                code: "040000",
                value: "深圳",
                hasSubArea: true,
            },
            {
                code: "090200",
                value: "成都",
                hasSubArea: true,
            },
            {
                code: "060000",
                value: "重庆",
                hasSubArea: true,
            },
            {
                code: "080200",
                value: "杭州",
                hasSubArea: true,
            },
            {
                code: "200200",
                value: "西安",
                hasSubArea: true,
            },
            {
                code: "180200",
                value: "武汉",
                hasSubArea: true,
            },
            {
                code: "070300",
                value: "苏州",
                hasSubArea: true,
            },
            {
                code: "170200",
                value: "郑州",
                hasSubArea: true,
            },
            {
                code: "070200",
                value: "南京",
                hasSubArea: true,
            },
            {
                code: "050000",
                value: "天津",
                hasSubArea: true,
            },
            {
                code: "190200",
                value: "长沙",
                hasSubArea: true,
            },
            {
                code: "030800",
                value: "东莞",
                hasSubArea: true,
            },
            {
                code: "080300",
                value: "宁波",
                hasSubArea: true,
            },
            {
                code: "030600",
                value: "佛山",
                hasSubArea: true,
            },
            {
                code: "150200",
                value: "合肥",
                hasSubArea: true,
            },
            {
                code: "120300",
                value: "青岛",
                hasSubArea: true,
            },
        ],
    },
    {
        title: "二线城市",
        type: "6",
        items: [
            {
                code: "250200",
                value: "昆明",
                hasSubArea: true,
            },
            {
                code: "230200",
                value: "沈阳",
                hasSubArea: true,
            },
            {
                code: "120200",
                value: "济南",
                hasSubArea: true,
            },
            {
                code: "070400",
                value: "无锡",
                hasSubArea: true,
            },
            {
                code: "110300",
                value: "厦门",
                hasSubArea: true,
            },
            {
                code: "110200",
                value: "福州",
                hasSubArea: true,
            },
            {
                code: "080400",
                value: "温州",
                hasSubArea: true,
            },
            {
                code: "080600",
                value: "金华",
                hasSubArea: true,
            },
            {
                code: "220200",
                value: "哈尔滨",
                hasSubArea: true,
            },
            {
                code: "230300",
                value: "大连",
                hasSubArea: true,
            },
            {
                code: "260200",
                value: "贵阳",
                hasSubArea: true,
            },
            {
                code: "140200",
                value: "南宁",
                hasSubArea: true,
            },
            {
                code: "110400",
                value: "泉州",
                hasSubArea: true,
            },
            {
                code: "160200",
                value: "石家庄",
                hasSubArea: true,
            },
            {
                code: "240200",
                value: "长春",
                hasSubArea: true,
            },
            {
                code: "130200",
                value: "南昌",
                hasSubArea: true,
            },
            {
                code: "030300",
                value: "惠州",
                hasSubArea: true,
            },
            {
                code: "070500",
                value: "常州",
                hasSubArea: true,
            },
            {
                code: "080700",
                value: "嘉兴",
                hasSubArea: true,
            },
            {
                code: "071100",
                value: "徐州",
                hasSubArea: true,
            },
            {
                code: "070900",
                value: "南通",
                hasSubArea: true,
            },
            {
                code: "210200",
                value: "太原",
                hasSubArea: true,
            },
            {
                code: "160400",
                value: "保定",
                hasSubArea: false,
            },
            {
                code: "030500",
                value: "珠海",
                hasSubArea: true,
            },
            {
                code: "030700",
                value: "中山",
                hasSubArea: true,
            },
            {
                code: "270200",
                value: "兰州",
                hasSubArea: true,
            },
            {
                code: "120800",
                value: "临沂",
                hasSubArea: true,
            },
            {
                code: "120500",
                value: "潍坊",
                hasSubArea: true,
            },
            {
                code: "120400",
                value: "烟台",
                hasSubArea: true,
            },
            {
                code: "080500",
                value: "绍兴",
                hasSubArea: true,
            },
        ],
    },
    {
        title: "A",
        type: "0",
        items: [
            {
                code: "092200",
                value: "阿坝",
                hasSubArea: false,
            },
            {
                code: "310600",
                value: "阿克苏",
                hasSubArea: false,
            },
            {
                code: "310900",
                value: "阿拉尔",
                hasSubArea: false,
            },
            {
                code: "281500",
                value: "阿拉善盟",
                hasSubArea: false,
            },
            {
                code: "311300",
                value: "阿勒泰",
                hasSubArea: false,
            },
            {
                code: "300800",
                value: "阿里",
                hasSubArea: false,
            },
            {
                code: "201000",
                value: "安康",
                hasSubArea: false,
            },
            {
                code: "150400",
                value: "安庆",
                hasSubArea: false,
            },
            {
                code: "230400",
                value: "鞍山",
                hasSubArea: false,
            },
            {
                code: "260500",
                value: "安顺",
                hasSubArea: false,
            },
            {
                code: "170900",
                value: "安阳",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "B",
        type: "0",
        items: [
            {
                code: "010000",
                value: "北京",
                hasSubArea: true,
            },
            {
                code: "241000",
                value: "白城",
                hasSubArea: false,
            },
            {
                code: "141100",
                value: "百色",
                hasSubArea: false,
            },
            {
                code: "101800",
                value: "白沙",
                hasSubArea: false,
            },
            {
                code: "240900",
                value: "白山",
                hasSubArea: false,
            },
            {
                code: "270800",
                value: "白银",
                hasSubArea: false,
            },
            {
                code: "160400",
                value: "保定",
                hasSubArea: false,
            },
            {
                code: "200400",
                value: "宝鸡",
                hasSubArea: false,
            },
            {
                code: "251200",
                value: "保山",
                hasSubArea: false,
            },
            {
                code: "101700",
                value: "保亭",
                hasSubArea: false,
            },
            {
                code: "280400",
                value: "包头",
                hasSubArea: false,
            },
            {
                code: "280900",
                value: "巴彦淖尔",
                hasSubArea: false,
            },
            {
                code: "311800",
                value: "巴音郭楞",
                hasSubArea: false,
            },
            {
                code: "092000",
                value: "巴中",
                hasSubArea: false,
            },
            {
                code: "140500",
                value: "北海",
                hasSubArea: false,
            },
            {
                code: "150600",
                value: "蚌埠",
                hasSubArea: false,
            },
            {
                code: "231000",
                value: "本溪",
                hasSubArea: false,
            },
            {
                code: "260700",
                value: "毕节",
                hasSubArea: false,
            },
            {
                code: "121500",
                value: "滨州",
                hasSubArea: false,
            },
            {
                code: "311900",
                value: "博尔塔拉",
                hasSubArea: false,
            },
            {
                code: "151800",
                value: "亳州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "C",
        type: "0",
        items: [
            {
                code: "060000",
                value: "重庆",
                hasSubArea: true,
            },
            {
                code: "160800",
                value: "沧州",
                hasSubArea: false,
            },
            {
                code: "240200",
                value: "长春",
                hasSubArea: true,
            },
            {
                code: "190700",
                value: "常德",
                hasSubArea: false,
            },
            {
                code: "300600",
                value: "昌都",
                hasSubArea: false,
            },
            {
                code: "311200",
                value: "昌吉",
                hasSubArea: false,
            },
            {
                code: "101900",
                value: "昌江",
                hasSubArea: false,
            },
            {
                code: "190200",
                value: "长沙",
                hasSubArea: true,
            },
            {
                code: "070700",
                value: "常熟",
                hasSubArea: false,
            },
            {
                code: "210600",
                value: "长治",
                hasSubArea: false,
            },
            {
                code: "070500",
                value: "常州",
                hasSubArea: true,
            },
            {
                code: "231400",
                value: "朝阳",
                hasSubArea: false,
            },
            {
                code: "032000",
                value: "潮州",
                hasSubArea: false,
            },
            {
                code: "161000",
                value: "承德",
                hasSubArea: false,
            },
            {
                code: "090200",
                value: "成都",
                hasSubArea: true,
            },
            {
                code: "101300",
                value: "澄迈",
                hasSubArea: false,
            },
            {
                code: "190900",
                value: "郴州",
                hasSubArea: false,
            },
            {
                code: "280300",
                value: "赤峰",
                hasSubArea: false,
            },
            {
                code: "151500",
                value: "池州",
                hasSubArea: false,
            },
            {
                code: "141400",
                value: "崇左",
                hasSubArea: false,
            },
            {
                code: "251700",
                value: "楚雄",
                hasSubArea: false,
            },
            {
                code: "150900",
                value: "滁州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "D",
        type: "0",
        items: [
            {
                code: "250500",
                value: "大理",
                hasSubArea: false,
            },
            {
                code: "230300",
                value: "大连",
                hasSubArea: true,
            },
            {
                code: "230800",
                value: "丹东",
                hasSubArea: false,
            },
            {
                code: "100800",
                value: "儋州",
                hasSubArea: false,
            },
            {
                code: "220500",
                value: "大庆",
                hasSubArea: false,
            },
            {
                code: "210400",
                value: "大同",
                hasSubArea: false,
            },
            {
                code: "221400",
                value: "大兴安岭",
                hasSubArea: false,
            },
            {
                code: "091700",
                value: "达州",
                hasSubArea: false,
            },
            {
                code: "251600",
                value: "德宏",
                hasSubArea: false,
            },
            {
                code: "172000",
                value: "邓州",
                hasSubArea: false,
            },
            {
                code: "090600",
                value: "德阳",
                hasSubArea: false,
            },
            {
                code: "121300",
                value: "德州",
                hasSubArea: false,
            },
            {
                code: "101100",
                value: "定安",
                hasSubArea: false,
            },
            {
                code: "271100",
                value: "定西",
                hasSubArea: false,
            },
            {
                code: "252000",
                value: "迪庆",
                hasSubArea: false,
            },
            {
                code: "100900",
                value: "东方",
                hasSubArea: false,
            },
            {
                code: "030800",
                value: "东莞",
                hasSubArea: true,
            },
            {
                code: "121000",
                value: "东营",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "E",
        type: "0",
        items: [
            {
                code: "181800",
                value: "恩施",
                hasSubArea: false,
            },
            {
                code: "280800",
                value: "鄂尔多斯",
                hasSubArea: false,
            },
            {
                code: "181000",
                value: "鄂州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "F",
        type: "0",
        items: [
            {
                code: "140800",
                value: "防城港",
                hasSubArea: false,
            },
            {
                code: "030600",
                value: "佛山",
                hasSubArea: true,
            },
            {
                code: "230600",
                value: "抚顺",
                hasSubArea: false,
            },
            {
                code: "231500",
                value: "阜新",
                hasSubArea: false,
            },
            {
                code: "150700",
                value: "阜阳",
                hasSubArea: false,
            },
            {
                code: "110200",
                value: "福州",
                hasSubArea: true,
            },
            {
                code: "131100",
                value: "抚州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "G",
        type: "0",
        items: [
            {
                code: "271500",
                value: "甘南",
                hasSubArea: false,
            },
            {
                code: "130800",
                value: "赣州",
                hasSubArea: true,
            },
            {
                code: "092100",
                value: "甘孜",
                hasSubArea: false,
            },
            {
                code: "091300",
                value: "广安",
                hasSubArea: false,
            },
            {
                code: "091600",
                value: "广元",
                hasSubArea: false,
            },
            {
                code: "030200",
                value: "广州",
                hasSubArea: true,
            },
            {
                code: "141000",
                value: "贵港",
                hasSubArea: false,
            },
            {
                code: "140300",
                value: "桂林",
                hasSubArea: false,
            },
            {
                code: "260200",
                value: "贵阳",
                hasSubArea: true,
            },
            {
                code: "320800",
                value: "果洛",
                hasSubArea: false,
            },
            {
                code: "290600",
                value: "固原",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "H",
        type: "0",
        items: [
            {
                code: "320500",
                value: "海北",
                hasSubArea: false,
            },
            {
                code: "320300",
                value: "海东",
                hasSubArea: false,
            },
            {
                code: "100200",
                value: "海口",
                hasSubArea: true,
            },
            {
                code: "320700",
                value: "海南州",
                hasSubArea: false,
            },
            {
                code: "081600",
                value: "海宁",
                hasSubArea: false,
            },
            {
                code: "320400",
                value: "海西",
                hasSubArea: false,
            },
            {
                code: "310700",
                value: "哈密",
                hasSubArea: false,
            },
            {
                code: "160700",
                value: "邯郸",
                hasSubArea: false,
            },
            {
                code: "080200",
                value: "杭州",
                hasSubArea: true,
            },
            {
                code: "200900",
                value: "汉中",
                hasSubArea: false,
            },
            {
                code: "220200",
                value: "哈尔滨",
                hasSubArea: true,
            },
            {
                code: "171700",
                value: "鹤壁",
                hasSubArea: false,
            },
            {
                code: "141200",
                value: "河池",
                hasSubArea: false,
            },
            {
                code: "150200",
                value: "合肥",
                hasSubArea: true,
            },
            {
                code: "221000",
                value: "鹤岗",
                hasSubArea: false,
            },
            {
                code: "221200",
                value: "黑河",
                hasSubArea: false,
            },
            {
                code: "161200",
                value: "衡水",
                hasSubArea: false,
            },
            {
                code: "190500",
                value: "衡阳",
                hasSubArea: false,
            },
            {
                code: "311600",
                value: "和田",
                hasSubArea: false,
            },
            {
                code: "032100",
                value: "河源",
                hasSubArea: false,
            },
            {
                code: "121400",
                value: "菏泽",
                hasSubArea: false,
            },
            {
                code: "141500",
                value: "贺州",
                hasSubArea: false,
            },
            {
                code: "251000",
                value: "红河州",
                hasSubArea: false,
            },
            {
                code: "071900",
                value: "淮安",
                hasSubArea: true,
            },
            {
                code: "151700",
                value: "淮北",
                hasSubArea: false,
            },
            {
                code: "191100",
                value: "怀化",
                hasSubArea: false,
            },
            {
                code: "151100",
                value: "淮南",
                hasSubArea: false,
            },
            {
                code: "181100",
                value: "黄冈",
                hasSubArea: false,
            },
            {
                code: "320600",
                value: "黄南",
                hasSubArea: false,
            },
            {
                code: "151000",
                value: "黄山",
                hasSubArea: false,
            },
            {
                code: "180400",
                value: "黄石",
                hasSubArea: false,
            },
            {
                code: "280200",
                value: "呼和浩特",
                hasSubArea: true,
            },
            {
                code: "030300",
                value: "惠州",
                hasSubArea: true,
            },
            {
                code: "230900",
                value: "葫芦岛",
                hasSubArea: false,
            },
            {
                code: "281100",
                value: "呼伦贝尔",
                hasSubArea: false,
            },
            {
                code: "080900",
                value: "湖州",
                hasSubArea: true,
            },
        ],
    },
    {
        title: "J",
        type: "0",
        items: [
            {
                code: "220800",
                value: "佳木斯",
                hasSubArea: false,
            },
            {
                code: "130900",
                value: "吉安",
                hasSubArea: false,
            },
            {
                code: "031500",
                value: "江门",
                hasSubArea: true,
            },
            {
                code: "170500",
                value: "焦作",
                hasSubArea: false,
            },
            {
                code: "080700",
                value: "嘉兴",
                hasSubArea: true,
            },
            {
                code: "270400",
                value: "嘉峪关",
                hasSubArea: false,
            },
            {
                code: "032200",
                value: "揭阳",
                hasSubArea: false,
            },
            {
                code: "240300",
                value: "吉林",
                hasSubArea: false,
            },
            {
                code: "120200",
                value: "济南",
                hasSubArea: true,
            },
            {
                code: "270300",
                value: "金昌",
                hasSubArea: false,
            },
            {
                code: "210700",
                value: "晋城",
                hasSubArea: false,
            },
            {
                code: "130400",
                value: "景德镇",
                hasSubArea: false,
            },
            {
                code: "180800",
                value: "荆门",
                hasSubArea: false,
            },
            {
                code: "180700",
                value: "荆州",
                hasSubArea: true,
            },
            {
                code: "080600",
                value: "金华",
                hasSubArea: true,
            },
            {
                code: "120900",
                value: "济宁",
                hasSubArea: false,
            },
            {
                code: "211000",
                value: "晋中",
                hasSubArea: false,
            },
            {
                code: "230700",
                value: "锦州",
                hasSubArea: false,
            },
            {
                code: "130300",
                value: "九江",
                hasSubArea: false,
            },
            {
                code: "270500",
                value: "酒泉",
                hasSubArea: false,
            },
            {
                code: "220900",
                value: "鸡西",
                hasSubArea: false,
            },
            {
                code: "171900",
                value: "济源",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "K",
        type: "0",
        items: [
            {
                code: "170400",
                value: "开封",
                hasSubArea: false,
            },
            {
                code: "032700",
                value: "开平",
                hasSubArea: false,
            },
            {
                code: "310400",
                value: "喀什地区",
                hasSubArea: false,
            },
            {
                code: "310300",
                value: "克拉玛依",
                hasSubArea: false,
            },
            {
                code: "311700",
                value: "克孜勒苏柯尔克孜",
                hasSubArea: false,
            },
            {
                code: "250200",
                value: "昆明",
                hasSubArea: true,
            },
            {
                code: "070600",
                value: "昆山",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "L",
        type: "0",
        items: [
            {
                code: "141300",
                value: "来宾",
                hasSubArea: false,
            },
            {
                code: "160300",
                value: "廊坊",
                hasSubArea: false,
            },
            {
                code: "270200",
                value: "兰州",
                hasSubArea: true,
            },
            {
                code: "090400",
                value: "乐山",
                hasSubArea: false,
            },
            {
                code: "300200",
                value: "拉萨",
                hasSubArea: false,
            },
            {
                code: "092300",
                value: "凉山",
                hasSubArea: false,
            },
            {
                code: "071200",
                value: "连云港",
                hasSubArea: true,
            },
            {
                code: "121700",
                value: "聊城",
                hasSubArea: false,
            },
            {
                code: "231100",
                value: "辽阳",
                hasSubArea: false,
            },
            {
                code: "240400",
                value: "辽源",
                hasSubArea: false,
            },
            {
                code: "250600",
                value: "丽江",
                hasSubArea: false,
            },
            {
                code: "251800",
                value: "临沧",
                hasSubArea: false,
            },
            {
                code: "210500",
                value: "临汾",
                hasSubArea: false,
            },
            {
                code: "101400",
                value: "临高",
                hasSubArea: false,
            },
            {
                code: "102100",
                value: "陵水",
                hasSubArea: false,
            },
            {
                code: "271400",
                value: "临夏",
                hasSubArea: false,
            },
            {
                code: "120800",
                value: "临沂",
                hasSubArea: true,
            },
            {
                code: "300400",
                value: "林芝",
                hasSubArea: false,
            },
            {
                code: "081000",
                value: "丽水",
                hasSubArea: false,
            },
            {
                code: "260400",
                value: "六盘水",
                hasSubArea: false,
            },
            {
                code: "140400",
                value: "柳州",
                hasSubArea: true,
            },
            {
                code: "271200",
                value: "陇南",
                hasSubArea: false,
            },
            {
                code: "111000",
                value: "龙岩",
                hasSubArea: false,
            },
            {
                code: "191200",
                value: "娄底",
                hasSubArea: false,
            },
            {
                code: "151200",
                value: "六安",
                hasSubArea: false,
            },
            {
                code: "171500",
                value: "漯河",
                hasSubArea: false,
            },
            {
                code: "170300",
                value: "洛阳",
                hasSubArea: true,
            },
            {
                code: "090500",
                value: "泸州",
                hasSubArea: false,
            },
            {
                code: "211200",
                value: "吕梁",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "M",
        type: "0",
        items: [
            {
                code: "150500",
                value: "马鞍山",
                hasSubArea: false,
            },
            {
                code: "032300",
                value: "茂名",
                hasSubArea: false,
            },
            {
                code: "091200",
                value: "眉山",
                hasSubArea: false,
            },
            {
                code: "032600",
                value: "梅州",
                hasSubArea: false,
            },
            {
                code: "090300",
                value: "绵阳",
                hasSubArea: true,
            },
            {
                code: "220700",
                value: "牡丹江",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "N",
        type: "0",
        items: [
            {
                code: "130200",
                value: "南昌",
                hasSubArea: true,
            },
            {
                code: "091100",
                value: "南充",
                hasSubArea: false,
            },
            {
                code: "070200",
                value: "南京",
                hasSubArea: true,
            },
            {
                code: "140200",
                value: "南宁",
                hasSubArea: true,
            },
            {
                code: "110800",
                value: "南平",
                hasSubArea: false,
            },
            {
                code: "070900",
                value: "南通",
                hasSubArea: true,
            },
            {
                code: "170600",
                value: "南阳",
                hasSubArea: false,
            },
            {
                code: "300700",
                value: "那曲",
                hasSubArea: false,
            },
            {
                code: "090900",
                value: "内江",
                hasSubArea: false,
            },
            {
                code: "080300",
                value: "宁波",
                hasSubArea: true,
            },
            {
                code: "110900",
                value: "宁德",
                hasSubArea: false,
            },
            {
                code: "251900",
                value: "怒江",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "P",
        type: "0",
        items: [
            {
                code: "231300",
                value: "盘锦",
                hasSubArea: false,
            },
            {
                code: "091000",
                value: "攀枝花",
                hasSubArea: false,
            },
            {
                code: "171000",
                value: "平顶山",
                hasSubArea: false,
            },
            {
                code: "271000",
                value: "平凉",
                hasSubArea: false,
            },
            {
                code: "130500",
                value: "萍乡",
                hasSubArea: false,
            },
            {
                code: "251100",
                value: "普洱",
                hasSubArea: false,
            },
            {
                code: "110600",
                value: "莆田",
                hasSubArea: false,
            },
            {
                code: "171600",
                value: "濮阳",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "Q",
        type: "0",
        items: [
            {
                code: "260900",
                value: "黔东南",
                hasSubArea: false,
            },
            {
                code: "181500",
                value: "潜江",
                hasSubArea: false,
            },
            {
                code: "261000",
                value: "黔南",
                hasSubArea: false,
            },
            {
                code: "260800",
                value: "黔西南",
                hasSubArea: false,
            },
            {
                code: "120300",
                value: "青岛",
                hasSubArea: true,
            },
            {
                code: "271300",
                value: "庆阳",
                hasSubArea: false,
            },
            {
                code: "031900",
                value: "清远",
                hasSubArea: true,
            },
            {
                code: "160600",
                value: "秦皇岛",
                hasSubArea: false,
            },
            {
                code: "140900",
                value: "钦州",
                hasSubArea: false,
            },
            {
                code: "100600",
                value: "琼海",
                hasSubArea: false,
            },
            {
                code: "101600",
                value: "琼中",
                hasSubArea: false,
            },
            {
                code: "220600",
                value: "齐齐哈尔",
                hasSubArea: false,
            },
            {
                code: "221300",
                value: "七台河",
                hasSubArea: false,
            },
            {
                code: "110400",
                value: "泉州",
                hasSubArea: true,
            },
            {
                code: "250300",
                value: "曲靖",
                hasSubArea: false,
            },
            {
                code: "081200",
                value: "衢州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "R",
        type: "0",
        items: [
            {
                code: "300300",
                value: "日喀则",
                hasSubArea: false,
            },
            {
                code: "121200",
                value: "日照",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "S",
        type: "0",
        items: [
            {
                code: "020000",
                value: "上海",
                hasSubArea: true,
            },
            {
                code: "171800",
                value: "三门峡",
                hasSubArea: false,
            },
            {
                code: "110700",
                value: "三明",
                hasSubArea: false,
            },
            {
                code: "101500",
                value: "三沙",
                hasSubArea: false,
            },
            {
                code: "100300",
                value: "三亚",
                hasSubArea: false,
            },
            {
                code: "201100",
                value: "商洛",
                hasSubArea: false,
            },
            {
                code: "171300",
                value: "商丘",
                hasSubArea: false,
            },
            {
                code: "131200",
                value: "上饶",
                hasSubArea: false,
            },
            {
                code: "300500",
                value: "山南",
                hasSubArea: false,
            },
            {
                code: "030400",
                value: "汕头",
                hasSubArea: true,
            },
            {
                code: "032400",
                value: "汕尾",
                hasSubArea: false,
            },
            {
                code: "031400",
                value: "韶关",
                hasSubArea: false,
            },
            {
                code: "080500",
                value: "绍兴",
                hasSubArea: true,
            },
            {
                code: "191000",
                value: "邵阳",
                hasSubArea: false,
            },
            {
                code: "181700",
                value: "神农架",
                hasSubArea: false,
            },
            {
                code: "230200",
                value: "沈阳",
                hasSubArea: true,
            },
            {
                code: "040000",
                value: "深圳",
                hasSubArea: true,
            },
            {
                code: "310800",
                value: "石河子",
                hasSubArea: false,
            },
            {
                code: "160200",
                value: "石家庄",
                hasSubArea: true,
            },
            {
                code: "180600",
                value: "十堰",
                hasSubArea: false,
            },
            {
                code: "290500",
                value: "石嘴山",
                hasSubArea: false,
            },
            {
                code: "221100",
                value: "双鸭山",
                hasSubArea: false,
            },
            {
                code: "210900",
                value: "朔州",
                hasSubArea: false,
            },
            {
                code: "240600",
                value: "四平",
                hasSubArea: false,
            },
            {
                code: "240700",
                value: "松原",
                hasSubArea: false,
            },
            {
                code: "220400",
                value: "绥化",
                hasSubArea: false,
            },
            {
                code: "091500",
                value: "遂宁",
                hasSubArea: false,
            },
            {
                code: "181200",
                value: "随州",
                hasSubArea: false,
            },
            {
                code: "072000",
                value: "宿迁",
                hasSubArea: false,
            },
            {
                code: "070300",
                value: "苏州",
                hasSubArea: true,
            },
            {
                code: "151600",
                value: "宿州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "T",
        type: "0",
        items: [
            {
                code: "050000",
                value: "天津",
                hasSubArea: true,
            },
            {
                code: "311500",
                value: "塔城",
                hasSubArea: false,
            },
            {
                code: "121100",
                value: "泰安",
                hasSubArea: false,
            },
            {
                code: "071600",
                value: "太仓",
                hasSubArea: false,
            },
            {
                code: "210200",
                value: "太原",
                hasSubArea: true,
            },
            {
                code: "071800",
                value: "泰州",
                hasSubArea: true,
            },
            {
                code: "080800",
                value: "台州",
                hasSubArea: true,
            },
            {
                code: "160500",
                value: "唐山",
                hasSubArea: false,
            },
            {
                code: "181600",
                value: "天门",
                hasSubArea: false,
            },
            {
                code: "270600",
                value: "天水",
                hasSubArea: false,
            },
            {
                code: "231200",
                value: "铁岭",
                hasSubArea: false,
            },
            {
                code: "200500",
                value: "铜川",
                hasSubArea: false,
            },
            {
                code: "240500",
                value: "通化",
                hasSubArea: false,
            },
            {
                code: "280700",
                value: "通辽",
                hasSubArea: false,
            },
            {
                code: "150800",
                value: "铜陵",
                hasSubArea: false,
            },
            {
                code: "260600",
                value: "铜仁",
                hasSubArea: false,
            },
            {
                code: "311400",
                value: "吐鲁番",
                hasSubArea: false,
            },
            {
                code: "311100",
                value: "图木舒克",
                hasSubArea: false,
            },
            {
                code: "101200",
                value: "屯昌",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "W",
        type: "0",
        items: [
            {
                code: "100700",
                value: "万宁",
                hasSubArea: false,
            },
            {
                code: "120500",
                value: "潍坊",
                hasSubArea: true,
            },
            {
                code: "120600",
                value: "威海",
                hasSubArea: false,
            },
            {
                code: "200700",
                value: "渭南",
                hasSubArea: false,
            },
            {
                code: "100500",
                value: "文昌",
                hasSubArea: false,
            },
            {
                code: "251400",
                value: "文山",
                hasSubArea: false,
            },
            {
                code: "080400",
                value: "温州",
                hasSubArea: true,
            },
            {
                code: "281000",
                value: "乌海",
                hasSubArea: false,
            },
            {
                code: "180200",
                value: "武汉",
                hasSubArea: true,
            },
            {
                code: "150300",
                value: "芜湖",
                hasSubArea: true,
            },
            {
                code: "311000",
                value: "五家渠",
                hasSubArea: false,
            },
            {
                code: "281200",
                value: "乌兰察布",
                hasSubArea: false,
            },
            {
                code: "310200",
                value: "乌鲁木齐",
                hasSubArea: true,
            },
            {
                code: "270700",
                value: "武威",
                hasSubArea: false,
            },
            {
                code: "070400",
                value: "无锡",
                hasSubArea: true,
            },
            {
                code: "101000",
                value: "五指山",
                hasSubArea: false,
            },
            {
                code: "290300",
                value: "吴忠",
                hasSubArea: false,
            },
            {
                code: "140700",
                value: "梧州",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "X",
        type: "0",
        items: [
            {
                code: "110300",
                value: "厦门",
                hasSubArea: true,
            },
            {
                code: "200200",
                value: "西安",
                hasSubArea: true,
            },
            {
                code: "190400",
                value: "湘潭",
                hasSubArea: false,
            },
            {
                code: "191500",
                value: "湘西",
                hasSubArea: false,
            },
            {
                code: "180500",
                value: "襄阳",
                hasSubArea: true,
            },
            {
                code: "181300",
                value: "咸宁",
                hasSubArea: false,
            },
            {
                code: "181400",
                value: "仙桃",
                hasSubArea: false,
            },
            {
                code: "200300",
                value: "咸阳",
                hasSubArea: true,
            },
            {
                code: "180900",
                value: "孝感",
                hasSubArea: false,
            },
            {
                code: "091900",
                value: "西昌",
                hasSubArea: false,
            },
            {
                code: "281400",
                value: "锡林郭勒盟",
                hasSubArea: false,
            },
            {
                code: "281300",
                value: "兴安盟",
                hasSubArea: false,
            },
            {
                code: "161100",
                value: "邢台",
                hasSubArea: false,
            },
            {
                code: "320200",
                value: "西宁",
                hasSubArea: false,
            },
            {
                code: "170700",
                value: "新乡",
                hasSubArea: false,
            },
            {
                code: "171200",
                value: "信阳",
                hasSubArea: false,
            },
            {
                code: "130600",
                value: "新余",
                hasSubArea: false,
            },
            {
                code: "211100",
                value: "忻州",
                hasSubArea: false,
            },
            {
                code: "160100",
                value: "雄安新区",
                hasSubArea: false,
            },
            {
                code: "251500",
                value: "西双版纳",
                hasSubArea: false,
            },
            {
                code: "151400",
                value: "宣城",
                hasSubArea: false,
            },
            {
                code: "171100",
                value: "许昌",
                hasSubArea: false,
            },
            {
                code: "071100",
                value: "徐州",
                hasSubArea: true,
            },
        ],
    },
    {
        title: "Y",
        type: "0",
        items: [
            {
                code: "091800",
                value: "雅安",
                hasSubArea: false,
            },
            {
                code: "200600",
                value: "延安",
                hasSubArea: false,
            },
            {
                code: "241100",
                value: "延边",
                hasSubArea: false,
            },
            {
                code: "071300",
                value: "盐城",
                hasSubArea: true,
            },
            {
                code: "032800",
                value: "阳江",
                hasSubArea: false,
            },
            {
                code: "201200",
                value: "杨凌",
                hasSubArea: false,
            },
            {
                code: "100400",
                value: "洋浦经济开发区",
                hasSubArea: false,
            },
            {
                code: "210800",
                value: "阳泉",
                hasSubArea: false,
            },
            {
                code: "070800",
                value: "扬州",
                hasSubArea: true,
            },
            {
                code: "240800",
                value: "延吉",
                hasSubArea: false,
            },
            {
                code: "161300",
                value: "燕郊开发区",
                hasSubArea: false,
            },
            {
                code: "120400",
                value: "烟台",
                hasSubArea: true,
            },
            {
                code: "090700",
                value: "宜宾",
                hasSubArea: false,
            },
            {
                code: "180300",
                value: "宜昌",
                hasSubArea: true,
            },
            {
                code: "220300",
                value: "伊春",
                hasSubArea: false,
            },
            {
                code: "131000",
                value: "宜春",
                hasSubArea: false,
            },
            {
                code: "310500",
                value: "伊犁",
                hasSubArea: false,
            },
            {
                code: "290200",
                value: "银川",
                hasSubArea: false,
            },
            {
                code: "230500",
                value: "营口",
                hasSubArea: false,
            },
            {
                code: "130700",
                value: "鹰潭",
                hasSubArea: false,
            },
            {
                code: "081400",
                value: "义乌",
                hasSubArea: false,
            },
            {
                code: "190800",
                value: "益阳",
                hasSubArea: false,
            },
            {
                code: "191300",
                value: "永州",
                hasSubArea: false,
            },
            {
                code: "102000",
                value: "乐东",
                hasSubArea: false,
            },
            {
                code: "190600",
                value: "岳阳",
                hasSubArea: false,
            },
            {
                code: "140600",
                value: "玉林",
                hasSubArea: false,
            },
            {
                code: "200800",
                value: "榆林",
                hasSubArea: false,
            },
            {
                code: "210300",
                value: "运城",
                hasSubArea: false,
            },
            {
                code: "032900",
                value: "云浮",
                hasSubArea: false,
            },
            {
                code: "320900",
                value: "玉树",
                hasSubArea: false,
            },
            {
                code: "250400",
                value: "玉溪",
                hasSubArea: false,
            },
        ],
    },
    {
        title: "Z",
        type: "0",
        items: [
            {
                code: "121600",
                value: "枣庄",
                hasSubArea: false,
            },
            {
                code: "071400",
                value: "张家港",
                hasSubArea: false,
            },
            {
                code: "191400",
                value: "张家界",
                hasSubArea: false,
            },
            {
                code: "160900",
                value: "张家口",
                hasSubArea: false,
            },
            {
                code: "270900",
                value: "张掖",
                hasSubArea: false,
            },
            {
                code: "110500",
                value: "漳州",
                hasSubArea: false,
            },
            {
                code: "031700",
                value: "湛江",
                hasSubArea: true,
            },
            {
                code: "031800",
                value: "肇庆",
                hasSubArea: true,
            },
            {
                code: "251300",
                value: "昭通",
                hasSubArea: false,
            },
            {
                code: "170200",
                value: "郑州",
                hasSubArea: true,
            },
            {
                code: "071000",
                value: "镇江",
                hasSubArea: true,
            },
            {
                code: "030700",
                value: "中山",
                hasSubArea: true,
            },
            {
                code: "290400",
                value: "中卫",
                hasSubArea: false,
            },
            {
                code: "170800",
                value: "周口",
                hasSubArea: false,
            },
            {
                code: "081100",
                value: "舟山",
                hasSubArea: false,
            },
            {
                code: "030500",
                value: "珠海",
                hasSubArea: true,
            },
            {
                code: "171400",
                value: "驻马店",
                hasSubArea: false,
            },
            {
                code: "190300",
                value: "株洲",
                hasSubArea: true,
            },
            {
                code: "120700",
                value: "淄博",
                hasSubArea: false,
            },
            {
                code: "090800",
                value: "自贡",
                hasSubArea: false,
            },
            {
                code: "091400",
                value: "资阳",
                hasSubArea: false,
            },
            {
                code: "260300",
                value: "遵义",
                hasSubArea: false,
            },
        ],
    },
]);

const letterGroups = computed(() => {
    const groups = [];
    let title = "";
    for (let index = 0; index < dialogData.value.length; ++index) {
        if (index < 3) {
            groups.push(dialogData.value[index].title);
        } else {
            title += dialogData.value[index].title;

            if (
                (index + 1) % 3 === 0 ||
                index === dialogData.value.length - 1
            ) {
                groups.push(title);
                title = "";
            }
        }
    }
    return groups;
});

const selectedGroup = ref(letterGroups.value[0]);
const selectedCities = ref([]);
const maxSelectedCnt = 3;
const citiesGroupedByLetter = computed(() => {
    if (!selectedGroup.value) {
        return [];
    }
    const groupedCities = {};
    dialogData.value.forEach((group) => {
        if (selectedGroup.value.includes(group.title)) {
            group.items.forEach((city) => {
                const letter = group.title;
                if (!groupedCities[letter]) {
                    groupedCities[letter] = [];
                }
                groupedCities[letter].push({
                    title: group.title,
                    code: city.code,
                    value: city.value,
                    hasSubArea: city.hasSubArea,
                });
            });
        }
    });

    return Object.values(groupedCities);
});

const closeDialog = () => {
    emit("closeWorkPlaceDialog");
    selectedCities.value.splice(0, selectedCities.value.length);
};

const confirmSelection = () => {
    emit("confirmWorkPlaceDialog", selectedCities.value);
};

const handleTagClose = (selectedCity) => {
    selectedCities.value.splice(selectedCities.value.indexOf(selectedCity), 1);
};

const selectGroup = (group) => {
    selectedGroup.value = group;
};

const selectCities = (city) => {
    if (selectedCities.value.includes(city)) {
        selectedCities.value.splice(selectedCities.value.indexOf(city), 1);
    } else if (selectedCities.value.length < maxSelectedCnt) {
        selectedCities.value.push(city);
    }
};
</script>

<style scoped lang="scss">
.work-place-dialog {
    user-select: none;
    &:deep() {
        .el-dialog {
            height: 90%;
            overflow: hidden;
            border-radius: 12px;
            padding: 0;
            max-height: 600px;
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
        }

        .el-dialog__header {
            border-bottom: 1px solid #edeff2;
            padding: 24px;
            height: 75px;
        }

        .el-dialog__body {
            padding: 0 !important;
            height: calc(100% - 150px);
            color: #606266;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            word-break: break-all;
        }

        .el-dialog__footer {
            height: 75px;
            padding: 16px 32px 24px !important;
            border-top: 1px solid #edeff2;
        }
    }

    .dialog-header-wrapper {
        display: flex;
        align-items: center;

        .work-place-dialog-title {
            margin-right: 16px;
            font-size: 16px;
            font-weight: 600;
            color: #222;
            line-height: 24px;
        }
    }

    .dialog-header-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        outline: 0;
        padding: 0;
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .dialog-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .dialog-footer-btn {
            background-color: #fff;
            border: 1px solid #e1e3e8;
            border-radius: 6px;
            color: #666;
            width: 80px;
            font-size: 14px;
            padding: 10px 20px;
        }

        .dialog-footer-confirm {
            margin-left: 12px;
            background: #3ec6c5;
            border: 1px solid #3ec6c5;
            color: #fff;
        }
    }

    .work-place-selected {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 16px 24px;
        height: 60px;
        border-bottom: 1px solid #edeff2;

        .count-total {
            color: #222;
            font-size: 14px;
            margin-right: 16px;

            .count-checked {
                color: #3ec6c5;
                font-weight: 600;
            }
        }

        .work-place-selected-tag {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            &:deep() {
                .el-tag {
                    height: 32px;
                    line-height: 32px;
                    margin-right: 8px;
                    background-color: rgba(0, 190, 190, 0.2);
                    color: #00bebd;
                    border-radius: 6px;
                }

                .el-tag__close {
                    border-radius: 4px;
                    color: #00bebd;

                    &:hover {
                        background: #00bebd;
                        color: #fff;
                    }
                }
            }
        }
    }

    .work-place-panel {
        display: flex;
        height: 100%;
        overflow: hidden;

        .work-place-left-container {
            background: #f5f6f7;
            overflow-y: auto;
            text-align: left;
            padding: 8px;
            height: 100%;
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            letter-spacing: 2px;

            .work-place-left-title-box {
                width: 136px;
                min-height: 40px;
                padding: 9px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 400;
                color: #222;
                line-height: 22px;
                overflow-x: hidden;
                overflow-y: hidden;
                cursor: pointer;

                .work-place-left-title {
                    display: inline-block;
                    padding-right: 5px;
                }

                &:not(.work-place-left-title-box-active):hover {
                    font-weight: 600;
                    background: #3ec6c5;
                    color: #fff;
                }
            }

            .work-place-left-title-box-active {
                color: #3ec6c5;
                font-weight: 600;
            }
        }
        .work-place-right-container {
            padding: 8px 10px;
            overflow-y: auto;
            width: 80%;

            .work-place-right-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;

                .work-place-right-box {
                    .work-place-right-title {
                        font-weight: 600;
                        color: #222;
                        margin: 10px 0 13px 16px;
                        margin-left: 16px;
                    }

                    .work-place-right-city {
                        width: 152px;
                        padding: 0 16px;
                        height: 40px;
                        line-height: 40px;
                        display: inline-flex;
                        align-items: center;
                        cursor: pointer;
                        background: #fff;
                        border-radius: 8px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #222;

                        &:not(.work-place-right-city-active):hover {
                            font-weight: 600;
                            background: #3ec6c5;
                            color: #fff;
                        }

                        .work-place-icon-check {
                            display: inline-flex;
                            align-items: center;
                            margin-left: 2px;
                        }
                    }
                }
            }
        }
    }
}
</style>
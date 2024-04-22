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
                    <SvgIcon name="close" size="20" />
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
                                >
                                    <SvgIcon name="check" size="16" />
                                </i>
                            </span>
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
import { cities } from "./mock";
defineProps({
    isShowWorkPlaceDialog: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["closeWorkPlaceDialog", "confirmWorkPlaceDialog"]);

const dialogData = ref(cities);

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
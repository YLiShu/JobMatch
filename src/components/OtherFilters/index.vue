<template>
    <div class="other-filters">
        <div class="other-filters-text">其他筛选</div>
        <div class="other-filters-options">
            <div class="other-filters-mutiselect">
                <div class="other-filters-mutiselect-input">
                    <div
                        class="other-filters-title"
                        :style="selectedCategoryName && { color: '#00bebd' }"
                    >
                        {{ selectedCategoryName || "职位分类" }}
                    </div>
                </div>
                <div class="other-filters-mutiselect-box">
                    <ul class="other-filters-mutiselect-select">
                        <li
                            class="other-filters-mutiselect-select-item"
                            v-for="category in categoryList"
                            :key="category.categoryId"
                            @click.stop="selectCategory(category)"
                        >
                            <div class="text">{{ category.categoryName }}</div>
                            <SvgIcon
                                v-if="category.selected"
                                name="check"
                                size="16"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="other-filters-mutiselect">
                <div class="other-filters-mutiselect-input">
                    <div
                        class="other-filters-title"
                        :style="selectedSalaryName && { color: '#00bebd' }"
                    >
                        {{ selectedSalaryName || "薪资排序" }}
                    </div>
                </div>
                <div class="other-filters-mutiselect-box">
                    <ul class="other-filters-mutiselect-select">
                        <li
                            class="other-filters-mutiselect-select-item"
                            v-for="salary in salaryList"
                            :key="salary.salaryId"
                            @click.stop="selectSalaryOption(salary)"
                        >
                            <div class="text">{{ salary.salaryName }}</div>
                            <SvgIcon
                                v-if="salary.selected"
                                name="check"
                                size="16"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="other-filters-clear" @click="clearSelections">
            清空筛选条件
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getCategoryList } from "../../api/jobs";

const props = defineProps({
    category: {
        type: Number,
        default: undefined,
    },
});

interface Categorization {
    categoryId: number;
    categoryName: string;
    description: string;
    selected?: boolean;
}

interface SalaryList {
    salaryId: string;
    salaryName: string;
    selected?: boolean;
}

const emit = defineEmits(["updatedFilter"]);

const categoryList = ref<Categorization[]>([]);
const salaryList = ref<SalaryList[]>([
    {
        salaryId: "salaryUp",
        salaryName: "由低至高",
        selected: false,
    },
    {
        salaryId: "salaryDown",
        salaryName: "由高至低",
        selected: false,
    },
]);

const getCategory = async () => {
    const { data } = await getCategoryList();
    data.unshift({
        categoryId: 0,
        categoryName: "不限",
        description: "",
        selected: false,
    });
    categoryList.value.push(...data);
};

const selectCategory = (category: Categorization) => {
    categoryList.value.forEach((cat) => (cat.selected = false));
    category.selected = !category.selected;
    emit("updatedFilter", { categoryId: category.categoryId });
};

const selectSalaryOption = (option: SalaryList) => {
    salaryList.value.forEach((cat) => (cat.selected = false));
    option.selected = !option.selected;
    emit("updatedFilter", { salaryId: option.salaryId });
};

const clearSelections = () => {
    categoryList.value.forEach((category) => (category.selected = false));
    salaryList.value.forEach((salary) => (salary.selected = false));
    emit("updatedFilter", { categoryId: 0, salaryId: "salaryUp" });
};

const selectedCategoryName = computed(() => {
    const selectedCategory = categoryList.value.find((cat) => cat.selected);
    return selectedCategory ? selectedCategory.categoryName : "";
});

const selectedSalaryName = computed(() => {
    const selectedSalary = salaryList.value.find((cat) => cat.selected);
    return selectedSalary ? selectedSalary.salaryName : "";
});

onMounted(async () => {
    await getCategory();
    if (props.category !== undefined) {
        const defaultCategory = categoryList.value.find(
            (cat) => cat.categoryId === props.category
        );
        if (defaultCategory) {
            selectCategory(defaultCategory);
        }
    }
});
</script>

<style scoped lang="scss">
.other-filters {
    align-items: center;
    color: #222;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    height: 22px;
    line-height: 48px;
    min-height: 48px;
    width: 1000px;

    .other-filters-text {
        font-size: 15px;
        width: 80px;
    }

    .other-filters-options {
        align-items: center;
        display: flex;
        flex: 1;
        margin-right: 12px;

        .other-filters-mutiselect {
            background-color: #f5f6f7;
            border-radius: 8px;
            height: 32px;
            margin-right: 16px;
            position: relative;

            .other-filters-mutiselect-input {
                align-items: center;
                border: 1px solid transparent;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                height: 32px;
                line-height: 32px;

                .other-filters-title {
                    background-color: transparent;
                    border: 0;
                    color: #222;
                    font-size: 14px;
                    font-weight: 400;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2px 8px;
                }

                .other-filters-icon {
                    height: 32px;
                    line-height: 30px;
                    padding-left: 8px;
                    padding-right: 12px;
                }
            }

            .other-filters-mutiselect-box {
                display: none;
                padding-top: 8px;
                position: absolute;
                z-index: 10;

                .other-filters-mutiselect-select {
                    background-color: #fff;
                    border: 1px solid #edeff2;
                    border-radius: 12px;
                    padding: 8px 5px;
                    width: 192px;
                    max-height: 200px;
                    overflow: auto;

                    .other-filters-mutiselect-select-item {
                        border-radius: 8px;
                        box-sizing: border-box;
                        color: #222;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        font-weight: 400;
                        height: 36px;
                        padding: 7px 10px;

                        .text {
                            flex: 1;
                            height: 22px;
                            text-align: left;
                            line-height: 22px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:hover {
                            background: #f6f6f6;
                        }
                    }
                }
            }

            &:hover {
                .other-filters-mutiselect-box {
                    display: block !important;
                }
            }
        }
    }

    .other-filters-clear {
        color: #afb3ba;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        height: 20px;
        line-height: 20px;

        &:hover {
            color: #00bebd;
        }
    }
}
</style>
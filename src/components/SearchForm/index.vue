<template>
    <div class="search-form">
        <form @submit.prevent="handleSearch">
            <div class="search-form-con">
                <!-- <div class="position-sel" @click="handleShowWorkPlaceDialog">
                    <span class="label-text">
                        <b>{{ workPlaceTitle }}</b>
                        <SvgIcon name="position" size="14" />
                    </span>
                </div> -->
                <p class="ipt-wrap">
                    <input
                        type="text"
                        name="keyword"
                        v-model="keyword"
                        class="ipt-search"
                        maxlength="50"
                        autocomplete="off"
                        placeholder="搜索职位、公司"
                    />
                </p>
            </div>
            <button class="btn-search">搜索</button>
        </form>
    </div>
    <!-- <WorkPlaceDialog
        :isShowWorkPlaceDialog="isShowWorkPlaceDialog"
        @closeWorkPlaceDialog="handleCloseWorkPlace"
        @confirmWorkPlaceDialog="handleConfirmWorkPlace"
    /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";
// import WorkPlaceDialog from "../WorkPlaceDialog/index.vue";
// const isShowWorkPlaceDialog = ref(false);
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});
const keyword = ref(props.modelValue);
// const workPlace = ref<any>([
//     {
//         title: "",
//         code: "",
//         value: "全国",
//         hasSubArea: "",
//     },
// ]);

// const handleShowWorkPlaceDialog = () => {
//     isShowWorkPlaceDialog.value = true;
// };
// const handleCloseWorkPlace = () => {
//     isShowWorkPlaceDialog.value = false;
// };
// const workPlaceTitle = computed(() => {
//     let title = "全国";
//     if (!workPlace.value.length) {
//         return title;
//     } else if (workPlace.value.length >= 2) {
//         title = `${workPlace.value[0].value}...(${workPlace.value.length})`;
//     } else {
//         title = workPlace.value[0].value;
//     }
//     return title;
// });
// const handleConfirmWorkPlace = (newWorkPlace: []) => {
//     workPlace.value = [...newWorkPlace];
//     handleCloseWorkPlace();
// };

const handleSearch = () => {
    router.push(`/job-search?keyword=${keyword.value}`);
};
</script>

<style scoped lang="scss">
.search-form {
    width: 100%;
    max-width: 1000px;
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
</style>
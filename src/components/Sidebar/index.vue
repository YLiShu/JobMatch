<template>
    <div class="side-bar">
        <div class="side-bar-backup" v-show="isShow" @click="handleBackUp">
            <SvgIcon name="backup" size="32" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ isShow: boolean }>();
const emit = defineEmits(["backUp"]);
const handleBackUp = () => {
    emit("backUp");
};
</script>

<style lang="scss" scoped>
.side-bar {
    .side-bar-backup {
        height: 60px;
        width: 60px;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(76, 79, 84, 0.08);
        cursor: pointer;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
}
</style>
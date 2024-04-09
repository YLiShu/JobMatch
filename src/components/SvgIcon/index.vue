<template>
    <svg
        :class="svgClass"
        :style="svgStyle"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg"
    >
        <use :href="iconName" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: "24",
    },
    className: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "",
    },
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
    return props.className ? `svg-icon ${props.className}` : "svg-icon";
});
const svgStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
}));
</script>

<style scoped>
</style>
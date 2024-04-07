<template>
    <div class="tab">
        <header class="tab_header">
            <div class="tabs">
                <div
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="{ active: activeTab === index }"
                    @click="() => emitChangeTab(index)"
                    class="tab_item"
                >
                    {{ tab.title }}
                    <transition name="underline">
                        <div
                            class="underline"
                            v-show="activeTab === index"
                        ></div>
                    </transition>
                </div>
            </div>
        </header>
        <main class="tab_main">
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
    activeTab: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["changeTab"]);

const emitChangeTab = (index: number) => {
    emit("changeTab", index);
};
</script>

<style lang="scss" scoped>
.tab {
    height: 100%;

    .tab_header {
        height: 55px;
        padding: 5px;
        background: linear-gradient(135deg, #f4ffff 0, #fcfbfa 100%);
        border-radius: 12px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        user-select: none;
        cursor: pointer;

        .tabs {
            display: flex;
            height: 100%;
            justify-content: space-around;

            .tab_item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                position: relative;
                color: #666;
                transition: all 0.3s ease-in-out;

                .underline {
                    position: absolute;
                    bottom: 3px;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 3px;
                    width: 20%;
                    border-radius: 15px;
                    background-color: #3ec6c5;
                }

                .underline-enter-active,
                .underline-leave-active {
                    transition: all 0.3s ease-in-out;
                }

                .underline-enter-from,
                .underline-leave-to {
                    opacity: 0;
                    width: 0%;
                }

                .underline-enter-to,
                .underline-leave-from {
                    opacity: 1;
                    width: 20%;
                }
            }

            .active {
                font-size: 17px;
                font-weight: bolder;
                color: #3ec6c5;
            }
        }
    }

    .tab_main {
        height: 100%;
    }
}
</style>
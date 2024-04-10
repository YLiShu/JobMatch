<script setup lang="ts">
defineProps<{
    loading: boolean;
}>();
</script>

<template>
    <div
        class="loading-wrapper"
        :style="{ visibility: loading ? 'visible' : 'hidden' }"
    >
        <div class="container">
            <div class="loading">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$offset: 0;
$offset-max: 40px;
$width: calc($offset-max / 2);
$duration: 4s;
$spinning-duration: $duration;
$stagger: calc($duration / 2);
$round: 0.3rem;

$color1: #ef5350;
$color2: #42a5f5;
$color3: #ffca28;
$color4: #5c6bc0;

$ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);

.loading {
    width: $width;
    height: $width;
    transform: rotate(45deg);
    animation: loading-ani1 $spinning-duration $ease-out-quart infinite;
}

.loading i {
    width: $width;
    height: $width;
    display: inline-block;
    border-radius: $round;
    position: absolute;
}
.loading i:nth-child(1) {
    background: $color1;
    transform: translate(0, $offset);
    animation: loading-ani2 $duration ease-in-out infinite;
}
.loading i:nth-child(2) {
    background: $color2;
    transform: rotate(90deg) translate(0, $offset);
    animation: loading-ani3 $duration + $stagger ease-in-out infinite;
}
.loading i:nth-child(3) {
    background: $color3;
    transform: rotate(180deg) translate(0, $offset);
    animation: loading-ani4 $duration + $stagger + $stagger ease-in-out infinite;
}
.loading i:nth-child(4) {
    background: $color4;
    transform: rotate(270deg) translate(0, $offset);
    animation: loading-ani5 $duration + $stagger + $stagger + $stagger
        ease-in-out infinite;
}

@keyframes loading-ani1 {
    25% {
        transform: rotate(135deg);
    }
    50% {
        transform: rotate(225deg);
    }
    75% {
        transform: rotate(315deg);
    }
    100% {
        transform: rotate(405deg);
    }
}

@keyframes loading-ani2 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: translate(0, $offset);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: translate(0, $offset-max);
    }
}

@keyframes loading-ani3 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(90deg) translate(0, $offset);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(90deg) translate(0, $offset-max);
    }
}

@keyframes loading-ani4 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(180deg) translate(0, $offset);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(180deg) translate(0, $offset-max);
    }
}

@keyframes loading-ani5 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(270deg) translate(0, $offset);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(270deg) translate(0, $offset-max);
    }
}

// -----------------------------------------------------
// misc
// -----------------------------------------------------
// body { margin: 0; background: $grey-50 }

// center

.loading-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

* {
    z-index: 999;
}
</style>
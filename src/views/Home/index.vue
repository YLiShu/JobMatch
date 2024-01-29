<template>
  <div class="container">
    <Sidebar></Sidebar>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../../components/Sidebar/index.vue";
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}
</style>
<template>
  <div class="container">
    <div class="item-name">{{ name }}</div>
    <input 
      v-if="value.length <= 20"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      class="input"
      placeholder="请输入"
    />
    <textarea 
      v-else
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      class="input textarea"
      placeholder="请输入"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: string;
}>();

defineEmits(['update:value'])
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 24px;

  .item-name {
    font-size: 14px;
    font-weight: 600;
    color: #1f2329;
    margin-bottom: 8px;
  }

  .input {
    width: 100%;
    min-height: 40px;
    padding: 6px 12px;
    box-sizing: border-box;
    margin: 0;
    background-color: #fff;
    background-image: none;
    border: 1px solid #c3c6cb;
    border-radius: 4px;
    transition: all 0.3s;
    caret-color: #325ab4;

    &:hover, &:focus, &:active {
        border-color: #325ab4;
        outline-color: #325ab4;
        border-right-width: 1px !important;
    }
  }

  .textarea {
    min-height: 100px;
    resize: vertical;
  }
}
</style>
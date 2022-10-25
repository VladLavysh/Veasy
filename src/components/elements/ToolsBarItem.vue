<script setup lang="ts">
defineProps({
  tool: {
    type: Object,
    required: true
  }
})
</script>
  
<template>
  <div class="item">
    <span>{{tool.name}}</span>
    <n-icon size="35">
      <component :is="tool.component" />
    </n-icon>
  </div>
</template>
  
<style scoped lang="scss">
@import '../../../src/utils/css/mixins.scss';

.item {
  @include flex-column;
  @include nav-and-tools-button(80px, grab, 5px, 7px);

  border: 2px solid #e3e8ed;

  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #98acbf;
  }

  &:active {
    border-radius: 0;
    cursor: grabbing;
  }
}
</style>
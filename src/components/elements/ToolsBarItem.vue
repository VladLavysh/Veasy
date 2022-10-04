<script setup lang="ts">
defineProps({
  tool: {
    type: Object,
    required: true
  }
})

const dropItem = (e: MouseEvent) => {
  console.log('e', e);

}
</script>
  
<template>
  <div class="item" draggable="true" @dragend="dropItem">
    <span class="item__title">{{tool.name}}</span>
    <n-icon size="35" class="item__icon">
      <component :is="tool.component" />
    </n-icon>
  </div>
</template>
  
<style scoped lang="scss">
@import '../../../src/utils/css/mixins.scss';

.item {
  @include nav-and-tools-button(80px, grabbing);

  border: 2px solid #e3e8ed;

  transition: border 0.2s ease-in-out;

  &:hover {
    border-color: #98acbf;
  }

  &__title {}

  &__icon {}
}
</style>
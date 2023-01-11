<script setup lang="ts">
import { useToolsStore } from '../../store/tools'

const store = useToolsStore()

defineProps({
  tool: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div :class="[!store.isPanelOpen ? 'item-small' : '', 'item']">
    <span>{{ tool.name }}</span>
    <n-icon :size="store.isPanelOpen ? 35 : 25">
      <component :is="tool.component" />
    </n-icon>
  </div>
</template>
  
<style scoped lang="scss">
@import '../../../src/utils/css/mixins.scss';

.item {
  @include flex-column;
  @include nav-and-tools-button(80px, grab, 5px, 7px);

  height: 65px;

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

.item-small {
  @include nav-and-tools-button(70px, grab, 5px, 7px);

  font-size: 0.75rem;

  height: 50px;
}
</style>
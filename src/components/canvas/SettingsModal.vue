<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { DocumentDownload, UserProfile } from '@vicons/carbon'
import { useMessage } from 'naive-ui'
import { useCanvasStore } from '../../store/canvas';

// Props and Emits
const props = defineProps<{
  isOpen: Boolean,
}>()
const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: Boolean): void
}>()

// Variables
const canvasStore = useCanvasStore()
const message = useMessage()

const canvasSettings = reactive<{ name: string, backgroundColor: string }>({
  name: 'Canvas name',
  backgroundColor: '#ffffff'
})

// Methods
const applySettingsChanges = () => {
  if (!canvasSettings.name.trim() || !canvasSettings.backgroundColor) {
    message.info('Some fields are empty.')
    return
  }

  if (canvasSettings.name.trim() === canvasStore.canvasSettings.name && canvasSettings.backgroundColor === canvasStore.canvasSettings.backgroundColor) {
    message.info('No changes have been made.')
    return
  }

  canvasStore.updateCanvasSettings(canvasSettings)
  message.success('Canvas settings have been updated!')
}

</script>

<template>
  <n-modal preset="card" title="Canvas options"
    v-model:show="props.isOpen" :segmented="{ content: 'soft', footer: 'soft' }" :style="{ width: '500px' }"
    :mask-closable="false" @mask-click="emit('update:isOpen', false)"
    @esc="emit('update:isOpen', false)">
    <n-tabs type="segment" animated>
      <n-tab-pane name="options" tab="Canvas" class="canvas-options">
        <div class="canvas-options__option">
          <span>File name:</span>
          <n-input type="text" v-model:value="canvasSettings.name" size="medium" />
        </div>
        <div class="canvas-options__option">
          <span>Background color:</span>
          <n-color-picker v-model:value="canvasSettings.backgroundColor" />
        </div>
        <n-button type="success" class="canvas-options__submit" :disabled="!canvasSettings.name.trim() || !canvasSettings.backgroundColor"
                  @click="applySettingsChanges">
          Save
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="templates" tab="Templates">
        Templates
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';
.modal-pane {
  background-color: aqua
}

.canvas-options {
  @include flex-column;
  gap: 20px;
  align-items: flex-start;

  margin-top: 20px;

  &__option {
    width: 100%;
    // height: 50px;
  }
  &__submit {
    width: 90px;
    margin: auto;
  }
}
</style>

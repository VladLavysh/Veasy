<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { DocumentDownload, UserProfile } from '@vicons/carbon'
import { useMessage } from 'naive-ui'
import { useCanvasStore } from '../../store/canvas';
import { CanvasSettings } from '../../types/index';

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

const canvasSettings = reactive<CanvasSettings>({
  name: 'Canvas name',
  backgroundColor: '#ffffff',
  gridStatus: 'default',
  size: {
    width: 800,
    height: 1120
  },
})

// Methods
const changeGridStatus = (e: MouseEvent) => {
  console.log(e.target.value);

  canvasSettings.gridStatus = e.target.value
}

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
  <n-modal preset="card" title="Canvas options" v-model:show="props.isOpen"
    :segmented="{ content: 'soft', footer: 'soft' }" :style="{ width: '500px' }" :mask-closable="false"
    @mask-click="emit('update:isOpen', false)" @esc="emit('update:isOpen', false)">
    <n-tabs type="segment" animated>
      <n-tab-pane name="options" tab="Canvas" class="canvas-options">
        <div class="canvas-options__option">
          <p>File name:</p>
          <n-input type="text" v-model:value="canvasSettings.name" size="medium" />
        </div>
        <div class="canvas-options__option">
          <p>Size:</p>
          <div>
            <div class="canvas-options__option-size">
              <p>width:</p>
              <n-input-number :min="50" v-model:value="canvasSettings.size.width" :step="10" size="medium" />
            </div>
            <div class="canvas-options__option-size">
              <p>height:</p>
              <n-input-number :min="50" v-model:value="canvasSettings.size.height" :step="10" size="medium" />
            </div>
          </div>
        </div>
        <div class="canvas-options__option">
          <p>Background color:</p>
          <n-color-picker v-model:value="canvasSettings.backgroundColor" />
        </div>
        <div class="canvas-options__option">
          <p>Grid:</p>
          <n-radio :checked="canvasSettings.gridStatus === 'never'" value="never" @change="changeGridStatus">
            Never show
          </n-radio>
          <n-radio :checked="canvasSettings.gridStatus === 'default'" value="default" @change="changeGridStatus">
            Show while transform shape
          </n-radio>
          <n-radio :checked="canvasSettings.gridStatus === 'always'" value="always" @change="changeGridStatus">
            Always show
          </n-radio>
        </div>

        <n-button type="success" class="canvas-options__submit"
          :disabled="!canvasSettings.name.trim() || !canvasSettings.backgroundColor" @click="applySettingsChanges">
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
  gap: 10px;
  align-items: flex-start;

  margin-top: 20px;

  &__option {
    @include flex-row;
    width: 100%;
    // height: 50px;

    p {
      width: 40%;
      white-space: nowrap;
    }
  }

  &__option-size {
    @include flex-row;
    //gap: 10px;
  }

  &__submit {
    width: 90px;
    margin: auto;
  }
}
</style>

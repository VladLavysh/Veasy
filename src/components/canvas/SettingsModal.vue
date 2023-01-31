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

// const settings = computed<CanvasSettings>(() => Object.assign({}, {...canvasStore.canvasSettings}))
const settings = reactive<CanvasSettings>({...canvasStore.canvasSettings})


// Methods
const validateCanvasSettings = () => {
  const validateObj = {
    text: 'Canvas settings have been updated!',
    status: true
  }

  if (!settings.name.trim() || !settings.backgroundColor || settings.width < 50 || settings.height < 50) {
    validateObj.text = 'Some fields are incorrect.'
    validateObj.status = false
  }

  if (settings.name.trim() === canvasStore.canvasSettings.name && settings.backgroundColor === canvasStore.canvasSettings.backgroundColor && settings.width === canvasStore.canvasSettings.width && settings.height === canvasStore.canvasSettings.height && settings.gridStatus === canvasStore.canvasSettings.gridStatus) {
    validateObj.text = 'No changes have been made.'
    validateObj.status = false
  }

  return validateObj
}

const changeGridStatus = (e: Event) => {
  settings.gridStatus = (e.target as HTMLInputElement).value
}

const applySettingsChanges = () => {
  const {text, status} = validateCanvasSettings()

  if (!status) {
    message.info(text)
    return
  }

  canvasStore.updateCanvasSettings(settings)
  message.success('Canvas settings have been updated!')
}

</script>

<template>
  <n-modal preset="card" title="Canvas options" v-model:show="props.isOpen"
    :segmented="{ content: 'soft', footer: 'soft' }" :style="{ width: '450px' }" :mask-closable="false"
    @mask-click="emit('update:isOpen', false)" @esc="emit('update:isOpen', false)">
    <n-tabs type="segment" animated>
      <n-tab-pane name="options" tab="Canvas" class="canvas-options">
        <div class="canvas-options__option">
          <p>File name:</p>
          <n-input type="text" v-model:value="settings.name" size="medium" />
        </div>
        <div class="canvas-options__option">
          <p>Size:</p>
          <div>
            <div class="canvas-options__option-size">
              <p>width:</p>
              <n-input-number :min="50" v-model:value="settings.width" :step="10" size="medium" />
            </div>
            <div class="canvas-options__option-size">
              <p>height:</p>
              <n-input-number :min="50" v-model:value="settings.height" :step="10" size="medium" />
            </div>
          </div>
        </div>
        <div class="canvas-options__option">
          <p>Background color:</p>
          <n-color-picker v-model:value="settings.backgroundColor" />
        </div>
        <div class="canvas-options__option">
          <p>Grid:</p>
          <n-space>
            <n-radio :checked="settings.gridStatus === 'never'" value="never" @change="changeGridStatus">
              Never
            </n-radio>
            <n-radio :checked="settings.gridStatus === 'default'" value="default" @change="changeGridStatus">
              Default
            </n-radio>
            <n-radio :checked="settings.gridStatus === 'always'" value="always" @change="changeGridStatus">
              Always
            </n-radio>
          </n-space>
        </div>

        <n-button type="success" class="canvas-options__submit"
          :disabled="!settings.name.trim() || !settings.backgroundColor" @click="applySettingsChanges">
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
    justify-content: space-between;
    width: 100%;
    // height: 50px;

    p {
      width: 35%;
      white-space: nowrap;
    }

    div {
      width: 65%;
    }
  }

  &__option-size {
    @include flex-row;
    width: 100% !important;

    // div {
    //   width: 100%;
    // }
    //gap: 10px;
  }

  &__submit {
    width: 90px;
    margin: auto;
  }
}
</style>

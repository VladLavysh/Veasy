<script setup lang="ts">
import { computed, Transition } from 'vue'
import { Unlocked, Locked } from '@vicons/carbon'
import { useCanvasStore } from '../../store/canvas'
import { borderTypes, textConfig, normalizeTextConfigLabel } from '../../utils/ts/tools'
import { ToolEditItem, ToolConfig, UploadImage } from '../../types/index'

const store = useCanvasStore()

const tool = computed((): ToolConfig | null => {
  return store.selectedTool || null
})

// Computed properties
const lockerComponent = computed(() => {
  return tool.value?.draggable ? Unlocked : Locked
})

const lockerColor = computed<string>(() => {
  return tool.value?.draggable
    ? '#aff9c4'
    : '#ffad9f'
})

const normalizedToolName = computed<string>(() => {
  return tool.value
    ? tool.value.name.match(/([^_]+)/)![0]
    : ''
})

const toolBorderType = computed<string | undefined>(() => {
  if (!tool.value) return
  if (!Array.isArray(tool.value.dash)) return

  return tool.value.dash[0] === 0
    ? 'solid'
    : 'dashed'
})

// Helper functions
const toggleToolDraggable = () => {
  if (!tool.value) return

  tool.value.draggable = !tool.value.draggable
}

const changeToolBorder = (borderType: [0, 0] | [5, 5]) => {
  if (!tool.value) return

  tool.value.dash = borderType
}

const changeBorderVisibility = (isVisible: boolean) => {
  if (!tool.value) return

  tool.value.strokeWidth = isVisible ? 2 : 0
}

// TODO: Fix type errors
const editItemClickHandler = ({ _, configLabel, optionLabel, isHandler }: ToolEditItem) => {
  if (!tool.value) return

  let normalizedItemName = normalizeTextConfigLabel(configLabel)

  if (!(normalizedItemName in tool.value)) return

  if ((isHandler && tool.value[normalizedItemName] === optionLabel) && (configLabel === 'Font style' || configLabel === 'Text decoration')) {
    tool.value[normalizedItemName] = 'normal'
    return
  }

  if (isHandler) {
    tool.value[normalizedItemName] = optionLabel
    return
  }

  return tool.value[normalizedItemName] === optionLabel
}

const beforeImageUpload = (data: UploadImage) => {
  console.log(data.file.name);

  // TODO upload image to server
  //tool.value?.image?.src = `http://127.0.0.1:5173/${data.file.name}`

  return false

  // TODO Image type check
  //const message = useMessage()
  //if (data.file.file?.type !== 'image/png') {
  //  message.error('Only upload picture files in png format, please re-upload.')
  //  return false
  //}
  //return true
}
</script>

<!-- Shapes switch animation (left to right) -->
<template>
  <aside class="tool-editor">
    <h1 class="tool-editor__label">Tool Editor</h1>

    <Transition name="editor" mode="out-in">
      <div v-if="tool" class="tool-editor__items items">
        <n-divider class="items__divider" />

        <!-- Tool name -->
        <div class="items__label">
          <span>{{ normalizedToolName }}</span>
          <n-icon size="20" :color="lockerColor" :component="lockerComponent" @click="toggleToolDraggable" />
        </div>

        <!-- Text -->
        <div class="items__body" v-if="normalizedToolName === 'Text'">
          <div class="item">
            <span>Value</span>
            <n-input type="textarea" v-model:value="tool.text" size="medium" />
          </div>
          <div class="item">
            <span>Font size</span>
            <n-input-number v-model:value="tool.fontSize" :validator="(x: number) => x > 0" size="medium" />
          </div>
          <div class="item" v-for="config of textConfig" :key="config.label">
            <span>{{ config.label }}</span>

            <!-- Font Family -->
            <n-select v-if="config.label === 'Font family'" v-model:value="tool.fontFamily" size="medium"
              :options="config.options" />

            <!-- Font Style, Text Decoration, Horizontal Align, Vertical Align -->
            <div v-else class="item__font-style">
              <n-icon-wrapper v-for="option of config.options" :key="option.label" :size="24" :border-radius="5"
                @click="editItemClickHandler({ _: null, configLabel: config.label, optionLabel: option.label as keyof ToolConfig, isHandler: true })"
                color="#fff"
                :class="[editItemClickHandler({ _: null, configLabel: config.label, optionLabel: option.label as keyof ToolConfig, isHandler: false }) ? 'icon-active' : '']">
                <n-icon :size="18" :component="option.value" color="#333639" />
              </n-icon-wrapper>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="items__body" v-if="normalizedToolName === 'Image'">
          <h3 class="item__label">Image</h3>
          <div class="item item-no-margin">
            <span>Source</span>
            <n-input v-model:value="tool.image!.src" type="text" placeholder="Image sourse" />
            <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" @before-upload="beforeImageUpload">
              <n-button class="upload-btb" secondary color="#fff">Upload image</n-button>
            </n-upload>
          </div>
        </div>

        <!-- Color -->
        <div class="items__body">
          <h3 class="item__label">Color</h3>
          <div class="item item-no-margin" v-if="normalizedToolName !== 'Barrier' && normalizedToolName !== 'Image'">
            <span>Fill</span>
            <n-color-picker v-model:value="tool.fill" />
          </div>
          <div class="item" v-if="normalizedToolName !== 'Arrow' && normalizedToolName !== 'Text'">
            <span>Stroke</span>
            <n-color-picker v-model:value="tool.stroke" />
          </div>
        </div>

        <!-- Border -->
        <div class="items__body" v-if="normalizedToolName !== 'Text'">
          <div class="item__label item__label-border">
            <h3>Border</h3>
            <n-switch @update:value="changeBorderVisibility" :value="!!tool.strokeWidth" size="small" />
          </div>
          <div class="item">
            <span>Type</span>
            <n-select :value="toolBorderType" @update:value="changeToolBorder" :options="borderTypes"
              :disabled="!(!!tool.strokeWidth)" />
          </div>
          <div class="item">
            <span>Width</span>
            <n-input-number v-model:value="tool.strokeWidth" :validator="(x: number) => x > 0"
              :disabled="!(!!tool.strokeWidth)" size="medium" />
          </div>
        </div>
      </div>
      <h3 v-else class="tool-editor__label">Select a tool to customize</h3>
    </Transition>
  </aside>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.tool-editor {
  width: 400px;
  min-width: 250px;
  height: 100%;

  transition: all .3s ease-in-out;
  //overflow-y: scroll;
  background-color: #7F91A1;

  &__label {
    text-align: center;
    color: #fff;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    overflow: auto;
    height: calc(100% - 80px);

    padding: 0 15px;
    color: #fff;
  }
}

.items {
  &__divider {
    margin: 0;
  }

  &__label {
    @include flex-row;
    gap: 10px;

    span {
      height: 25px;
      font-size: 1.2rem;
    }

    i {
      color: #aff9c4;
      cursor: pointer;
    }
  }

  &__body {
    width: 100%;
  }

  .upload-btb {
    margin-top: 10px;
    border: 2px solid #fff;
  }
}

.item {
  width: 100%;
  margin-bottom: 10px;

  user-select: none;

  >span {
    font-size: 0.9rem
  }

  &-no-margin {
    margin: 0;
  }

  &__divider {
    margin: 10px 0;
  }

  &__label {
    margin: 10px 0 5px;

    &-border {
      @include flex-row;
      justify-content: space-between;

      height: 30px;
    }
  }

  &__font-style {
    display: flex;
    gap: 10px;

    cursor: pointer;

    span {
      color: #333639;
      line-height: 0.8rem;
    }
  }

  &__font-variant {
    height: 24px;
    width: 24px;

    text-align: center;
    line-height: 26px;

    border-radius: 5px;
    background: #fff;
    color: #333639;
  }

  .icon-active {
    background-color: #545557 !important;

    span,
    i {
      color: #fff !important;
    }
  }

  //&__font-style-active {
  //  background: #aff9c4;
  //}
}

.editor-enter-active,
.editor-leave-active {
  transition: all 0.25s ease-out;
}

.editor-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.editor-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
</style>
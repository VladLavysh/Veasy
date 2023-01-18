<script setup lang="ts">
import { reactive } from 'vue';
import { DocumentDownload, UserProfile } from '@vicons/carbon'
import { useMessage } from 'naive-ui'

// Props and Emits
const props = defineProps<{
  isOpen: Boolean,
  isSaving: Boolean
}>()
const emit = defineEmits<{
  (e: 'save', { }: { name: string, type: string, saveTo: string }): void
  (e: 'update:isSaving', isSaving: Boolean): void
}>()

// Variables
const message = useMessage()
const fileData = reactive<{ name: string, type: string, saveTo: string }>({
  name: 'canvas',
  type: '.pdf',
  saveTo: ''
})
const fileExtensions = [
  {
    label: '.pdf',
    value: 'pdf',
  },
  {
    label: '.png',
    value: 'png',
  },
  {
    label: '.jpeg',
    value: 'jpeg',
  },
  {
    label: '.svg',
    value: 'svg',
  }
]

// Methods
const selectSavePlace = ($event: MouseEvent) => {
  const target = $event.target as HTMLElement
  const targetBtn = target?.closest('.btn') as HTMLElement

  if (!targetBtn || fileData.saveTo === targetBtn.dataset.saveTo) return

  fileData.saveTo = targetBtn.dataset.saveTo || ''
}

const submitHandler = () => {
  if (!fileData.saveTo || !fileData.name) {
    // TODO: show error + validation
    message.info('Some fields are empty etc.')
    return
  }

  emit('update:isSaving', true)
  emit('save', { ...fileData })
}

const resetModalState = () => {
  fileData.saveTo = ''
  fileData.name = 'canvas'
  fileData.type = '.pdf'
}
</script>

<template>
  <n-modal ref="loadingBarTargetRef" v-model:show="props.isOpen" preset="card" :style="{ width: '400px' }" title="Save"
    size="huge" :segmented="{ content: 'soft', footer: 'soft' }" @after-leave="resetModalState"
    footer-style="text-align: center">

    <div class="save-modal">
      <h3 style="margin-top: 0">Save canvas to:</h3>
      <div class="save-modal__btns" @click="selectSavePlace">
        <div :class="[fileData.saveTo === 'account' ? 'btn-active' : '', 'btn']" data-save-to="account">
          <h2>Account</h2>
          <n-icon size="50" :component="UserProfile" />
        </div>
        <div :class="[fileData.saveTo === 'device' ? 'btn-active' : '', 'btn']" data-save-to="device">
          <h2>Device</h2>
          <n-icon size="50" :component="DocumentDownload" />
        </div>
      </div>
    </div>
    <n-divider />

    <div>
      <h3 style="margin-top: 0">File name and extention:</h3>
      <n-input-group>
        <n-input v-model:value="fileData.name" type="text" placeholder="File name" />
        <n-select v-model:value="fileData.type" :options="fileExtensions" style="width: 33%" />
      </n-input-group>
    </div>
    <template #footer>
      <n-button type="primary" size="medium" :disabled="isSaving" style="width: 90px"
        @click="submitHandler">Save</n-button>
    </template>
  </n-modal>
</template>

<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.save-modal {
  @include flex-column;
  gap: 20px;

  h3 {
    align-self: flex-start;
    margin: 0;
  }

  &__btns {
    @include flex-row;
    width: 100%;
    gap: 30px;

    .btn {
      min-width: 100px;
      flex: 1;
      text-align: center;

      border: 2px solid #6e6e6e;
      border-radius: 7px;

      cursor: pointer;
      transition: all .25s ease-in-out;

      &:hover {
        box-shadow: 0 0 5px 2px #989fa7;
        transform: scale(1.05);
      }

      >h2,
      i {
        margin: 10px 0;
      }
    }

    .btn-active {
      box-shadow: 0 0 5px 2px #18a058;
      border-color: #18a058 !important;
    }

    &:hover>.btn:not(:hover) {
      opacity: 0.5;
    }
  }
}
</style>

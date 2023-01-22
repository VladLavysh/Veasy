<script setup lang="ts">
import { ref } from 'vue';
import ToolsBar from '../components/tool/ToolsBar.vue';
import Canvas from '../components/canvas/Canvas.vue';
import ToolEditor from '../components/tool/ToolEditor.vue';
import Templates from '../components/templates/Templates.vue';

const activePanel = ref<string>('');

const selectTab = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (target.tagName !== 'BUTTON') return

  const targetValue = target.textContent?.toLowerCase() as string

  if (activePanel.value === targetValue) return

  activePanel.value = targetValue
}
</script>

<template>
  <div class="creator">
    <ToolsBar />

    <Canvas />

    <section class="editor-and-templates">
      <div class="bar-buttons" @click="selectTab">
        <button>Tool editor</button>
        <button>Templates</button>
      </div>
      <Transition>
        <ToolEditor v-if="activePanel === 'tool editor'" />
        <Templates v-else-if="activePanel === 'templates'" />
      </Transition>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '../utils/css/mixins.scss';

.creator {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100vh;

  @media screen and (max-width: 530px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  .editor-and-templates {
    width: 400px;
    height: 100vh;
    background-color: #7F91A1;
  }

  .bar-buttons {
    @include flex-row;
    gap: 2px;
    background-color: #fff;

    >button {
      width: 100%;
      height: 50px;

      background-color: #7F91A1;
      color: #fff;

      font-size: 1.2rem;
      font-weight: 500;

      border: none;
      outline: none;
      cursor: pointer;

      transition: all .25s ease-in-out;

      &:hover {
        background-color: #6d7e8d;
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
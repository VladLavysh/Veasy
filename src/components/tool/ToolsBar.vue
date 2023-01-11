<script setup lang="ts">
import { ref } from 'vue'

import { useToolsStore } from '../../store/tools'
import ToolsBarItems from './ToolsBarItems.vue'
import ToolsBarActive from './ToolsBarActive.vue'

const store = useToolsStore()

const toggleHandler = () => {
  store.changePanelStatus(!store.isPanelOpen)
}
</script>

<template>
  <aside :class="[store.isPanelOpen ? 'tools-bar-wide' : '', 'tools-bar']" ref="tools_bar">
    <div class="toggle-btn" @click="toggleHandler" />

    <ToolsBarItems />
    <ToolsBarActive />
  </aside>
</template>

<style scoped lang="scss">
.tools-bar {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 120px;
  min-width: 120px;

  transition: all .3s ease-in-out;
  //overflow-y: scroll;

  background-color: #7F91A1;

  @media screen and (max-width: 850px) {
    display: none;
  }
}

.tools-bar-wide {
  width: 500px;

  .toggle-btn {
    left: 105%;

    &::before {
      transform: translate(-60%, -200%) rotate(-40deg);
    }

    &::after {
      transform: translate(-60%, 120%) rotate(40deg);
    }
  }
}

// Toggle button styles
.toggle-btn {
  position: absolute;
  left: 110%;
  top: 15px;

  width: 20px;
  height: 20px;

  background-color: #ffffff;

  font-size: 1.2rem;
  color: #535353;
  padding: 5px;

  cursor: pointer;
  border-radius: 50%;
  transition: all .2s ease-in-out;

  z-index: 8;

  &::before,
  &::after {
    content: '';

    position: absolute;
    left: 50%;
    top: 50%;

    transition: all .2s ease-in-out;
    border-radius: 10px;

    width: 11px;
    height: 2px;

    background-color: #525252;

    z-index: 9;
  }

  &::before {
    transform: translate(-40%, -200%) rotate(40deg);
  }

  &::after {
    transform: translate(-40%, 100%) rotate(-40deg);
  }
}
</style>

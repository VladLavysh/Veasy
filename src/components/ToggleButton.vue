<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['open'])

const isToolsPanelOpen = ref(false)

const togglePanel = () => {
  isToolsPanelOpen.value = !isToolsPanelOpen.value
  emit('open')
}
</script>

<template>
  <div class="home__resizer">
    <div :class="[isToolsPanelOpen ? 'home__resizer-btn-rotated' : '', 'home__resizer-btn']" @click="togglePanel">
    </div>
  </div>
</template>

<style scoped lang="scss">
.home__resizer {
  width: 0;
  position: relative;
}

.home__resizer-btn {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-65%, -50%);


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

.home__resizer-btn-rotated {
  &::before {
    transform: translate(-60%, -200%) rotate(-40deg);
  }

  &::after {
    transform: translate(-60%, 120%) rotate(40deg);
  }
}
</style>
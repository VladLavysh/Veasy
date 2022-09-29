<script setup lang="ts">
import { setButtonPosition, toggleSection } from '../../utils/toggle'
</script>

<template>
  <div class="home__resizer" @mousemove="setButtonPosition($event, false)"
    @mouseleave="setButtonPosition($event, true)">
    <div class="home__resizer-btn" @click="toggleSection"></div>
  </div>
</template>

<style scoped lang="scss">
.home__resizer {
  width: 10px;
  position: relative;

  cursor: pointer;

  //background-color: white;
}

.home__resizer-btn {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 20px;
  height: 20px;

  background-color: #ffffff;

  font-size: 1.2rem;
  color: #535353;
  padding: 5px;

  border-radius: 50%;
  transition: all .2s ease-in-out;

  opacity: 0.5;
  z-index: 8;

  &::before,
  &::after {
    content: '';

    position: absolute;
    left: 50%;
    top: 50%;

    transition: all .2s ease-in-out;
    border-radius: 10px;

    width: 12px;
    height: 2px;

    background-color: #525252;

    z-index: 9;
  }

  &::before {
    transform: translate(-40%, -230%) rotate(40deg);
  }

  &::after {
    transform: translate(-40%, 160%) rotate(-40deg);
  }

  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.home__resizer-btn-rotated {
  &::before {
    transform: translate(-60%, -220%) rotate(-40deg);
  }

  &::after {
    transform: translate(-60%, 150%) rotate(40deg);
  }
}
</style>
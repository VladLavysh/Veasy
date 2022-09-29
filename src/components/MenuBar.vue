<script setup lang="ts">
</script>

<template>
  <aside>
    <h1>Menu Bar</h1>
  </aside>
</template>

<style scoped lang="scss">
aside {
  display: block;
  width: 55px;
  max-width: 120px;

  margin-left: 10px;
  background-color: bisque;

  transition: width .3s ease-in-out;

  @media screen and (max-width: 530px) {
    width: 100%;
  }

  &:hover {
    width: 120px;
  }
}
</style>

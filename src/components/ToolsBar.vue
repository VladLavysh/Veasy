<script setup lang="ts">
</script>

<template>
  <section>
    <h1>Tools Bar</h1>
  </section>
</template>

<style scoped lang="scss">
section {
  min-width: 200px;
  max-width: 500px;
  background-color: bisque;

  @media screen and (max-width: 850px) {
    display: none;
  }
}
</style>

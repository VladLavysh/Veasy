<script setup lang="ts">
</script>

<template>
  <section class="tools-bar">
    <h1>Tools Bar</h1>
  </section>
</template>

<style scoped lang="scss">
.tools-bar {
  width: 120px;
  min-width: 120px;

  transition: all .3s ease-in-out;

  background-color: #7F91A1;

  @media screen and (max-width: 850px) {
    display: none;
  }
}

.tools-bar-wide {
  width: 500px;
}
</style>

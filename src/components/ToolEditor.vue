<script setup lang="ts">
</script>

<template>
  <aside class="tool-editor">
    <h1 class="tool-editor__label">Tool Editor</h1>

    <div class="tool-editor__items"></div>
  </aside>
</template>

<style scoped lang="scss">
.tool-editor {
  width: 400px;

  transition: all .3s ease-in-out;
  //overflow-y: scroll;

  background-color: #7F91A1;

  &__label {
    width: 100%;
    text-align: center;
    color: #fff;
  }

  &__items {}
}
</style>
<script setup lang="ts">
const configKonva = {
  width: 800,
  height: 1120
}
</script>

<template>
  <section class="canvas-section">
    <h2>Canvas Name</h2>
    <div class="canvas">
      <v-stage :config="configKonva">

      </v-stage>
    </div>
  </section>
</template>

<style scoped lang="scss">
.canvas-section {
  width: 100%;
  padding: 0 20px 40px;

  overflow-y: scroll;
  background-color: #D3E1ED;
}

.canvas {
  width: 800px;
  height: 1120px;
  background-color: #fff;
  margin: auto;
  border: 2px solid #ccc;
}
</style>

<script lang="ts" setup>
import { Close } from '@vicons/carbon'
import { removeFromCanvas } from '../../utils/ts/canvas'
import { useCanvasStore } from '../../store/canvas'

const store = useCanvasStore()

const selectShape = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const shapeName = target.innerText

  //store.selectShape(shapeName)

}
</script>

<template>
  <div class='tools-bar__list'>
    <Transition name="list" mode="out-in">
      <ul v-if="store.getToolsName.length">
        <li v-for="(itemName, idx) in store.getToolsName" :key="idx" draggable="true" @click="selectShape">
          <span>{{ itemName }}</span>
          <n-icon size="20" :component="Close" @click.stop="removeFromCanvas(idx)" />
        </li>
      </ul>
      <h3 v-else>There are no tools here yet</h3>
    </Transition>
  </div>
</template>


<style scoped lang="scss">
@import '../../utils/css/mixins.scss';

.tools-bar__list {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 30%;

  background: #7f91a1;
  border-top: 1px solid #fff;

  transition: all .3s ease-in-out;

  overflow-y: scroll;

  h3 {
    width: 100%;
    text-align: center;
    color: #fff;
  }

  ul {
    padding: 0;
  }

  li {
    @include flex-row;
    justify-content: space-between;

    color: #e3e8ed;

    list-style-type: none;
    cursor: pointer;

    padding: 0 30px 0 40px;

    transition: 0.2s ease-in-out all;

    &:hover {
      background-color: #28bc99;
    }

    i {
      transition: 0.2s ease-in-out all;
      padding: 5px;

      &:hover {
        color: #ff3737;
      }
    }
  }
}

.tools-bar__label {
  position: sticky;
  top: 5px;

  width: 100%;
  height: 30px;

  text-align: center;
  align-self: flex-start;
  color: #fff;

  margin: 0;
  padding: 10px 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}
</style>

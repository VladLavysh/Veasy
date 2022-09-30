<script setup lang="ts">
import { ref } from 'vue';
import { UserProfile, Template, DataViewAlt, SettingsAdjust, Contrast } from '@vicons/carbon'

const menuIcons = [
  { name: 'Profile', component: UserProfile },
  { name: 'Templates', component: Template },
  { name: 'My CV', component: DataViewAlt },
  { name: 'Settings', component: SettingsAdjust },
  { name: 'Theme', component: Contrast }
]
</script>

<template>
  <aside class="menu-bar">
    <div class="menu-bar__icons">
      <div class="menu-icon" v-for="icon of menuIcons" :key="icon.name">
        <n-icon size="40">
          <component :is="icon.component" />
        </n-icon>
        <span>{{icon.name}}</span>
      </div>
    </div>
  </aside>
</template>

<!-- TODO: Flex mixins -->
<style scoped lang="scss">
.menu-bar {
  display: block;
  width: 100px;
  //max-width: 120px;

  margin-left: 8px;
  padding: 20px 5px;
  background-color: #7F91A1;

  transition: width .3s ease-in-out;

  @media screen and (max-width: 530px) {
    width: 100%;
  }

  //&:hover {
  //  width: 120px;

  //  .menu-icon>span {
  //    display: inline;
  //  }
  //}

  &__icons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
  }

  .menu-icon {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    color: #e3e8ed;
    cursor: pointer;

    span {
      font-size: 1rem;
      //display: none;
    }
  }
}
</style>

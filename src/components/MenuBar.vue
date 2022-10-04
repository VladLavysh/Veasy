<script setup lang="ts">
import { shallowRef } from 'vue';
import { UserProfile, Template, DataViewAlt, SettingsAdjust, Contrast } from '@vicons/carbon'

const menuIcons = shallowRef([
  { name: 'Profile', component: UserProfile, isActive: false },
  { name: 'Templates', component: Template, isActive: false },
  { name: 'My CV', component: DataViewAlt, isActive: true },
  { name: 'Settings', component: SettingsAdjust, isActive: false },
  { name: 'Theme', component: Contrast, isActive: false }
])
</script>

<template>
  <aside class="menu_bar">
    <div class="menu_bar__icons">
      <div v-for="icon of menuIcons" :key="icon.name" :class="[icon.isActive ? 'menu_icon-active' : '', 'menu_icon']">
        <n-icon size="35">
          <component :is="icon.component" />
        </n-icon>
        <span>{{icon.name}}</span>
      </div>
    </div>
  </aside>
</template>

<!-- TODO: Flex mixins -->
<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

.menu_bar {
  display: block;
  width: 90px;
  min-width: 75px;

  padding: 20px 5px;
  background-color: #7F91A1;

  transition: width .3s ease-in-out;

  @media screen and (max-width: 530px) {
    width: 100%;
  }

  &__icons {
    @include flex-column;

    justify-content: flex-start;
    gap: 25px;

    height: 100%;
  }

  .menu_icon {
    @include nav-and-tools-button(100%, pointer);

    span {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    &:last-child {
      margin-top: auto
    }

    &-active {
      color: #ffffff;
      background-color: #98acbf;
    }
  }
}
</style>

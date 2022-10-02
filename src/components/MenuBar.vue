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
@import '../../src/utils/css/mixins.scss';

.menu_bar {
  display: block;
  width: 100px;
  min-width: 85px;

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
    @include flex-column;

    justify-content: flex-start;
    gap: 5px;

    width: 100%;
    padding: 5px 0;

    border-radius: 7px;

    color: #e3e8ed;
    cursor: pointer;
    transition: all .2s ease-in-out;

    span {
      font-size: 1rem;
      line-height: 1.1;
    }

    &:last-child {
      margin-top: auto
    }

    &:hover {
      @include active-nav-button;
    }

    &-active {
      @include active-nav-button;
    }
  }
}
</style>

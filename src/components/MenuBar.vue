<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { useRoute } from 'vue-router'
import { UserProfile, Template, DataViewAlt, SettingsAdjust } from '@vicons/carbon'

const route = useRoute()

const menuIcons = ref([
  { name: 'Profile', component: markRaw(UserProfile), path: '/profile', isActive: false },
  { name: 'Templates', component: markRaw(Template), path: '/', isActive: false },
  { name: 'CV Creator', component: markRaw(DataViewAlt), path: '/creator', isActive: true },
  { name: 'Settings', component: markRaw(SettingsAdjust), path: '/settings', isActive: false },
])

const updateIcons = (path: String) => {
  if (path === route.path) return

  menuIcons.value.forEach(el => {
    el.isActive = el.path === path
  })
}
</script>

<template>
  <nav class="menu_bar">
    <div class="menu_bar__icons">
      <RouterLink v-for="icon of menuIcons" :key="icon.name"
        :class="[icon.isActive ? 'menu_icon-active' : '', 'menu_icon']" :to="icon.path" @click="updateIcons(icon.path)">
        <n-icon size="25">
          <component :is="icon.component" />
        </n-icon>
        <span>{{icon.name}}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import '../../src/utils/css/mixins.scss';

.menu_bar {
  width: 100%;
  height: 35px;

  border-bottom: 5px solid #fff;

  background-color: #7F91A1;
  transition: width .3s ease-in-out;

  //@media screen and (max-width: 530px) {
  //  width: 100%;
  //}

  &__icons {
    @include flex-row;
    justify-content: start;
    gap: 30px
  }

  .menu_icon {
    @include flex-row;
    @include nav-and-tools-button(auto, pointer, 15px, none);

    padding: 5px 20px;

    &-active {
      color: #ffffff;
      background-color: #98acbf;
    }
  }

  .menu_icon:last-child {
    margin-left: auto
  }
}
</style>

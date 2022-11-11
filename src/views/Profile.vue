<script setup lang="ts">
import ProfileSidebar from '../components/profile/ProfileSidebar.vue'
import ProfileContent from '../components/profile/ProfileContent.vue'
</script>

<template>
  <div class="profile">
    <ProfileSidebar />
    <ProfileContent />
  </div>
</template>

<style scoped lang="scss">
@import '../utils/css/mixins.scss';

.profile {
  @include flex-row;
  justify-content: space-between;
}
</style>

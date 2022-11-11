<script setup lang="ts">
import { useProfileStore } from '../../store/profile'

const store = useProfileStore()
</script>

<template>
    <section class="profile__content">
        <div v-if="store.isDataTab">
            USER DATA
        </div>
        <div v-else>
            CVs
        </div>
    </section>
</template>

<style lang="scss">
@import '../../utils/css/mixins.scss';

.profile__content {
    height: calc(100vh - 40px);
    width: calc(100% - 200px);
}
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useProfileStore } from '../../store/profile'
import { useLoginStore } from '../../store/login'
import { responseData } from '../../types'

const router = useRouter()
const store = useProfileStore()
const message = useMessage()

const logout = async () => {
  const { logOut } = useLoginStore()

  const response = await logOut()

  const responseData: responseData = response.data

  responseData.status
    ? message.success(responseData.output)
    : message.error(responseData.output)

  router.push({ path: '/login' })
}
</script>

<template>
  <aside class="profile__sidebar">
    <div class="profile__sidebar-user">
      <n-avatar :size="140" src="image_set.svg" />
      <span>Full name</span>
      <span>Email</span>
    </div>

    <div class="profile__sidebar-tabs">
      <div :class="['tab-button', store.isDataTab ? 'tab-button-active' : '']" @click="store.changeActiveTab(true)">
        My data
      </div>
      <div :class="['tab-button', !store.isDataTab ? 'tab-button-active' : '']" @click="store.changeActiveTab(false)">My
        CVs</div>
    </div>

    <n-button quaternary type="error" class="profile__sidebar-logout">
      <RouterLink to="/login" @click="logout">Log out</RouterLink>
    </n-button>
  </aside>
</template>

<style lang="scss">
@import '../../utils/css/mixins.scss';

.profile__sidebar {
  @include flex-column;
  justify-content: space-between;

  height: calc(100vh - 40px);
  width: 200px;

  background-color: #7F91A1;
  color: #fff;

  padding: 10px 5px;
  box-sizing: border-box;

  &-user {
    @include flex-column;
    justify-content: space-between;
    gap: 10px
  }

  &-tabs {
    @include flex-column;
    justify-content: space-between;
    gap: 10px;

    width: 100%;

    .tab-button {
      position: relative;
      width: 100%;
      height: 30px;

      text-align: center;
      line-height: 30px;

      color: #fff;
      background-color: #637c91;
      border-radius: 7px;

      cursor: pointer;

      transition: all .3s ease;

      &:hover {
        color: rgb(44, 44, 44);
        background-color: #fff;
      }
    }

    .tab-button-active {
      color: rgb(44, 44, 44);
      background-color: #fff;

      &::after {
        content: '';

        position: absolute;
        right: -5px;
        top: -5px;

        width: 0;
        height: 0;

        border-top: 20px solid transparent;
        border-right: 40px solid #fff;
        border-bottom: 20px solid transparent;
      }
    }
  }

  &-logout {
    color: #ffa9ad;

    &:hover {
      color: #ffa9ad !important;
    }
  }
}
</style>
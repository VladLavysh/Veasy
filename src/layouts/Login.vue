<script setup lang="ts">
import { reactive } from 'vue';
import { useLoginStore } from '../store/login'
import { loginUserData, registerUserData } from '../types/index'

const { logIn, createNewUser } = useLoginStore()

const registerData = reactive<registerUserData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loginData = reactive<loginUserData>({
  email: '',
  password: ''
})

const updateField = (value: string, key: keyof (registerUserData | loginUserData), isLogin: boolean) => {
  isLogin 
    ? loginData[key] = value
    : registerData[key] = value
}

const resetForm = () => {
  loginData.email = loginData.password = ''
  registerData.email = registerData.name = registerData.password = registerData.confirmPassword = ''
}
</script>

<template>
  <div class="login">
    <n-card class="login__card">
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
      <!-- Sign In -->
        <n-tab-pane name="signin" tab="Sign in">
          <n-form>
            <n-form-item-row label="Email">
              <n-input @update:value="updateField($event, 'email', true)" :value="loginData.email" />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input @update:value="updateField($event, 'password', true)" :value="loginData.password"       
                      type="password"
                      show-password-on="mousedown"
                      :maxlength="14" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong 
                    @click="logIn(loginData), resetForm()">
            Sign In
          </n-button>
        </n-tab-pane>

        <!-- Sign Up -->
        <n-tab-pane name="signup" tab="Sign up">
          <n-form>
            <n-form-item-row label="Username">
              <n-input @update:value="updateField($event, 'name', false)" :value="registerData.name" />
            </n-form-item-row>
            <n-form-item-row label="Email">
              <n-input @update:value="updateField($event, 'email', false)" :value="registerData.email" />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input @update:value="updateField($event, 'password', false)" :value="registerData.password"
                      type="password"
                      show-password-on="mousedown"
                      :maxlength="14" />
            </n-form-item-row>
            <n-form-item-row label="Reenter Password">
              <n-input @update:value="updateField($event, 'confirmPassword', false)" :value="registerData.confirmPassword"
                      type="password"
                      show-password-on="mousedown"
                      :maxlength="14"/>
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong 
                    @click="createNewUser(registerData), resetForm()">
            Sign Up
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  position: relative;

  background-color: #bfd0df;
  height: 100vh;

  &__card {
    position:absolute;
    top: 50%;
    left: 50%;

    width: 400px;

    transform: translate(-50%, -50%);
  }
}
</style>
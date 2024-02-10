<template>
  <v-container id="main-container" fluid class="d-flex align-center justify-center">
    <v-row class="justify-center">
      <v-col cols="12">
        <v-sheet id="main-sheet" class="mx-auto rounded py-8 px-8" elevation="3" max-width="456px">
          <v-row>
            <v-col cols="12" class="text-center">
              <div id="title" class="text-h4 font-weight-bold">
                <p>Welcome developer!</p>
              </div>
            </v-col>
            <v-col cols="12" class="text-center py-0">
              <div id="subtitle" class="text-h6 font-weight-regular">
                <p>Login</p>
              </div>
            </v-col>
          </v-row>

          <v-form @submit.prevent="onSubmit" :readonly="loadingStore.inProgress">
            <!-- INPUTS -->
            <v-row>
              <v-col cols="12" class="text-center py-0">
                <v-text-field label="Email" variant="underlined" v-model="loginData.email"></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  :type="'password'"
                  label="Password"
                  variant="underlined"
                  v-model="loginData.password"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- PROGRESS BARS AND ALERTS -->
            <v-row>
              <!-- PROGRESS BAR -->
              <Loading/>
              
              <!-- ALERTS -->
              <AuthAlerts/>
            </v-row>
              
            <!-- BUTTONS -->
            <v-row>
              <v-col cols="12">
                <v-btn variant="outlined" type="submit" block>
                  <p>LOGIN</p>
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center pt-1">
                <p class="text-caption">
                  <RouterLink :to="'/register'" @click="authAlertsStore.cleanMessagesArrays">
                    Don't you have an account?
                  </RouterLink>
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AuthAlerts from './../components/AuthAlerts.vue'
import Loading from './../components/Loading.vue'

import { useAuthAlertsStore } from '@/stores/AuthAlertsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '@/stores/LoadingStore';
import { reactive } from 'vue';

const authAlertsStore = useAuthAlertsStore()
const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const router = useRouter()

const loginData = reactive({
  email: null,
  password: null
})

document.title = 'Login'

async function onSubmit() {
  try {
    loadingStore.startLoading();
    authAlertsStore.cleanMessagesArrays()
    if (!loginData.email || !loginData.password) {
      authAlertsStore.addErrorMessage('Both fields must be filled')
      return;
    }
    const succeeded = await authStore.loginUser(loginData);
    if (succeeded) {
      router.push('/')
    }
  }
  finally {
    loadingStore.stopLoading();
  }
}

</script>

<style scoped>
@import '../assets/variables.css';

#main-container {
  height: 100vh;
}

#main-sheet {
  background-color: var(--secondary-dark);
}

#title p {
  color: var(--primary-orange);
}

#subtitle p {
  color: var(--primary-grey);
}

* {
  color: var(--primary-grey);
}

</style>
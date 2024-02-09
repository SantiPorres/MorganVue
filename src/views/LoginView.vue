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

          <v-form @submit.prevent="onSubmit" :readonly="inProgress">
            <!-- INPUTS -->
            <v-row>
              <v-col cols="12" class="text-center py-0">
                <v-text-field label="Email" variant="underlined" v-model="email"></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  :type="'password'"
                  label="Password"
                  variant="underlined"
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- PROGRESS BARS AND ALERTS -->
            <v-row>
              <!-- PROGRESS BAR -->
              <v-col cols="12" v-show="inProgress">
                <v-progress-linear indeterminate color="#EA9215"></v-progress-linear>
              </v-col>
              
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
import { ref } from 'vue'

import AuthAlerts from './../components/AuthAlerts.vue'

import { useAuthAlertsStore } from '@/stores/AuthAlertsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const authAlertsStore = useAuthAlertsStore()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('');
const password = ref('');
let inProgress = ref(false)

document.title = 'Login'

async function onSubmit() {
  inProgress.value = true
  authAlertsStore.cleanMessagesArrays()
  if (!email.value || !password.value) {
    authAlertsStore.addErrorMessage('Both fields must be filled')
    inProgress.value = false;
    return;
  }
  const loginData = {
      'email': email.value,
      'password': password.value
  };

  ;
  const succeeded = await authStore.loginUser(loginData);
  if (succeeded) {
    router.push('/')
  }
  inProgress.value = false
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
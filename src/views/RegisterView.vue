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
                <p>Register</p>
              </div>
            </v-col>
          </v-row>

          <v-form @submit.prevent="onSubmit" :readonly="loadingStore.inProgress">
            <v-row>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  v-model="registerData.username"
                  label="Username"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field v-model="registerData.email" label="Email" variant="underlined"></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  v-model="registerData.password"
                  label="Password"
                  variant="underlined"
                  hint="At least 8 characters"
                  :type="'password'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  variant="underlined"
                  :type="'password'"
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
                <v-btn variant="outlined" type="submit" block> REGISTER </v-btn>
              </v-col>
              <v-col cols="12" class="text-center pt-1">
                <p class="text-caption" id="link">
                  <RouterLink :to="'/login'" @click="authAlertsStore.cleanMessagesArrays()"> Do you already have an account? </RouterLink>
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
import { RouterLink, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

import AuthAlerts from '@/components/AuthAlerts.vue'
import Loading from '@/components/Loading.vue'

import { useAuthAlertsStore } from '@/stores/AuthAlertsStore'; 
import { useAuthStore } from '@/stores/AuthStore';
import { useLoadingStore } from '@/stores/LoadingStore';

const authAlertsStore = useAuthAlertsStore()
const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const router = useRouter()

const registerData = reactive({
  username: null,
  email: null,
  password: null
})
const confirmPassword = ref('')

document.title = 'Register'

async function onSubmit() {
  try {
    loadingStore.startLoading()
    authAlertsStore.cleanMessagesArrays()
    if (
      !registerData.username 
      || !registerData.email
      || !registerData.password 
      || !confirmPassword.value
    ) {
      authAlertsStore.addErrorMessage('All fields must be filled')
      return
    }
    if (registerData.password.length < 8) {
      authAlertsStore.addErrorMessage('Password must have at least 8 characters')
      return
    }
    if (registerData.password !== confirmPassword.value) {
      authAlertsStore.addErrorMessage('Passwords do not match')
      return
    }  
    const succeeded = await authStore.registerUser(registerData)
    if (succeeded) {
      router.push('/login')
    }
  }
  finally {
    loadingStore.stopLoading()
  }
}

</script>

<style scoped>
@import '../assets/variables.css';

#main-container {
  height: 100vh;
  background-color: var(--primary-dark);
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
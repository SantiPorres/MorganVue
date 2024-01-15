<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
</script>

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

          <v-form @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  v-model="username"
                  label="Username"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field v-model="email" label="Email" variant="underlined"></v-text-field>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <v-text-field
                  v-model="password"
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
              <v-col cols="12" v-if="inProgress">
                <v-progress-linear indeterminate color="#EA9215"></v-progress-linear>
              </v-col>
              
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
                  <RouterLink :to="'/login'" @click=""> Do you already have an account? </RouterLink>
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import AuthAlerts from '@/components/AuthAlerts.vue'

// import { useAuthAlertsStore } from '@/stores/AuthAlertsStore'; 

// const authAlertsStore = useAuthAlertsStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

let successMessages = ref([])
let errorMessages = ref([])
let inProgress = false

document.title = 'Register'

async function onSubmit() {
  inProgress = true
  //authAlertsStore.cleanMessagesArrays()
  errorMessages.value.length = 0
  successMessages.value.length = 0
  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessages.value.push('All fields must be filled')
    inProgress = false
    return
  }
  if (password.value.length < 8) {
    errorMessages.value.push('Password must have at least 8 characters')
    inProgress = false
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessages.value.push('Passwords do not match')
    inProgress = false
    return
  }
  const registerData = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  await axios
    .post('https://localhost:44302/api/v1/Account/register', registerData)
    .then((response) => {
      if (response.data.succeeded) {
        console.log(response)
        const registeredEmail = response.data.data.email
        username.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        inProgress = false
        successMessages.value.push(`${registeredEmail} successfully registered!`)
        successMessages.value.push('Now you can Login')
        return
      } else if (!response.data.succeeded) {
        handleBadRequestError(response)
        inProgress = false
        return
      }
    })
    .catch((error) => {
      handleBadRequestError(error.response)
      inProgress = false
      return
    })
  inProgress = false
}

function removeError(errorIndex) {
  errorMessages.value.splice(errorIndex, 1)
}

function removeMessage(messageIndex) {
  successMessages.value.splice(messageIndex, 1)
}

function handleBadRequestError(response) {
  const errorsArray = response.data.Errors
  if (errorsArray.length > 0) {
    errorsArray.forEach((element) => {
      errorMessages.value.push(element)
    })
  } else {
    errorMessages.value.push(response.data.Message)
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

#error-alert {
  align-items: center;
  background-color: rgba(255, 34, 34, 0.822);
  padding: 6px;
  margin: 2px;
}

#success-alert {
  align-items: center;
  background-color: rgba(72, 212, 30, 0.822);
  padding: 6px;
  margin: 2px;
}
</style>

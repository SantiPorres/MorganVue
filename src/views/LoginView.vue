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

          <v-form @submit.prevent="onSubmit">
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
              <v-col cols="12" v-if="inProgress">
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
import axios from 'axios'

import AuthAlerts from './../components/AuthAlerts.vue'

import { useAuthAlertsStore } from '@/stores/AuthAlertsStore'; 

const authAlertsStore = useAuthAlertsStore()

const email = ref('');
const password = ref('');
let successMessages = ref([]);
let errorMessages = ref([]);
// let showPassword = ref(false);
let inProgress = false

document.title = 'Login'

async function onSubmit() {
  inProgress = true;
  authAlertsStore.cleanMessagesArrays()
  if (!email.value || !password.value) {
    authAlertsStore.addErrorMessage('Both fields must be filled')
    inProgress = false;
    return;
  }
  const loginData = {
      'email': email.value,
      'password': password.value
  };

  await axios
    .post('https://localhost:44302/api/v1/Account/login', loginData)
    .then((response) => {
      if (response.data.succeeded) {
        console.log(response)
        inProgress = false
        email.value = ''
        password.value = ''
        authAlertsStore.addSuccessMessage('Logged')
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

function handleBadRequestError(response) {
  const errorsArray = response.data.Errors
  if (errorsArray.length > 0) {
    errorsArray.forEach((element) => {
      errorMessages.value.push(element)
    })
  } else if (response.data.Message !== null) {
    errorMessages.value.push(response.data.Message)
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

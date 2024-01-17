<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="1024">
      <template v-slot:activator="{ props }">
        <v-btn id="create-btn" variant="tonal" block v-bind="props">
          <span class="material-symbols-outlined"> construction </span>
          CREATE A NEW PROJECT
        </v-btn>
      </template>
      <v-card id="dialog-card">
        <v-container>
          <v-card-title class="d-flex justify-center">
            <div id="title" class="text-h4 font-weight-bold">
              <p>Create a new project</p>
            </div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" class="py-2">
                <small>*indicates required field</small>
                <v-text-field
                  v-model="name"
                  label="Name*"
                  hint="How will you name this project?"
                  required
                  :readonly="loadingStore.inProgress"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="">
                <v-textarea
                  v-model="description"
                  label="Description"
                  hint="How would you describe this project?"
                  :readonly="loadingStore.inProgress"
                ></v-textarea>
              </v-col>
            </v-row>
            <Loading />
            <v-row>
              <v-col cols="12" class="py-1">
                <v-btn block variant="tonal" @click="createProject"> CREATE </v-btn>
              </v-col>
              <v-col cols="12" class="py-1">
                <v-btn block variant="outlined" @click="discardData"> DISCARD </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue'

import Loading from './Loading.vue'

import { useAuthStore } from '@/stores/Auth'
import { useLoadingStore } from '@/stores/Loading'

const authStore = useAuthStore()
const loadingStore = useLoadingStore()

const dialog = ref(false)
const name = ref('')
const description = ref('')

const requestHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authStore.token}`
}

function discardData() {
  name.value = ''
  description.value = ''
  dialog.value = false
}

async function createProject() {
  loadingStore.startLoading()
  const projectData = {
    name: name.value,
    description: description.value
  }

  await axios
    .post('https://localhost:44302/api/v1/Project/add', projectData, {
      headers: requestHeaders
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      loadingStore.stopLoading()
    })
  loadingStore.stopLoading()
  dialog.value = false
}
</script>

<style scoped>
@import url('./../assets/variables.css');

#create-btn {
  background-color: var(--primary-orange);
  color: var(--primary-dark);
  font-weight: bold;
}

#dialog-card {
  background-color: var(--secondary-dark);
  color: var(--primary-grey);
}

#dialog-card .v-card-title {
  color: var(--primary-orange);
}
</style>

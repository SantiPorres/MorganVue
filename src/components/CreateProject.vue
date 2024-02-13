<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="550px" @click:outside="discardData">
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
                <small>* indicates required field</small>
                <v-text-field
                  v-model="newProjectData.name"
                  label="Name *"
                  hint="How will you name this project?"
                  required
                  :readonly="loadingStore.inProgress"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="">
                <v-textarea
                  v-model="newProjectData.description"
                  label="Description"
                  hint="How would you describe this project?"
                  :readonly="loadingStore.inProgress"
                ></v-textarea>
              </v-col>
            </v-row>
            <Loading />
            <v-row>
              <v-col cols="12" class="py-1">
                <v-btn id="create-btn" block variant="tonal" @click="onSubmit"> CREATE </v-btn>
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
import { reactive, ref } from 'vue'

import Loading from './Loading.vue'

import { useLoadingStore } from '@/stores/LoadingStore'
import { useProjectsStore } from '@/stores/ProjectsStore'

const loadingStore = useLoadingStore()
const projectsStore = useProjectsStore()

const dialog = ref(false)
const newProjectData = reactive({
  name: null,
  description: null
})

function discardData() {
  newProjectData.name = null;
  newProjectData.description = null;
  dialog.value = false
}

async function onSubmit() {
  if (newProjectData.description?.trim().length === 0) {
    newProjectData.description = null
  } 
  await projectsStore.createProject(newProjectData)
  discardData()
}
</script>

<style scoped>
@import url('./../assets/variables.css');

#create-btn {
  background-color: var(--primary-orange);
  color: var(--primary-dark);
  font-weight: bold;
}

#create-btn:hover {
  box-shadow: 0px 0px 15px 0px rgba(46,46,46,1);
}

#dialog-card {
  background-color: var(--secondary-dark);
  color: var(--primary-grey);
}

#dialog-card .v-card-title {
  color: var(--primary-orange);
}
</style>
<template>
    <v-card @click="projectClicked" >
      <v-container>
        <v-row class="">
          <v-col cols="8" class="py-0 px-0">
            <v-card-title>{{ name }}</v-card-title>
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-end">
            <v-chip v-if="isOwner">
              Owner
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="px-0 py-0">
            <v-card-text class="pt-1">
              <p v-if="description" id="description">
                {{ description }}
              </p>
              <p v-else id="no-description">No description</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted } from 'vue'
import { PROJECT_OWNER } from '../constants/userProjectRoles'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const user = JSON.parse(authStore.user)
const isOwner = ref(false)
const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  projectUsers: {
    type: Array,
    required: true
  }
})

function verifyOwnership() {
  props.projectUsers.map(relation => {
    if (user.id === relation.userId && relation.role === PROJECT_OWNER) {
      isOwner.value = true
    }
  })
}

onMounted(() => {
  verifyOwnership()
})

function projectClicked() {
  router.push({
    name: 'projectDetails',
    params: {
      projectId: props.id
    }
  })
}
</script>

<style scoped>
@import '../assets/variables.css';

#description {
  opacity: 0.7;
}

#no-description {
  opacity: 0.3;
}

.v-card {
  background-color: var(--secondary-dark);
  color: white;
  text-align: left;
  overflow: hidden;
}

.v-card:hover {
  background-color: var(--secondary-grey);
  color: var(--primary-grey);
}
</style>
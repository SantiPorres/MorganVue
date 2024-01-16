<template>
    <header>
        <Navbar
            :username="user.username"
        />
    </header>

    <v-container>
        <ProjectPreview
            v-for="project in userProjects"
            :name="project.name"
            :description="project.description"
            :projectUsers="project.projectUsers"
            class="my-4"
        />
    </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from '@/components/Navbar.vue';
import ProjectPreview from '@/components/ProjectPreview.vue';
import axios from 'axios';

import { useAuthStore } from '@/stores/Auth';

const authStore = useAuthStore()
authStore.$reset()
let userProjects = ref([])
const user = JSON.parse(authStore.user)


const requestHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.token}`
}

async function getUserProjects() {
    await axios.get("https://localhost:44302/api/v1/Project/userProjects", {
        headers: requestHeaders
    })
    .then((response) => {
        userProjects.value = response.data.data
    })
    .catch(error => console.log(error))
}

onMounted(() => {
    getUserProjects()
})
</script>

<style scoped>

.v-container {
    text-align: -webkit-center;
}

</style>
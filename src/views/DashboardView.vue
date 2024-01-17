<template>
    <header>
        <Navbar
            :username="user.username"
        />
    </header>

    
    <v-container class="">
        <Loading/>
        <v-container id="cards-container" class="py-0 px-0">
            <ProjectPreview
                v-for="project in userProjects"
                :name="project.name"
                :description="project.description"
                :projectUsers="project.projectUsers"
                class="my-4"
            />
            <v-container v-show="!loadingStore.inProgress">
                <CreateProject/>
            </v-container>
        </v-container>
    </v-container>

    <footer>
        <v-container>
            
        </v-container>
    </footer>

</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from '@/components/Navbar.vue';
import ProjectPreview from '@/components/ProjectPreview.vue';
import CreateProject from '@/components/CreateProject.vue';
import Loading from '@/components/Loading.vue';

import axios from 'axios';

import { useAuthStore } from '@/stores/Auth';
import { useLoadingStore } from '@/stores/Loading'

const authStore = useAuthStore()
authStore.$reset()

const loadingStore = useLoadingStore()

let userProjects = ref([])
const user = JSON.parse(authStore.user)


const requestHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.token}`
}

async function getUserProjects() {
    loadingStore.startLoading()
    await axios.get("https://localhost:44302/api/v1/Project/userProjects", {
        headers: requestHeaders
    })
    .then((response) => {
        userProjects.value = response.data.data
    })
    .catch(error => {
        console.log(error)
        loadingStore.stopLoading()
    })
    loadingStore.stopLoading()
}

onMounted(() => {
    getUserProjects()
})
</script>

<style scoped>

.v-container {
    text-align: -webkit-center;
}

#cards-container {
    max-width: 760px;
}

</style>
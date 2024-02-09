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
                v-for="project in projectsStore.userProjects"
                :key="project.id"
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
import { onBeforeMount, onMounted } from 'vue'

import Navbar from '@/components/Navbar.vue';
import ProjectPreview from '@/components/ProjectPreview.vue';
import CreateProject from '@/components/CreateProject.vue';
import Loading from '@/components/Loading.vue';

import { useAuthStore } from '@/stores/AuthStore';
import { useLoadingStore } from '@/stores/LoadingStore'
import { useProjectsStore } from '@/stores/ProjectsStore';

const authStore = useAuthStore()
authStore.$reset()

const loadingStore = useLoadingStore()
const projectsStore = useProjectsStore()

const user = JSON.parse(authStore.user)

onBeforeMount(async () => {
    //await projectsStore.getUserProjects()
})

onMounted(async () => {
    await projectsStore.getUserProjects()
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
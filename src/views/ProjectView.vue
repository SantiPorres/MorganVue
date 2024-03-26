<template>
    <header>
        <Navbar
            :username="user.username"
        />
    </header>

    <v-container class="">
        <Loading/>
        <v-row class=" my-2">
            <!-- Project data -->
            <v-col cols="9" sm="10" class="" id="project-data">
                <h1>{{ project?.name }}</h1>
                <p>{{ project?.description }}</p>
                <v-divider vertical></v-divider>
            </v-col>

            <!-- Project actions -->
            <v-col cols="3" sm="2" class="flex-wrap" id="project-actions">
                <v-btn icon="mdi-account-group" variant="tonal"></v-btn>
                <v-btn icon="mdi-cog" variant="tonal"></v-btn>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row class="my-2" id="drag-zone">

            <v-col cols="10" md="4" class="my-3 px-1">
                <v-card>
                    <h3>To Do</h3>
                    <draggable 
                        v-model="tasks"
                        item-key="index"
                    >
                        <template #item="{element}">
                            <div>{{ element }}</div>
                        </template>
                    </draggable>
                </v-card>
            </v-col>

            <v-col cols="10" md="4" class=" my-3 px-1">
                <v-card>
                    <h3>In Proccess</h3>
                    <draggable 
                        v-model="tasks"
                        item-key="index"
                    >
                        <template #item="{element}">
                            <div>{{ element }}</div>
                        </template>
                    </draggable>
                </v-card>
            </v-col>

            <v-col cols="10" md="4" class="my-3 px-1">
                <v-card>
                    <h3>Done</h3>
                    <draggable 
                        v-model="tasks"
                        item-key="index"
                    >
                        <template #item="{element}">
                            <div>{{ element }}</div>
                        </template>
                    </draggable>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script setup>

// Libs
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';

// Components
import Navbar from '@/components/Navbar.vue';
import Loading from '@/components/Loading.vue';

// Stores
import { useAuthStore } from '@/stores/AuthStore';
import { useProjectStore } from '@/stores/ProjectStore';

const authStore = useAuthStore()
const projectStore = useProjectStore()
const route = useRoute()

const user = JSON.parse(authStore.user)
const { project } = storeToRefs(projectStore)

const tasks = ref(['apple', 'strawberry']);

onMounted(async () => {
    await projectStore.getProjectById(route.params.projectId);
    document.title = `${project.value.name} ~ Project`;
})

</script>

<style scoped>

#project-data {
    display: grid;
}

#project-actions {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 5px;
}

#drag-zone {
    display: flex;
    justify-content: space-evenly;
}

</style>
<template>
    <v-card @click="onProjectClick" :max-width="760">
        <v-card-title>{{ name }}</v-card-title>
        <!-- <v-card-subtitle
            v-for="user in projectUsers"
        >{{ user.id }}</v-card-subtitle> -->
        <v-card-text>
            <p v-if="description">
                {{ description }}
            </p>
            <p v-else id="no-description">
                No description
            </p>
        </v-card-text>
    </v-card>
</template>

<script setup>

const props = defineProps({
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

console.log('project preview')

function onProjectClick() {
    console.log("hello world onn project click")
}

</script>

<style scoped>
@import '../assets/variables.css';

#no-description {
    opacity: 0.3;
}

.v-card {
    background-color: var(--secondary-dark);
    color: white;
    text-align: left;
}

.v-card:hover {
    background-color: var(--secondary-grey);
    color: var(--primary-grey);
}

</style>
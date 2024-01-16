<template>
    <v-app-bar :elevation="3" color="#3A4750" >
        <v-row id="navbar-row">
            <v-col cols="8" sm="9" md="10" id="back">
                <div id="title" class="text-h4 font-weight-bold">
                    <p>{{username}} projects</p>
                </div>
            </v-col>
            <v-col cols="4" sm="3" md="2" id="icons-column">
                <v-img
                    :width="50"
                    :aspect-ratio="1"
                    cover
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                ></v-img>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script setup>

const props = defineProps({
    username: {
        type: String,
        required: true
    }
})

</script>

<style scoped>
@import './../assets/variables.css';

#title {
    color: var(--primary-orange);
}

#navbar-row {
    margin: 0 64px 0 64px;
}

#icons-column {
    display: grid;
    justify-content: end;
}

@media (max-width: 960px) {
    #navbar-row {
        margin: 0 32px 0 32px;
    }
}

@media (max-width: 600px) {
    #navbar-row {
        margin: 0 16px 0 16px;
    }
}

</style>
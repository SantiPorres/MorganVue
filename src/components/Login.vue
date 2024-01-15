<template>
<v-row>
    <v-col cols="12" class=" text-center">
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
    <v-row>
        <v-col cols="12" class="text-center py-0">
        <v-text-field
            label="Email"
            variant="underlined"
            v-model="email"
            ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-center py-0">
        <v-text-field
            label="Password"
            variant="underlined"
            v-model="password"
            ></v-text-field>
        </v-col>
    </v-row>
    
    <v-row>
        <v-col cols="12">
        <v-btn variant="outlined" type="submit" block>
            <p>LOGIN</p>
        </v-btn>
        </v-col>
        <v-col cols="12" class="text-center pt-1">
        <p class="text-caption">
            <a @click="notRegistered">Don't you have an account?</a>
        </p>
        </v-col>
    </v-row>
    </v-form>


</template>

<script setup>

import { ref } from 'vue';

const email = ref('');
const password = ref('');

const emit = defineEmits(['userLogging', 'notRegistered']);

const onSubmit = () => {
    if (!email.value || !password.value) {
        console.log('Both fields must be filled')
    }
    const loginData = {
        'email': email.value,
        'password': password.value
    }
    emit('userLogging', loginData);

    email.value = '';
    password.value = '';
}

const notRegistered = () => {
    emit('notRegistered');
}

</script>
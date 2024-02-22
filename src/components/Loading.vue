<template>
    <v-container v-show="loadingStore.inProgress">
        <v-progress-linear indeterminate color="#EA9215"></v-progress-linear>
    </v-container>
</template>

<script setup>

import { useLoadingStore } from '@/stores/LoadingStore';
const loadingStore = useLoadingStore()

</script>
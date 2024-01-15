<template>
  <!-- ALERTS -->
  <v-col cols="12" v-if="errorMessages.length > 0 || successMessages.length > 0">
    <!-- ERROR ALERT -->
    <v-alert id="error-alert" v-for="(error, index) in errorMessages" :key="index">
      <v-row class="">
        <v-col cols="2" class="d-flex align-center justify-center pr-0">
          <v-chip @click="authAlertsStore.deleteErrorMessage(index)" density="compact">x</v-chip>
        </v-col>
        <v-col cols="10" class="pl-0">
          {{ error }}
        </v-col>
      </v-row>
    </v-alert>
    <!-- SUCCESS ALERT -->
    <v-alert id="success-alert" v-for="(message, index) in successMessages" :key="index">
      <v-row>
        <v-col cols="2" class="d-flex align-center justify-center pr-0">
          <v-chip @click="authAlertsStore.deleteSuccessMessage(index)" density="compact">x</v-chip>
        </v-col>
        <v-col cols="10" class="pl-0">
          {{ message }}
        </v-col>
      </v-row>
    </v-alert>
  </v-col>
</template>

<script setup>
import { useAuthAlertsStore } from '@/stores/AuthAlertsStore';
import { storeToRefs } from 'pinia';

const authAlertsStore = useAuthAlertsStore()
const { errorMessages, successMessages } = storeToRefs(authAlertsStore)

</script>


<style>
#error-alert {
  align-items: center;
  background-color: rgba(255, 34, 34, 0.822);
  padding: 6px;
  margin: 2px;
  color: white;
}

#success-alert {
  align-items: center;
  background-color: rgba(72, 212, 30, 0.822);
  padding: 6px;
  margin: 2px;
  color: white;
}
</style>
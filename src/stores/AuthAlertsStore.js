import { defineStore } from 'pinia'

export const useAuthAlertsStore = defineStore('authAlertsStore', {
  state: () => ({
    errorMessages: [],
    successMessages: []
  }),
  actions: {
    addErrorMessage(message) {
        this.errorMessages.push(message)
    },
    addSuccessMessage(message) {
        this.successMessages.push(message)
    },
    deleteErrorMessage(index) {
        this.errorMessages.splice(index, 1)
    },
    deleteSuccessMessage(index) {
        this.successMessages.splice(index, 1)
    },
    cleanMessagesArrays() {
        this.successMessages = []
        this.errorMessages = []
    }
  }
})

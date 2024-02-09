import { defineStore } from "pinia";

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        inProgress: false
    }),
    actions: {
        startLoading() {
            this.inProgress = true
        },
        stopLoading() {
            this.inProgress = false
        }
    }
})
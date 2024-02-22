import axios from "axios";
import { ADD_PROJECT_URL, BASE_URL, GET_USER_PROJECTS_URL } from "@/constants/apiPaths";
import { useAuthStore } from "./AuthStore";
import { defineStore } from "pinia";
import { useLoadingStore } from "./LoadingStore";

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        userProjects: []
    }),
    actions: {
        async getUserProjects() {
            try {
                const loadingStore = useLoadingStore();
                loadingStore.startLoading();

                const authStore = useAuthStore();
                const response = await axios.get(BASE_URL + GET_USER_PROJECTS_URL, {
                    headers: authStore.baseRequestHeaders
                })
                if (response.data.succeeded) {
                    this.userProjects = response.data.data
                } else {
                    console.log(response)
                }
            }
            catch(error) {
                console.log(error);
            }
            finally {
                const loadingStore = useLoadingStore();
                loadingStore.stopLoading();
            }
        },
        async createProject(newProjectData) {
            try {
                const loadingStore = useLoadingStore()
                loadingStore.startLoading()

                const authStore = useAuthStore();
                const response = await axios
                    .post(BASE_URL + ADD_PROJECT_URL, newProjectData, {
                        headers: authStore.baseRequestHeaders
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                if(response.data.succeeded) {
                    this.getUserProjects()
                }
            }
            catch(error) {
                console.log(error)
            }
            finally {
                const loadingStore = useLoadingStore()
                loadingStore.stopLoading();
            }
        }
    }
})
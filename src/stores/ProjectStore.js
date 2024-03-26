import axios from "axios";
import { ADD_PROJECT_URL, BASE_URL, GET_USER_PROJECTS_URL, GET_PROJECT_BY_ID } from "@/constants/apiPaths";
import { useAuthStore } from "./AuthStore";
import { defineStore } from "pinia";
import { useLoadingStore } from "./LoadingStore";

export const useProjectStore = defineStore('project', {
    state: () => ({
        userProjects: [],
        project: null
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
        },
        async getProjectById(projectId) {
            try {
                const loadingStore = useLoadingStore()
                loadingStore.startLoading()

                const authStore = useAuthStore();
                const response = await axios
                    .get(BASE_URL + GET_PROJECT_BY_ID(projectId), {
                        headers: authStore.baseRequestHeaders
                    })

                this.project = response.data.data;
            }
            catch(error) {
                console.log(error);
            }
            finally {
                const loadingStore = useLoadingStore()
                loadingStore.stopLoading();
            }
        }
    }
})
import axios from "axios";
import { defineStore } from "pinia";
import { useAuthAlertsStore } from "./AuthAlertsStore";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: localStorage.getItem("user") || null
    }),
    actions: {
        async loginUser(loginData) {
            try {
                const response = await axios.post("https://localhost:44302/api/v1/Account/login", loginData)
                if (response.data.succeeded) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    // this.token = response.data.token
                    // this.user = response.data.user
                    return true;
                } else {
                    this.handleErrors(response.data)
                }
            } catch (error) {
                this.handleErrors(error.response.data)
            }
        },
        async registerUser(registerData) {
            const authAlertsStore = useAuthAlertsStore()
            try {
                const response = await axios.post("https://localhost:44302/api/v1/Account/register", registerData)
                if (response.data.succeeded) {
                    const registeredEmail = response.data.data.email
                    authAlertsStore.addSuccessMessage(`${registeredEmail} successfully registered!`)
                    authAlertsStore.addSuccessMessage('Now you can login!')
                    return true;
                } else {
                    this.handleErrors(response.data)
                }
            }
            catch(error) {
                this.handleErrors(error.response.data)
            }
        },
        handleErrors(data) {
            const authAlertsStore = useAuthAlertsStore()
            const errorsArray = data.Errors
            if (errorsArray.length > 0) {
                errorsArray.forEach((element) => {
                authAlertsStore.addErrorMessage(element)
                })
            } else if (data.Message !== null) {
                authAlertsStore.addErrorMessage(data.Message)
            }
        }
    }
})
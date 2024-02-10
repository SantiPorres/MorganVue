import axios from "axios";
import { defineStore } from "pinia";
import { useAuthAlertsStore } from "./AuthAlertsStore";
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL, BASE_URL } from "@/api_paths";
import { 
    HEADERS_CONTENT_TYPE_VALUE,
    HEADERS_AUTHORIZATION_VALUE
} from "@/constants";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: sessionStorage.getItem("token") || null,
        user: sessionStorage.getItem("user") || null,
        baseRequestHeaders : {
            'content-type': HEADERS_CONTENT_TYPE_VALUE,
            'authorization': HEADERS_AUTHORIZATION_VALUE(sessionStorage.getItem("token"))
        }
    }),
    actions: {
        async loginUser(loginData) {
            try {
                const response = await axios.post(BASE_URL + AUTH_LOGIN_URL, loginData)
                if (response.data.succeeded) {
                    sessionStorage.setItem("token", response.data.token)
                    sessionStorage.setItem("user", JSON.stringify(response.data.user))
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
                const response = await axios.post(BASE_URL +  AUTH_REGISTER_URL, registerData)
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
    },
    getters: {
        isLoggedIn() {
            if (this.token && this.user) {
                return true;
            }
            return false;
        }
    }
})
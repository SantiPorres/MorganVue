import axios from "axios";
import { defineStore } from "pinia";
import { useAuthAlertsStore } from "./AuthAlertsStore";
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL, BASE_URL } from "@/constants/apiPaths";
import { 
    HEADERS_CONTENT_TYPE_VALUE,
    HEADERS_AUTHORIZATION_VALUE
} from "@/constants/request";
import {
    INTERNAL_SERVER_ERROR_MESSAGE, 
    SUCCESSFULLY_REGISTERED_EMAIL, 
    SUCCESSFULLY_REGISTERED_USER
} from '@/constants/messages'

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
                const response = await axios.post(BASE_URL + AUTH_LOGIN_URL, loginData);
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
                return true;
            } catch (error) {
                this.handleErrors(error)
            }
        },
        async registerUser(registerData) {
            const authAlertsStore = useAuthAlertsStore()
            try {
                const response = await axios.post(BASE_URL +  AUTH_REGISTER_URL, registerData)
                const registeredEmail = response.data.data.email
                authAlertsStore.addSuccessMessage(SUCCESSFULLY_REGISTERED_EMAIL(registeredEmail))
                authAlertsStore.addSuccessMessage(SUCCESSFULLY_REGISTERED_USER)
                return true;
            }
            catch(error) {
                this.handleErrors(error)
            }
        },
        handleErrors(error) {
            const authAlertsStore = useAuthAlertsStore()
            const errorsArray = error.response?.data?.Errors
            if (errorsArray?.length > 0) {
                errorsArray.forEach((error) => {
                    authAlertsStore.addErrorMessage(error)
                })
            } else if (error.response?.data?.Message !== undefined && error.response?.data?.Message !== null) {
                authAlertsStore.addErrorMessage(error.response.data.Message)
            } else {
                authAlertsStore.addErrorMessage(INTERNAL_SERVER_ERROR_MESSAGE)
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
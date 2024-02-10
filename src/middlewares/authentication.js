import { useAuthStore } from "@/stores/AuthStore"

export default function authenticated({ next, store }) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
        return next({
            name: 'login'
        })
    }
    return next();
}
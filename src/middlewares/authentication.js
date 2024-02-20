import { useAuthStore } from "@/stores/AuthStore"

export default function authenticated({ next }) {
    const authStore = useAuthStore()
    if (authStore.isLoggedIn) {
        return next()
    }
    return next({
        name: 'login'
    });
}
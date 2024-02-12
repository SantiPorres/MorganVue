import { useAuthStore } from "@/stores/AuthStore";

export default function notAuthenticated({ next, store }) {
    const authStore = useAuthStore()
    if (authStore.isLoggedIn) {
        return next({
            name: 'dashboard'
        })
    }
    return next();
}
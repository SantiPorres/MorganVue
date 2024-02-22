import { useAuthStore } from "@/stores/AuthStore";

export default function notAuthenticated({ next }) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
        return next()
    }
    return next({
        name: 'dashboard'
    });
}
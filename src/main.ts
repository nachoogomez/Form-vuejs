import './assets/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { fakeBackend } from './helpers/fakebackend'

import App from './App.vue'
import router from './router'

fakeBackend();

startApp()

async function startApp(){
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    
    app.mount('#app')

    try {
        const authStore = useAuthStore();
        await authStore.refreshToken();

    } catch (error) {
        console.warn('No hay datos de autenticación');
        console.info('Redirigiendo a login');
        router.push('/login');
    }

}



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/main.css'
import App from './App.vue'

// Amplify configuration is loaded separately to avoid build errors
// when amplify_outputs.json doesn't exist yet.
// See src/services/amplify.ts for configuration logic.

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// main.js
import { createApp } from "vue"
import App from "./App.vue"

// Vuetify imports
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// Create Vuetify instance
const vuetify = createVuetify({
    components,
    directives,
})

// Mount app
createApp(App).use(vuetify).mount("#app")

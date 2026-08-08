import { createInertiaApp } from '@inertiajs/svelte'
import { mount } from 'svelte'
import ToastViewport from './Components/ToastViewport.svelte'

createInertiaApp({
    // Resolves component name to file: 'Home' → resources/js/Pages/Home.svelte
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
        return pages[`./Pages/${name}.svelte`]
    },

    setup({ el, App, props }) {
        mount(App, { target: el, props })
        mount(ToastViewport, { target: document.body })
    },

    // Browser tab title: "Page Name | NeutronixSolutions"
    title: title => `${title} | NeutronixSolutions`,
})

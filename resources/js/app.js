import { createInertiaApp } from '@inertiajs/svelte'
import { mount } from 'svelte'

createInertiaApp({
    // Resolves component name to file: 'Home' → resources/js/Pages/Home.svelte
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
        return pages[`./Pages/${name}.svelte`]
    },

    setup({ el, App, props }) {
        mount(App, { target: el, props })
    },

    // Browser tab title: "Page Name | NeutronixSolutions"
    title: title => `${title} | NeutronixSolutions`,
})

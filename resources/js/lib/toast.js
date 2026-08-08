import { writable } from 'svelte/store'

const MAX_TOASTS = 4
const DEFAULT_DURATION = 5200
const timers = new Map()
let nextId = 0

function createToastStore() {
    const { subscribe, update } = writable([])

    function clearTimer(id) {
        const timer = timers.get(id)
        if (!timer) return

        clearTimeout(timer.timeout)
        timers.delete(id)
    }

    function dismiss(id) {
        clearTimer(id)
        update((items) => items.filter((item) => item.id !== id))
    }

    function startTimer(item, duration = item.remaining) {
        clearTimer(item.id)

        const startedAt = Date.now()
        const timeout = setTimeout(() => dismiss(item.id), duration)
        timers.set(item.id, { timeout, startedAt, duration })
    }

    function add(type, message, options = {}) {
        if (!message) return null

        const duration = options.duration ?? DEFAULT_DURATION
        const id = ++nextId
        const item = {
            id,
            type,
            title: options.title ?? null,
            message,
            duration,
            remaining: duration,
            paused: false,
        }

        let added = false
        update((items) => {
            if (items.some((existing) => existing.type === type && existing.message === message)) {
                return items
            }

            const overflow = items.length >= MAX_TOASTS ? items[0] : null
            if (overflow) clearTimer(overflow.id)
            added = true

            return [...(overflow ? items.slice(1) : items), item]
        })

        if (!added) return null
        startTimer(item)

        return id
    }

    function pause(id) {
        const timer = timers.get(id)
        if (!timer) return

        const remaining = Math.max(timer.duration - (Date.now() - timer.startedAt), 0)
        clearTimer(id)
        update((items) => items.map((item) => item.id === id ? { ...item, remaining, paused: true } : item))
    }

    function resume(id) {
        let target = null
        update((items) => items.map((item) => {
            if (item.id !== id || !item.paused) return item

            target = { ...item, paused: false }
            return target
        }))

        if (target) startTimer(target)
    }

    function clear() {
        timers.forEach(({ timeout }) => clearTimeout(timeout))
        timers.clear()
        update(() => [])
    }

    return { subscribe, add, dismiss, pause, resume, clear }
}

export const toastStore = createToastStore()

export const toast = {
    success: (message, options) => toastStore.add('success', message, options),
    error: (message, options) => toastStore.add('error', message, options),
    warning: (message, options) => toastStore.add('warning', message, options),
    info: (message, options) => toastStore.add('info', message, options),
    dismiss: (id) => toastStore.dismiss(id),
    clear: () => toastStore.clear(),
}

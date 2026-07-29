/**
 * Map a public path to the equivalent URL in the other locale.
 * Keeps query strings; strips trailing slashes except for root.
 *
 * @param {string} url Inertia page.url (pathname + optional query)
 * @param {'en' | 'ar'} targetLocale
 * @returns {string}
 */
export function swapLocalePath(url, targetLocale) {
    const qIndex = url.indexOf('?')
    const rawPath = qIndex === -1 ? url : url.slice(0, qIndex)
    const pathname = rawPath.replace(/\/+$/, '') || '/'
    const query = qIndex === -1 ? '' : url.slice(qIndex)

    const isAr = pathname === '/ar' || pathname.startsWith('/ar/')

    if (targetLocale === 'ar') {
        if (isAr) return pathname + query
        return (pathname === '/' ? '/ar' : `/ar${pathname}`) + query
    }

    if (!isAr) return pathname + query
    if (pathname === '/ar') return '/' + query
    return pathname.slice(3) + query
}

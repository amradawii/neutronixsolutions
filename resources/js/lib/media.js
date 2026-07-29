/**
 * Placeholder imagery (Unsplash). Swap for local assets later.
 * Keep query params for consistent crops/quality.
 */
const u = (id, w = 1600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const media = {
    homeHero: u('photo-1497366216548-37526070297c', 2400),
    servicesBand: u('photo-1553877522-43269d4ea984', 1800),
    aboutBand: u('photo-1522071820081-009f0129c71c', 1800),
    work: {
        valo: u('photo-1492144534655-ae79c964c9d7', 1600),
        apex: u('photo-1486406146926-c627a92ad1ab', 1600),
        aether: u('photo-1596462502278-27bfdc403348', 1600),
        zeta: u('photo-1586528116311-ad8dd3c8310d', 1600),
        novus: u('photo-1600596542815-ffad4c1539a9', 1600),
        solara: u('photo-1509391366360-2e959784a276', 1600),
    },
    /** Rich case-study frames for Zeta only (swap with real product screenshots later). */
    zetaShowcase: {
        heroUi: u('photo-1551288049-bebda4e38f71', 2000),
        dashboard: u('photo-1460925895917-afdab827c52f', 1800),
        booking: u('photo-1555949963-aa79dcee981c', 1600),
        mobile: u('photo-1512941937669-90a1b58e7e9c', 900),
        ops: u('photo-1504868584819-f8e8b4b6d7e3', 1600),
        designBoard: u('photo-1586717791821-3f44a563fa4c', 1400),
        detailWide: u('photo-1558655146-d09347e92766', 2000),
    },
    team: {
        marcus: u('photo-1560250097-0b93528c311a', 800),
        lina: u('photo-1573496359142-b8d87734a5a2', 800),
        devon: u('photo-1519085360753-af0119f7cbe7', 800),
    },
}

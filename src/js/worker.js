console.log('Atlas UI Tools Running ...')

const toggleSpacedMode = (spacedMode) => {
    if (window.location.href.includes('#metrics/replicaSet')) {
        const layout = document.querySelector('#mms-body-application > div > div > div.css-aida0l.e5i1odf3')
        const sideNav = document.querySelector('#mms-body-application > div > div > div.css-aida0l.e5i1odf3 > div.css-1fi2zz6.e5i1odf0')
        const footer = document.querySelector('#mongo-body-container > div.css-1iakyal.e5i1odf3')
        const header = document.querySelector('#mms-body-application > div > div > div.css-aida0l.e5i1odf3 > div.css-lyzrnt.e5i1odf2')
        const subHeader = document.querySelector('.section-header, .section-header-has-tabs, .section-header-has-breadcrumbs')
        const subHeaderv2 = document.querySelector('.section-controls, .section-controls-is-justified, .data-explorer-layout-label')
        const fab = document.querySelector('body > div.intercom-lightweight-app > div')

        if (layout) layout.style.display = spacedMode ? 'block' : 'grid'
        if (sideNav) sideNav.style.display = spacedMode ? 'none' : 'block'
        if (footer) footer.style.display = spacedMode ? 'none' : 'block'
        if (header) header.style.display = spacedMode ? 'none' : 'block'
        if (subHeader) subHeader.style.display = spacedMode ? 'none' : 'block'
        if (subHeaderv2) subHeaderv2.style.display = spacedMode ? 'none' : 'block'
        if (fab) fab.style.display = spacedMode ? 'none' : 'block'

        const container1 = document.querySelector('#mongo-body-container')
        if (container1) {
            container1.style.height = spacedMode ? '100%' : 'auto'
            container1.style.padding = spacedMode ? '0px 24px 0px 24px' : '24px'
            container1.style.overflowX = spacedMode ? 'hidden' : 'auto'
        }
        const container2 = document.querySelector('#mongo-body-container > div:nth-child(1)')
        if (container2) {
            container2.style.height = spacedMode ? '100%' : 'auto'
        }
        const container3 = document.querySelector('#mongo-body-container > div:nth-child(1) > div:nth-child(3)')
        if (container3) {
            container3.style.height = spacedMode ? '100%' : 'auto'
        }
        const container4 = document.querySelector('#mongo-body-container > div:nth-child(1) > div:nth-child(3) > main')
        if (container4) {
            container4.style.height = spacedMode ? '100%' : 'auto'
        }
        const container5 = document.querySelector('#mongo-body-container > div:nth-child(1) > div:nth-child(3) > main > div:nth-child(1)')
        if (container5) {
            container5.style.height = spacedMode ? '100%' : 'auto'
        }
        const container6 = document.querySelector('#mongo-body-container > div:nth-child(1) > div:nth-child(3) > main > div:nth-child(1) > div.data-explorer-layout')
        if (container6) {
            container6.style.height = spacedMode ? '100%' : 'auto'
        }
    }
}
const initialize = async () => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (key === 'spacedMode') {
                toggleSpacedMode(newValue)
            }
        }
    })
    setTimeout(async () => {
        const spacedMode = (await chrome.storage.local.get(["spacedMode"])).spacedMode
        toggleSpacedMode(spacedMode)
        document.querySelector('.section-header-tab-link, .js-data-explorer-tab').addEventListener('click', () => {
            setTimeout(async () => {
                toggleSpacedMode(spacedMode)
            }, 3000)
        })
    }, 3000)
}

if (document.readyState !== 'loading') {
    initialize()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initialize()
    })
}

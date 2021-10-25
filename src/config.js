const config = window.APP_CONFIG || {}
config.ENV = process.env.NODE_ENV
const layout = process.env.VUE_APP_LAYOUT
if (layout) {
  const lm = window.APP_LAYOUT_MAP
  if (lm?.[layout]) {
    config.layout = layout
    config.navProps = lm[layout].navProps
    config.slot = lm[layout].slot
    config.pageSlot = lm[layout].pageSlot
    config.element = lm[layout].element
  }
}

export default config

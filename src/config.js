import menus from '@/menu'

const config = Object.assign({}, window.APP_SYSTEM_CONFIG, window.APP_CONFIG)
config.ENV = process.env.NODE_ENV
config.isDev = config.isDev ?? config.ENV === 'development'
config.APPName = process.env.BASE_URL.replace(/^\//, '').replace(/\/$/, '')
config.menus = menus

export default config

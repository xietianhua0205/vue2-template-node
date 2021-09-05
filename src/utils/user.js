const USER_KEY = window.APP_CONFIG.APPName + '-user'

function setUser (user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function getUser () {
  const str = localStorage.getItem(USER_KEY)
  if (str && str !== 'undefined') {
    return JSON.parse(str)
  }
  return null
}

function clearUser () {
  localStorage.removeItem(USER_KEY)
}

export { setUser, getUser, clearUser }

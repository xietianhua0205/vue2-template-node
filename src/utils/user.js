import { setItem, getItem, removeItem } from './localStorage'
const USER_POSTFIX = 'user'

function setUser (user) {
  if (user) {
    setItem(USER_POSTFIX, JSON.stringify(user))
  } else {
    clearUser()
  }
}

function getUser () {
  const str = getItem(USER_POSTFIX)
  if (str && str !== 'undefined') {
    try {
      return JSON.parse(str)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
  return null
}

function clearUser () {
  removeItem(USER_POSTFIX)
}

export { setUser, getUser, clearUser }

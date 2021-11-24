import { setItem, getItem, removeItem } from './localStorage'
const TOKEN_POSTFIX = 'token'

function setToken (token) {
  setItem(TOKEN_POSTFIX, token)
}

function getToken () {
  return getItem(TOKEN_POSTFIX)
}

function clearToken () {
  removeItem(TOKEN_POSTFIX)
}

export { setToken, getToken, clearToken }

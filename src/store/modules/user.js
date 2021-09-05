const USER = 'USER'

const user = {
  state: {
    data: {}
  },
  mutations: {
    setUser (state, payload) {
      state.data = payload.data
    }
  },
  getUser: (state) => {
    return state.data
  }
}
export { user, USER }

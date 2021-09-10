const profile = require('../profile')

const baseURL = profile.baseURL

module.exports = {
  '^/plantdata-sdk': {
    target: baseURL
  },
  '^/group1': {
    target: baseURL
  },
  '^/api': {
    target: baseURL
  }
}

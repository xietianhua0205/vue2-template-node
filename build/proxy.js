const profile = require('../profile')

const baseURL = profile.baseURL

module.exports = {
  '^/spa': {
    target: baseURL
  },
  '^/plantdata-sdk': {
    target: baseURL
  },
  '^/group1': {
    target: baseURL
  },
  '^/api': {
    target: baseURL
  },
  '^/oauth/token': {
    target: baseURL
  },
  '^/mapbox': {
    target: 'http://192.169.4.71'
  }
}

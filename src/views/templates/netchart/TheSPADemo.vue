<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>

<script>

export default {
  name: 'TheSPADemo',
  components: {},
  data () {
    const customSettings = {
      changeLayout: {
        settings: {
          layout: 'tree'
        }
      },
      filter: {
        enable: true,
        settings: {
          editItemSettings: [
            {
              key: 'distance',
              value: 3
            }
          ]
        }
      }
    }
    const kgName = this.$config.kgName
    const APK = this.$config.APK
    return {
      url: '/spa/container/' + kgName + '/' + APK + '/graph?hideHeader=1&params=9&customSettings=' +
        encodeURIComponent(JSON.stringify(customSettings))
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
iframe {
  width: 100%;
  height: 100%;
}
</style>

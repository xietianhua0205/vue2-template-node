<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>

<script>

export default {
  name: 'TheIframeDemo',
  components: {},
  data () {
    return {
      url: 'https://plantdata.cn/kgdemo/ccf/'
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

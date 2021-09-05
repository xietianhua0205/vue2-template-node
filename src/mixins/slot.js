export default {
  computed: {
    slotFilter () {
      return this.getSlot(this.$route.name, 'filter')
    },
    slotToolbar () {
      return this.getSlot(this.$route.name, 'toolbar')
    },
    slotPagination () {
      return this.getSlot(this.$route.name, 'pagination')
    }
  },
  methods: {
    getSlot (page, key) {
      const config = this.$config
      return Object.assign({}, config.slot, config.pageSlot[page])[key]
    }
  }
}

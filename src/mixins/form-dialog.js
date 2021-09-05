export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object
    }
  },
  data () {
    return {
      form: null,
      rules: {}
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (v) {
        if (v) {
          this.initFormData(this.editData)
        }
      }
    }
  },
  methods: {
    initFormData (v) {
      console.log(v)
    },
    closeDialog () {
      this.cleanReset()
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    handleSubmitSuccess () {
      this.cleanReset()
      this.$emit('success')
      this.$emit('update:visible', false)
    },
    cleanReset () {
      setTimeout(() => {
        this.initFormData()
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
      }, 300)
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    doSubmit () {

    }
  }
}

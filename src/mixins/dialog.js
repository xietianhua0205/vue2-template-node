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
      isVisible: false,
      form: null,
      rules: {}
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (v) {
        this.isVisible = v
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
    },
    handleSubmitSuccess () {
      this.cleanReset()
      this.$emit('success')
    },
    cleanReset () {
      setTimeout(() => {
        this.initFormData()
        // this.$refs.editForm?.resetFields()
      }, 300)
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
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

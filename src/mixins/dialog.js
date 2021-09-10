export default {
  props: {},
  data () {
    return {
      editData: null,
      form: null,
      rules: {},
      visible: false
    }
  },
  methods: {
    cleanReset () {
      setTimeout(() => {
        this.initFormData()
        if (this.$refs.editForm) {
          this.$refs.editForm.resetFields()
        }
      }, 300)
    },
    closeDialog () {
      this.visible = false
      this.cleanReset()
      this.$emit('close')
    },
    doSubmit () {
    },
    handleSubmitSuccess () {
      this.visible = false
      this.cleanReset()
      this.$emit('success')
    },
    initFormData (v) {
      console.log(v)
    },
    open (v) {
      this.editData = v
      this.visible = true
      if (this.editData) {
        this.initFormData(this.editData)
      }
    },
    submit () {
      if (this.$refs.editForm) {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.doSubmit()
          } else {
            return false
          }
        })
      } else {
        this.doSubmit()
      }
    }
  }
}

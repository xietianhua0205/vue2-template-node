<template>
  <el-dialog
    :visible.sync="visible"
    @close="closeDialog"
    class="dialog-mini"
    title="确认删除">
    <div>
      <div class="tip-line">
        <span>请输入 <span class="title">{{ title }}</span> 来执行此次删除操作</span>
      </div>
      <el-input v-model="confirmTitle" :size="$config.element.form.size"></el-input>
    </div>
    <div slot="footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click.native="handleDelete" :disabled="title !== confirmTitle">确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'ForceConfirmDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      confirmTitle: ''
    }
  },
  methods: {
    closeDialog () {
      this.confirmTitle = ''
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    handleDelete () {
      this.confirmTitle = ''
      this.$emit('success')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables-custom.scss";

.tip-line {
  margin-bottom: $gap;
  white-space: pre-line;
}

.title {
  color: $--color-danger;
  background: $--color-danger-lighter;
  padding: 2px 4px;
  border-radius: $--border-radius-base;
}
</style>

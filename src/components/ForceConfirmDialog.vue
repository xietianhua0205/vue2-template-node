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
  },
  data () {
    return {
      confirmTitle: '',
      title: '',
      visible: false
    }
  },
  methods: {
    open (title) {
      this.title = title
      this.visible = true
    },
    closeDialog () {
      this.visible = false
      this.confirmTitle = ''
      this.$emit('close')
    },
    handleDelete () {
      this.visible = false
      this.confirmTitle = ''
      this.$emit('success')
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

<template>
  <el-dialog
    :visible.sync="isVisible"
    @close="closeDialog"
    class='dialog-mini'
    title="修改密码">
    <el-form
      :model="form"
      :rules="rules"
      ref="editForm"
      v-if="form"
      @submit.native="$event.preventDefault()">
      <el-form-item label="用户名" prop="userName">
        <span>{{ form.userName }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          class="password"
          placeholder="请输入原密码"
          type="password"
          v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          class="password"
          placeholder="请输入新密码"
          type="password"
          v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item class="item_pwdCheck" label="确认密码" prop="confirmPassword">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="form.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click.native="closeDialog">取消</el-button>
      <el-button @click.native="submit('editForm')" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import md5 from 'md5'
import DialogMixin from '@/mixins/dialog'

export default {
  name: 'PasswordReset',
  mixins: [DialogMixin],
  props: {
    editData: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }],
        newPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 100,
            message: '长度在 6 到 100 个字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              let level = 0
              if (value && value.length >= 6) {
                if (/[0-9]/.test(value)) {
                  level++
                }
                if (/[a-z]/.test(value)) {
                  level++
                }
                if (/[A-Z]/.test(value)) {
                  level++
                }
                if (/[^0-9a-zA-Z]/.test(value)) {
                  level++
                }
                if (!value || level > 2) {
                  return callback()
                } else {
                  return callback(new Error('密码至少包括数字、大小写字母、特殊符号中的两种以上'))
                }
              } else if (value) {
                return callback(new Error('密码至少6位'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请重复密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 100,
            message: '长度在 6 到 100 个字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              value = value || ''
              const password = this.form.newPassword
              if (!value) {
                callback(new Error('请输入确认密码'))
              } else if (password !== value) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    initFormData (v) {
      this.form = {
        userId: v?.userId,
        userName: v?.userName,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    doSubmit () {
      const data = {
        oldPassword: md5(this.form.oldPassword),
        newPassword: md5(this.form.newPassword),
        userId: this.form.userId
      }
      this.$axios.post('/sso/user/password/check', data).then(() => {
        this.handleSubmitSuccess()
      }, (error) => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

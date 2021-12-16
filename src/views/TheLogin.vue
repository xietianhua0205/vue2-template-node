<template>
  <div class="login-container">
    <div class="main">
      <div class="gray-box">
        <div>
          <template v-if="$config.logoDisabled !== true">
            <img :src="$config.logo" :alt="$config.APPName" v-if="$config.logo" class="logo">
            <img src="../assets/logo.svg" :alt="$config.APPName" v-else class="logo">
          </template>
        </div>
        <p>私有化登录</p>
      </div>
      <div class="white-box">
        <div class="login-box" v-loading="inLoginLoading">
          <div class="line">
            <div>登录</div>
          </div>
          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            class="login-form"
            key="loginForm"
            size="middle"
            @submit.native="$event.preventDefault()">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
                @keyup.enter.native="loginSubmit"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login-btn" @click="loginSubmit">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
// import { setUser } from '@/utils/user'
import '@/utils/login'
import { setToken } from '@/utils/token'

export default {
  name: 'TheLogin',
  components: {},
  data () {
    return {
      inLoginLoading: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '必填',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '必填',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login () {
      const { form, headers } = window.APD_TK
      form.password = this.loginForm.password
      form.username = this.loginForm.username
      this.inLoginLoading = true
      return this.$axios.post('/oauth/token', qs.stringify(form), {
        headers
      }).then((user) => {
        this.enter(user)
      }).finally(() => {
        this.inLoginLoading = false
      })
    },
    enter (user) {
      // setUser(user)
      const config = this.$config
      config.token = 'bearer ' + user.access_token
      setToken(config.token)
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.replace({
          path: redirect
        })
      } else {
        this.$router.replace({
          path: '/'
        })
      }
    },
    loginSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    }
  }
}

</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables-custom";

.login-container {
  height: 100%;

  .main {
    width: 100%;
    height: 100%;
    background: url(../assets/images/banner-bg.png) no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative;

    .gray-box {
      width: 1192px;
      height: 528px;
      background: url("../assets/images/login-mask-bg.png") no-repeat;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: #ffffff;
      padding-left: 102px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      div {
        font-size: 32px;
      }

      .logo {
        width: 360px;
      }

      p {
        font-size: 18px;
        margin-top: 26px;
      }
    }

    .white-box {
      width: 580px;
      height: 571px;
      background-color: $--color-white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-86px) translateY(-50%);

      .login-box {
        color: $--color-text-primary;
        padding: 64px 102px;

        .line {
          display: flex;
          justify-content: space-between;
          align-items: center;

          div {
            font-size: 32px;
            color: $--color-primary;
            font-weight: bold;
          }
        }

        .login-form {
          margin-top: 16px;
        }

        .el-form-item {
          padding-top: $gap-xl;
        }

        .login-btn {
          width: 100%;
          margin-top: 40px;
          height: 48px;
          font-size: 18px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
.login-container {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    box-shadow: 0 0 0 60px #ffffff inset; //设置底色
    -webkit-text-fill-color: #333333; //文字颜色，会覆盖color
  }

  input {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
  }

  .el-form-item.is-success .el-input__inner {
    border-color: #cccccc;
  }

  .el-form-item__label {
    &::before {
      content: "" !important;
    }
  }
}
</style>

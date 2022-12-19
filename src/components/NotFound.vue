<template>
  <div class="image-content">
    <img class="not-found-image" src="../assets/images/404.png">
    <div class="not-found-side">
      <p class="title-big">哎呀！出错啦！</p>
      <p class="title-middle">您正在查找的页面不存在！</p>
      <div class="message">{{ message }}</div>
      <router-link class="back-index" to="/" replace>返回首页</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
  data () {
    return {
      message: '',
      second: 5,
      timeout: null
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  },
  created () {
    this.countDown()
  },
  methods: {
    countDown () {
      this.timeout = setTimeout(() => {
        this.message = `系统将在${this.second}秒后跳转到首页`
        this.second--
        if (this.second < 0) {
          this.$router.replace('/')
        } else {
          this.countDown()
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables-custom";

.image-content {
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;

  .not-found-image {
    display: block;
    -webkit-user-drag: none;
  }

  .not-found-side {
    padding-left: 80px;
    font-size: 24px;
    line-height: 1;
    color: #595959;
    letter-spacing: 2px;

    .title-big {
      font-size: 36px;
    }

    .title-middle {
      margin-top: 20px;
      font-size: 24px;
    }

    .message {
      font-size: 12px;
    }

    .back-index {
      display: inline-block;
      width: 132px;
      margin: 68px 0;
      font-size: 16px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      background-color: $--color-primary;
      border-radius: 4px;
      box-shadow: 0 15px 30px rgb(65 151 250 / 50%);
    }
  }
}
</style>

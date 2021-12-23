<template>
  <div class="image_content">
    <img class="notFoundImage" src="../assets/images/404.png">
    <div class="notFoundSide">
      <p class="title_big">哎呀！出错啦！</p>
      <p class="title_middle">您正在查找的页面不存在！</p>
      <div class="message">{{ message }}</div>
      <router-link class="back_index" to="/" replace>返回首页</router-link>
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

.image_content {
  display: flex;
  align-items: center;
  user-select: none;
  height: 100%;

  .notFoundImage {
    display: block;
    -webkit-user-drag: none;
  }

  .notFoundSide {
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 1;
    padding-left: 80px;
    color: #595959;

    .title_big {
      font-size: 36px;
    }

    .title_middle {
      margin-top: 20px;
      font-size: 24px;
    }

    .message {
      font-size: 12px;
    }

    .back_index {
      display: inline-block;
      text-align: center;
      margin: 68px 0;
      border-radius: 4px;
      background-color: $--color-primary;
      box-shadow: 0 15px 30px rgba(65, 151, 250, 0.5);
      width: 132px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>

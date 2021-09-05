<template>
  <div class="image_content">
    <img class="notFoundImage" src="../assets/images/404.png">
    <div class="notFoundSide">
      <p class="title_big">哎呀！出错啦！</p>
      <p class="title_middle">您正在查找的页面不存在！</p>
      <router-link class="back_index" to="/" replace>返回首页</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NotFound'
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables-custom.scss";

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

    .title_big {
      font-size: 36px;
    }

    .title_middle {
      margin-top: 20px;
      font-size: 24px;
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

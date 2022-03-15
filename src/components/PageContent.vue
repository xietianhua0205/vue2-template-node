<template>
  <el-container
    :class="{'body-container-margin': !noMargin, 'body-container-no-header': noHeader}"
    class="body-container">
    <slot name="body">
      <el-header class="body-header" v-if="!noHeader">
        <slot name="header">
          <div class="body-header-left">
            <div class="body-breadcrumb">
              <slot name="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item>
                    <slot name="page-title"></slot>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </slot>
            </div>
            <div class="body-header-extra">
              <slot name="header-extra"></slot>
            </div>
            <slot name="header-left"></slot>
          </div>
          <div class="body-header-center">
            <slot name="header-center"></slot>
          </div>
          <div class="body-header-right">
            <slot name="header-right"></slot>
            <slot name="header-right-extra"></slot>
          </div>
        </slot>
      </el-header>
      <el-main class="body-main">
        <div class="body-main-left">
          <slot name="main-left"></slot>
        </div>
        <div class="body-main-gap" v-if="!noMainGap"></div>
        <div class="body-main-right">
          <slot name="main-right">
            <div class="body-main-top">
              <slot name="main-top">
                <div class="body-main-top-left">
                  <slot name="main-top-left"></slot>
                </div>
                <div class="body-main-top-center">
                  <slot name="main-top-center"></slot>
                </div>
                <div class="body-main-top-right">
                  <slot name="main-top-right"></slot>
                </div>
              </slot>
            </div>
            <div class="body-main-center" ref="tableSlot">
              <slot name="main-table" :height="tableHeight"></slot>
            </div>
            <div class="body-main-bottom">
              <slot name="main-bottom">
                <div class="body-main-bottom-left">
                  <slot name="main-bottom-left"></slot>
                </div>
                <div class="body-main-bottom-center">
                  <slot name="main-bottom-center"></slot>
                </div>
                <div class="body-main-bottom-right">
                  <slot name="main-bottom-right"></slot>
                </div>
              </slot>
            </div>
          </slot>
        </div>
      </el-main>
      <el-footer class="body-footer">
        <slot name="footer"></slot>
      </el-footer>
    </slot>
  </el-container>
</template>

<script>

export default {
  name: 'PageContent',
  props: {
    noMainGap: {
      type: Boolean,
      default: false
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableHeight: null,
      tableHeightListener: null
    }
  },
  computed: {
    noHeader () {
      return !this.$slots.header &&
        !this.$slots.breadcrumb &&
        !this.$slots['page-title'] &&
        !this.$slots['header-extra'] &&
        !this.$slots['header-left'] &&
        !this.$slots['header-center'] &&
        !this.$slots['header-right'] &&
        !this.$slots['header-right-extra']
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.tableHeightListener)
  },
  mounted () {
    if (this.$refs.tableSlot) {
      this.tableHeightListener = () => {
        this.calcTableHeight()
      }
      window.addEventListener('resize', this.tableHeightListener)
      this.calcTableHeight()
    }
  },
  methods: {
    calcTableHeight () {
      if (this.$refs.tableSlot) {
        const $tableSlot = this.$refs.tableSlot
        const style = window.getComputedStyle($tableSlot)
        const tableStyle = window.getComputedStyle($tableSlot.querySelector('*'))
        this.tableHeight = parseInt(style.height, 10) -
          parseInt(tableStyle?.marginTop || 0, 10) -
          parseInt(tableStyle?.marginBottom || 0, 10)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables-custom";

.body-container {
  margin: 0;

  &.body-container-margin{
    .body-main {
      margin: $body-main-gap $body-main-margin $body-main-margin;
      height: calc(100% - #{$body-header-height} - #{$body-main-gap} - #{$body-main-margin});
    }
  }

  &.body-container-no-header{
    .body-main {
      height: calc(100% - #{$body-header-height} - #{$body-main-gap} - #{$body-main-margin});
    }
  }

  &.body-container-margin.body-container-no-header{
    .body-main{
      margin: $body-main-gap $body-main-margin $body-main-margin;
      height: calc(100% - #{$body-main-gap} - #{$body-main-margin});
    }
  }

  .body-header {
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    background: $default-card-background;
    box-shadow: $default-card-box-shadow;
    height: $body-header-height !important;
    justify-content: space-between;
    align-items: center;

    &:empty {
      display: none;
    }

    .body-header-left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;

      .body-breadcrumb:not(:empty), .body-header-extra:not(:empty) {
        margin-right: $gap;
      }

      .body-header-extra:not(:empty) {
        .el-icon-question {
          color: $--color-text-secondary;
        }
      }
    }

    .body-header-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      white-space: nowrap;
    }
  }

  .body-main {
    padding: 0;
    display: flex;
    flex-direction: row;
    overflow: visible;
    height: calc(100% - #{$body-header-height});

    .body-main-left {
      flex: 0 0 auto;
      background: $default-card-background;
      box-shadow: $default-card-box-shadow;

      &:empty {
        display: none;

        & ~ .body-main-gap {
          display: none;
        }
      }
    }

    .body-main-gap {
      width: $body-main-gap;
    }

    .body-main-right {
      flex: 1;
      background: $default-card-background;
      box-shadow: $default-card-box-shadow;
      display: flex;
      flex-direction: column;
      max-width: 100%;
      overflow: hidden;

      .body-main-top {
        flex: 0 0 auto;
        border-bottom: $divider;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 $gap;
        margin-top: -1px;

        &-left, &-center, &-right {
          height: 56px;
          flex: 1;
          display: flex;
          align-items: center;

          &:empty {
            display: none;
          }
        }

        &-left {
          justify-content: flex-start;
        }

        &-center {
          justify-content: center;
        }

        &-right {
          justify-content: flex-end;
        }
      }

      .body-main-top-left {
        & > .el-input {
          width: 250px;
        }
      }

      .body-main-center {
        flex: 1;
        @include scroll;
      }

      .body-main-bottom {
        flex: 0 0 auto;
        border-top: $divider;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 $gap;
        margin-bottom: -1px;

        &-left, &-center, &-right {
          height: 40px;
          flex: 1;
          display: flex;
          align-items: center;

          &:empty {
            display: none;
          }
        }

        &-left {
          justify-content: flex-start;
        }

        &-center {
          justify-content: center;
        }

        &-right {
          justify-content: flex-end;
        }
      }
    }
  }

  .body-footer:empty {
    display: none;
  }
}

#app > .body-container {
  margin: 0;
  height: 100%;
}

</style>

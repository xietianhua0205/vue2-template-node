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

  .body-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: $body-header-height !important;
    padding: 0 16px;
    background: $default-card-background;
    box-shadow: $default-card-box-shadow;

    &:empty {
      display: none;
    }

    .body-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      white-space: nowrap;

      .body-breadcrumb:not(:empty),
      .body-header-extra:not(:empty) {
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
      align-items: center;
      justify-content: flex-end;
      white-space: nowrap;
    }
  }

  .body-main {
    display: flex;
    flex-direction: row;
    height: calc(100% - #{$body-header-height});
    padding: 0;
    overflow: visible;

    .body-main-gap {
      width: $body-main-gap;
    }

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

    .body-main-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      max-width: 100%;
      overflow: hidden;
      background: $default-card-background;
      box-shadow: $default-card-box-shadow;

      .body-main-top {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;
        padding: 0 $gap;
        margin-top: -1px;
        border-bottom: $divider;

        &-left,
        &-center,
        &-right {
          display: flex;
          flex: 1;
          align-items: center;
          height: 56px;
        }

        &-left {
          justify-content: flex-start;

          & > .el-input {
            width: 250px;
          }

          &:empty {
            display: none;
          }
        }

        &-center {
          justify-content: center;

          &:empty {
            display: none;
          }
        }

        &-right {
          justify-content: flex-end;

          &:empty {
            display: none;
          }
        }
      }

      .body-main-center {
        flex: 1;

        @include scroll;
      }

      .body-main-bottom {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;
        padding: 0 $gap;
        margin-bottom: -1px;
        border-top: $divider;

        &-left,
        &-center,
        &-right {
          display: flex;
          flex: 1;
          align-items: center;
          height: 40px;
        }

        &-left {
          justify-content: flex-start;

          &:empty {
            display: none;
          }
        }

        &-center {
          justify-content: center;

          &:empty {
            display: none;
          }
        }

        &-right {
          justify-content: flex-end;

          &:empty {
            display: none;
          }
        }
      }
    }
  }

  .body-footer:empty {
    display: none;
  }

  &.body-container-margin {
    .body-main {
      height: calc(100% - #{$body-header-height} - #{$body-main-gap} - #{$body-main-margin});
      margin: $body-main-gap $body-main-margin $body-main-margin;
    }
  }

  &.body-container-no-header {
    .body-main {
      height: calc(100% - #{$body-header-height} - #{$body-main-gap} - #{$body-main-margin});
    }
  }

  &.body-container-margin.body-container-no-header {
    .body-main {
      height: calc(100% - #{$body-main-gap} - #{$body-main-margin});
      margin: $body-main-gap $body-main-margin $body-main-margin;
    }
  }
}

#app > .body-container {
  height: 100%;
  margin: 0;
}

</style>

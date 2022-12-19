<template>
  <el-container class="page-container" :class="'the-theme-' + $config.theme + ' the-layout-' + $config.layout">
    <el-header class="page-header" v-if="headVisible">
      <slot name="header">
        <div class="page-header-left">
          <slot name="header-left"></slot>
        </div>
        <div class="page-header-center">
          <slot name="header-center"></slot>
        </div>
        <div class="page-header-right">
          <slot name="header-right">
            <div class="page-header-right-start">
              <slot name="header-right-start"></slot>
            </div>
            <div class="page-header-right-end">
              <slot name="header-right-end"></slot>
              <slot name="header-right-end-extra"></slot>
            </div>
          </slot>
        </div>
      </slot>
    </el-header>
    <el-header class="page-header-secondary" v-if="headVisible">
      <slot name="header-secondary"></slot>
    </el-header>
    <el-main class="page-main">
      <slot name="main">
        <div class="page-main-left" v-if="headVisible">
          <slot name="main-left"></slot>
        </div>
        <slot name="main-right">
          <router-view class="page-main-right"/>
        </slot>
      </slot>
    </el-main>
    <el-footer class="page-footer">
      <slot name="footer"></slot>
    </el-footer>
  </el-container>
</template>

<script>

import { getKeyPrefix } from '@/utils/localStorage'

export default {
  name: 'ThePage',
  props: {
    hideHead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headVisible () {
      const hideHead = sessionStorage.getItem(getKeyPrefix() + 'hideHead')
      return !(hideHead === 'true' || this.hideHead)
    }
  },
  created () {
    sessionStorage.setItem(getKeyPrefix() + 'hideHead', this.hideHead.toString())
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables-custom";

.page-container {
  min-width: $page-min-width;
  height: 100%;
  background: $page-background;

  .page-header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    height: $page-head-height !important;
    padding: 0;
    background: $page-head-background;
    box-shadow: $page-head-box-shadow;

    .page-header-left {
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      width: $page-left-width;
      height: $page-head-height;
    }

    .page-header-right {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      .page-header-right-start {
        display: flex;
        flex: 1;
        justify-content: flex-start;
      }

      .page-header-right-end {
        display: flex;
        flex: 0 0 auto;
        justify-content: flex-end;
      }
    }

    .page-header-center {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      pointer-events: none;

      & > * {
        pointer-events: auto;
      }
    }
  }

  .page-header-secondary {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $page-head-secondary-height !important;
    background: $page-head-secondary-background;
    box-shadow: $page-head-box-shadow;

    &:empty {
      display: none;
    }

    &:not(:empty) + .page-main > .body-container > .body-header {
      display: none;
    }
  }

  .page-main {
    display: flex;
    flex-direction: row;
    padding: 0;

    .page-main-left {
      z-index: 1;
      flex: 0 0 auto;
      width: $page-left-width;
      height: 100%;
      overflow: auto;
      background: $page-left-background;
      box-shadow: $page-left-box-shadow;

      @include scroll($size: 0);

      &:empty {
        display: none;
      }
    }

    .page-main-right {
      flex: 1;
      width: 500px;
    }
  }

  .page-footer:empty {
    display: none;
  }

  &.the-layout-left {
    flex-direction: row;

    .page-header {
      flex-direction: column;
      width: $page-left-width;
      height: 100% !important;

      .page-header-right,
      .page-header-right-start,
      .page-header-right-end {
        flex-direction: column;
      }
    }
  }
}

</style>

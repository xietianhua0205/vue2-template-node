<template>
  <div class="page-filter-item">
    <div class="page-filter-item-label" :title="label">
      <slot name="label">
        <div class="page-filter-item-title">
          {{ label }}
        </div>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: {
    label: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables-custom";

.page-filter-item {
  display: flex;

  & + .page-filter-item {
    margin-left: $gap;
  }

  .page-filter-item-label {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    width: 80px;
    font-size: $--font-size-base;
    color: $--color-text-secondary;
    background: $--color-white;
    border: $divider;
    border-right: none;
    border-radius: 0;

    .page-filter-item-title {
      @include line-hidden;

      width: 100%;
      text-align: center;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 1px;
      height: 16px;
      margin: auto 0;
      content: "";
      background: $--background-color-base;
    }
  }

  ::v-deep .el-input__inner { /* stylelint-disable-line selector-class-pattern */
    border-color: $--border-color-base !important;
    border-left: none;
    border-radius: 0;

    &:focus {
      border-color: $--border-color-base;
    }
  }
}
</style>

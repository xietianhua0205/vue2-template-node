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
    flex: 1 0 auto;
    width: 80px;
    border: $divider;
    border-right: none;
    border-radius: 0;
    position: relative;
    font-size: $--font-size-base;
    color: $--color-text-secondary;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $--color-white;

    .page-filter-item-title {
      @include line-hidden;
      text-align: center;
      width: 100%;
    }

    &:after {
      content: "";
      position: absolute;
      height: 16px;
      width: 1px;
      background: $--background-color-base;
      top: 0;
      bottom: 0;
      margin: auto 0;
      right: 0;
    }

  }

  ::v-deep .el-input__inner {
    border-radius: 0;
    border-left: none;
    border-color: $--border-color-base !important;

    &:focus {
      border-color: $--border-color-base;
    }
  }
}
</style>

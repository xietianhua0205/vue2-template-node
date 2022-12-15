<template>
  <the-page v-if="isLogin || !$config.needLogin" :hide-head="hideHead">
    <template #header-left>
      <div class="logo-container" @click="goHome">
        <template v-if="$config.logoDisabled !== true">
          <img :src="$config.logo" :alt="$config.APPName" v-if="$config.logo">
          <img src="../assets/logo.svg" :alt="$config.APPName" v-else>
        </template>
      </div>
    </template>
    <template #[headerPlaceholderSlot]></template>
    <template #[$config.slot.navPrimary] v-if="$config.slot.navPrimary">
      <el-menu
        class="the-top-nav"
        mode="horizontal"
        :menu-trigger="$config.slot.navSecondary ? 'click' : 'hover'"
        :class="{'nav-border': $config.navProps.border, 'hide-only-child': $config.navProps.hideOnlyChild}"
        :default-active="activeTopIndex">
        <reactive-menu-item
          v-for="item of menuDataAllOrder"
          :key="item.id"
          :data="item">
          <template v-slot:menuItem="data">
            <template v-if="data.config.icon">
              <img v-if="isImageUrl(data.config.icon)" :src="data.config.icon" :alt="data.name"
                   class="reactive-menu-item-icon"/>
              <i v-else :class="data.config.icon" class="reactive-menu-item-icon"></i>
            </template>
            {{ data.name }}
          </template>
          <template v-slot:submenu="data">
            <template v-if="data.config.icon">
              <img v-if="isImageUrl(data.config.icon)" :src="data.config.icon" :alt="data.name"
                   class="reactive-menu-item-icon"/>
              <i v-else :class="data.config.icon" class="reactive-menu-item-icon"></i>
            </template>
            {{ data.name }}
          </template>
        </reactive-menu-item>
      </el-menu>
    </template>
    <template #header-right-end-extra>
      <el-dropdown @command="goMoreMenu" v-if="$config.needLogin || user">
        <div class="head-wrap-button">
          <span>{{ nickName }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="head-wrap-menu" :class="'the-layout-' + $config.layout">
            <el-dropdown-item command="pwd">
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <password-reset
        @success="resetPwdSuccess"
        v-if="user"
        ref="pwd">
      </password-reset>
    </template>
    <!--    <template #main>-->
    <!--      main (main)-->
    <!--    </template>-->
    <template #[$config.slot.navSecondary] v-if="$config.slot.navSecondary">
      <el-menu
        :collapse="false"
        v-if="secondaryNavMenus.length"
        :mode="$config.slot.navSecondary ==='header-secondary' ? 'horizontal' : 'vertical'"
        :class="{'nav-border': $config.navProps.border,
       'the-top-secondary-nav': $config.slot.navSecondary ==='header-secondary',
       'the-left-nav': $config.slot.navSecondary === 'main-left' || $config.slot.navSecondary === 'header-right-start'}"
        :default-openeds="$config.slot.navSecondary === 'header-secondary' ? [] : defaultOpeneds"
        :default-active="activeIndex">
        <reactive-menu-item
          v-for="item of secondaryNavMenus"
          :key="item.id"
          :data="item">
          <template v-slot:menuItem="data">
            <template v-if="data.config.icon">
              <img v-if="isImageUrl(data.config.icon)" :src="data.config.icon" :alt="data.name"
                   class="reactive-menu-item-icon"/>
              <i v-else :class="data.config.icon" class="reactive-menu-item-icon"></i>
            </template>
            {{ data.name }}
          </template>
          <template v-slot:submenu="data">
            <template v-if="data.config.icon">
              <img v-if="isImageUrl(data.config.icon)" :src="data.config.icon" :alt="data.name"
                   class="reactive-menu-item-icon"/>
              <i v-else :class="data.config.icon" class="reactive-menu-item-icon"></i>
            </template>
            {{ data.name }}
          </template>
        </reactive-menu-item>
      </el-menu>
    </template>
    <template #main-right v-if="menuDataAll.length">
      <router-view class="page-main-right" v-if="user || !$config.needLogin"/>
      <div v-else></div>
    </template>
    <template #main-right v-else>
      <el-empty class="no-menus" description="没有配置任何菜单项"></el-empty>
    </template>
    <!--    <template #footer>-->
    <!--      footer (footer)-->
    <!--    </template>-->
  </the-page>
</template>

<script>
import { reactiveMenuMixin } from '@plantdata/reactive-menu-item/src/mixins/reactive-menu'
import ReactiveMenuItem from '@plantdata/reactive-menu-item'
import PasswordReset from '@/components/PasswordReset'
import ThePage from '@/components/ThePage'
import { clearUser, setUser } from '@/utils/user'
import { clearToken } from '@/utils/token'

export default {
  name: 'TheHome',
  components: {
    ReactiveMenuItem,
    PasswordReset,
    ThePage
  },
  mixins: [reactiveMenuMixin],
  data () {
    this.updateMenuBoundary()
    return {
      menuDataAll: this.$config.menus,
      selfJump: true,
      resetPwdDialog: false,
      user: null,
      reactiveMenuConfig: {
        debounceOnRouteChange: !this.$config.logParamInHeader,
        currentMenuParentsKey: 'currentMenuParents',
        currentMenuKey: ''
      }
    }
  },
  computed: {
    headerPlaceholderSlot () {
      return this.$config.layout === 'left' ? 'header-right-end' : 'header-right-start'
    },
    isLogin () {
      return this.user
    },
    nickName () {
      return this.user?.realname || '未登录'
    },
    hideHead () {
      return this.$route.params.hideHead !== undefined
    },
    userId () {
      return this.user?.id
    },
    secondaryNavMenus () {
      const hideOnlyChild = this.$config.navProps.hideOnlyChild
      const showSub = this.$config.slot.navPrimary || (hideOnlyChild && this.menuDataAllOrder.length < 2)
      return showSub ? this.menuDataFilter : this.menuDataAllOrder
    }
  },
  created () {
    this.init()
  },
  mounted () {
    if (this.$config.titleAutoUpdate) {
      this.updatePageTitle()
    }
  },
  watch: {
    $route: {
      deep: true,
      handler () {
        if (this.$config.titleAutoUpdate) {
          this.updatePageTitle()
        }
      }
    }
  },
  methods: {
    updateMenuBoundary () {
      if (!this.$config.slot.navSecondary || !this.$config.slot.navPrimary) {
        this.$config.menus.forEach(m => {
          m.config.boundary = false
        })
      }
    },
    isImageUrl (icon) {
      return icon.startsWith('http') || icon.startsWith('data:image/')
    },
    updatePageTitle () {
      setTimeout(() => {
        document.title = this.currentMenu?.name || 'loading...'
      }, 100)
    },
    goMoreMenu (v) {
      if (v === 'logout') {
        this.logout()
      } else if (v === 'pwd') {
        this.$refs.pwd.open(this.user)
      }
    },
    init () {
      if (this.$config.needLogin) {
        this.getUser().then(() => {
        })
      }
    },
    getUser () {
      return this.$axios.get('/api/kguser/users/current/detail').then((user) => {
        setUser(user)
        this.user = user
        return user
      })
    },
    goHome () {
      this.$router.push({ name: 'home' })
    },
    logout () {
      if (this.$config.isDev) {
        clearToken()
        // 本项目登录页面
        this.$router.replace({
          name: 'login'
        })
      } else {
        // 产品登录页面
        const form = document.createElement('form')
        form.action = '/logout'
        form.method = 'POST'
        document.body.appendChild(form)
        form.submit()
      }
    },
    resetPwdSuccess () {
      clearUser()
      this.$message({
        message: '修改成功，请重新登录',
        type: 'success',
        onClose: () => {
          this.logout()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables-custom";

@mixin menu-item-title($color-primary, $color-regular, $background, $height) {
  color: $color-regular;
  height: $height;
  line-height: $height;

  i {
    color: $color-regular;
  }

  &:focus {
    background-color: unset;
  }

  &:not(.is-disabled):hover {
    background-color: $background;
    color: $color-primary;

    i {
      color: $color-primary;
    }
  }
}

@mixin menu-item($color-primary, $color-regular, $background, $height) {
  @include menu-item-title($color-primary, $color-regular, $background, $height);

  &.is-active {
    background-color: $background;
    color: $color-primary;

    i {
      color: $color-primary;
    }
  }
}

@mixin default-nav($color-primary, $color-regular, $background, $height) {
  background: transparent;

  .el-menu-item {
    @include menu-item($color-primary, $color-regular, $background, $height);
  }

  .el-submenu {
    background: transparent;

    .el-submenu__title {
      @include menu-item-title($color-primary, $color-regular, $background, $height);
    }

    .el-menu-item {
      @include menu-item($color-primary, $color-regular, $background, $height);
    }

    .el-menu {
      background: transparent;
    }
  }
}

.the-top-nav.el-menu--horizontal {
  border-bottom: 0;

  @include default-nav($page-head-color-primary, $page-head-color-regular, $page-head-background-light, $page-head-height);

  &:not(.nav-border) {
    & > .el-menu-item.is-active {
      border-bottom: 0;
    }
  }

  &.hide-only-child > li:only-child {
    display: none;
  }
}

.the-top-secondary-nav.el-menu--horizontal {
  border-bottom: 0;

  @include default-nav($page-head-secondary-color-primary, $page-head-secondary-color-regular,
    $page-head-secondary-background, $page-head-secondary-height);

  &:not(.nav-border) {
    & > .el-menu-item.is-active, & > .el-submenu.is-active .el-submenu__title {
      border-bottom: 0;
    }
  }

  & > .el-submenu.is-active .el-submenu__title {
    color: $page-head-secondary-color-primary;

    i {
      color: $page-head-secondary-color-primary;
    }
  }
}

.el-menu--horizontal .el-menu .el-menu-item.is-active {
  color: $page-head-secondary-color-primary;

  i {
    color: $page-head-secondary-color-primary;
  }
}

.the-left-nav {
  border-right: 0;

  @include default-nav($page-left-color-primary, $page-left-color-regular, $page-left-background-light, $page-left-menu-height);

  &.nav-border {
    .el-menu-item.is-active, .el-submenu .el-menu-item.is-active {
      border-right: 4px solid $--color-primary;
    }
  }
}

.the-layout-left .el-menu--horizontal > .el-submenu {
  float: none;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/variables-custom";

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 $gap;
  cursor: pointer;

  img {
    //filter: invert(100%)
    max-width: 100%;
    max-height: 100%;
  }
}

.head-wrap-button {
  text-align: center;
  padding: 0 $gap;
  cursor: pointer;
  color: $page-head-color-primary;
  display: flex;
  align-items: center;
  height: $page-head-height;
  white-space: nowrap;

  &:hover {
    background: $page-head-background-light;
  }
}

.head-wrap-menu {
  background-color: $page-left-background;
  margin: 0;
  border-radius: 0;
  border: 0;
  width: 100px;
  //left: auto!important;
  //right: 0;
  &.the-layout-left {
    left: $page-left-width !important;
    bottom: 0;
    top: auto !important;
  }

  ::v-deep {
    .el-dropdown-menu__item {
      color: $page-head-color-primary;

      &:not(.is-disabled):hover, &:focus {
        background: $page-head-background-light;
      }
    }

    .popper__arrow {
      display: none;
    }
  }
}

.the-layout-left {
  .head-wrap-button {
    justify-content: space-between;

    i {
      transform: rotate(-90deg);
    }
  }
}

.reactive-menu-item-icon {
  width: 16px;
  height: 16px;
}

img.reactive-menu-item-icon {
  vertical-align: -2px;
}

.no-menus {
  width: 100%;
}
</style>

<template>
  <page-content>
    <template #page-title>
      {{ currentMenuGet() ? currentMenuGet().name : '' }}
    </template>
    <template #main-table>
      <div>
        {{ $route.params.hello }}
      </div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { updateRouter } from '@/utils/route'

export default {
  name: 'TheDynamicDemo',
  components: { PageContent },
  inject: ['currentMenuGet'],
  data () {
    return {}
  },
  created () {
    updateRouter(this, {}, { w: 1920 })
  }
}
</script>

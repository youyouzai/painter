<template>
  <container :node="node" class="h-container"></container>
</template>

<script>
  import container from '../container'
  export default {
    name: 'horizontal-container',
    components: { container },
    props: ['node'],
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="less" scoped>

</style>>
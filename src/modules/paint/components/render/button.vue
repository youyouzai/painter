<template>
  <el-button :type="node.type">{{ node.label }}</el-button>
</template>

<script>
export default {
  name: 'button-node',
  props: ['node'],
  data () {
    return {}
  },
  methods: {

  }
}
</script>
<style>
</style>
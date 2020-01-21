<template>
  <el-input
    v-model="value"
    prefix-icon="el-icon-search"
    :type="node.type"
    :placeholder="node.placeholder"
    :clearable="node.clearable"
    :disabled="node.disabled"
    :show-password="node.showPassword"
    :rows="node.rows">
  </el-input>
</template>

<script>
export default {
  name: 'input-node',
  props: ['node'],
  data () {
    return {
      value: ''
    }
  },
  methods: {

  }
}
</script>
<style>
</style>
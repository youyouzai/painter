<template>
  <el-date-picker
    v-model="value"
    :type="dateType"
    placeholder="选择日期">
  </el-date-picker>
</template>

<script>
export default {
  name: 'date-picker-node',
  props: ['node'],
  data () {
    return {
      value: ''
    }
  },
  computed: {
    dateType () {
      return this.node.type || 'date'
    }
  },
  methods: {

  }
}
</script>
<style>
</style>
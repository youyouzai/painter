<template>
  <el-form ref="form" label-width="110px">
    <el-form-item  label="labelWidth：">
      <el-input-number v-model="node.labelWidth"></el-input-number>
    </el-form-item>
     <el-form-item  label="属性名(prop)：">
      <el-input v-model.trim="node.prop"></el-input>
    </el-form-item>
    <el-form-item  label="方向(inline)：">
      <el-radio v-model="node.inline" :label="true">水平</el-radio>
      <el-radio v-model="node.inline" :label="false">垂直</el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'form-sheet',
  props: {

  },
  computed: {
    node () {
      return this.$store.state.property.currentNode || {}
    }
  }
}
</script>
<style>
</style>
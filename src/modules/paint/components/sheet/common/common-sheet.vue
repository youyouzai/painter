<template>
<div>
  <el-form ref="form" :model="node" label-width="110px">
    <el-form-item v-show="showLabel" label="标签(label)：">
      <el-input v-model="node.label"></el-input>
    </el-form-item>
     <el-form-item v-show="showProp" label="属性名(prop)：">
      <el-input v-model.trim="node.prop"></el-input>
    </el-form-item>
    <el-form-item v-show="types" label="类型(type)：">
      <el-select v-model="node.type" :disabled="types && types.length === 1"  placeholder="请选择">
        <el-option
          v-for="item in types"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: {
    types: {
      type: [String, Array],
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    showProp: {
      type: Boolean,
      default: true
    }
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
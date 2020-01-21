<template>
  <div>
    <el-form ref="form" :model="node" label-width="110px">
      <el-form-item label="标签(label)：">
        <el-input v-model="node.label"></el-input>
      </el-form-item>
      <el-form-item label="属性名(prop)：">
        <el-input v-model.trim="node.prop"></el-input>
      </el-form-item>
      <el-form-item label="占位符：">
        <el-input v-model="node.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="类型(type)：">
        <el-select v-model="node.type" :disabled="types && types.length === 1" placeholder="请选择">
          <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="node.type === 'textarea'" label="行数(rows)：">
        <el-input-number v-model="node.rows" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="禁用(disabled)：">
        <el-radio v-model="node.disabled" :label="true">是</el-radio>
        <el-radio v-model="node.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="可清空：">
        <el-radio v-model="node.clearable" :label="true">是</el-radio>
        <el-radio v-model="node.clearable" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="密码框：">
        <el-radio v-model="node.showPassword" :label="true">是</el-radio>
        <el-radio v-model="node.showPassword" :label="false">否</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'input-sheet',
  data() {
    return {
      types: ['text', 'textarea']
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    }
  }
}
</script>
<style lang="less" scoped>
</style>
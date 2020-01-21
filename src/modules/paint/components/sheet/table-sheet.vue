<template>
  <div>
    <el-form ref="form" :model="node" label-width="70px">
      <el-form-item label="url：">
        <el-input v-model="node.url"></el-input>
      </el-form-item>
      <el-form-item label="数据源：">
        <el-button :disabled="tableDisabled" type="primary" icon="el-icon-edit" size="mini" @click="onEditDataSourceClick">编辑</el-button>
      </el-form-item>
      <el-form-item label="项配置：">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="onEditColumnClick">编辑</el-button>
      </el-form-item>
      <el-form-item label="分页：">
        <el-switch v-model="node.showPagination"></el-switch>
      </el-form-item>
      <el-form-item label="表头：">
        <el-switch v-model="node.showHeader"></el-switch>
      </el-form-item>
      <el-form-item label="边框：">
        <el-switch v-model="node.border"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    },
    tableDisabled() {
      return Boolean(this.node.url)
    }
  },
  methods: {
    onEditColumnClick() {
      this.$store.dispatch('showColumnConfigDialog')
    },
    onEditDataSourceClick() {
      this.$store.dispatch('showTableDataDialog')
    },
    onColumnUpdate(columns) {
      this.node.columns = columns
    }
  }
}
</script>
<style lang="less" scoped>
</style>
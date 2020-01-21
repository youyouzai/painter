<template>
  <div>
    <el-form ref="form" :model="node" label-width="110px">
      <el-form-item label="属性名(prop)：">
        <el-input v-model.trim="node.prop"></el-input>
      </el-form-item>
      <el-form-item v-show="types" label="类型(type)：">
        <el-select v-model="node.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="editable：">
        <el-switch v-model="node.editable"></el-switch>
      </el-form-item>
      <el-form-item label="stretch：">
        <el-switch v-model="node.stretch"></el-switch>
      </el-form-item>
      <el-form-item label="position：">
        <el-select v-model="node.tabPosition" placeholder="请选择">
          <el-option v-for="item in positions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="node.children" border style="width: 100%">
      <el-table-column prop="label" label="标签名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="onAddClick(scope.$index + 1)"></el-button>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="onDeleteClick(scope.row)"></el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      types: ['card', 'border-card'],
      positions: ['top', 'right', 'bottom', 'left']
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    }
  },
  methods: {
    onAddClick(index) {
      this.$EventBus.$emit('addTab', this.node, index)
    },
    onDeleteClick(node) {
      this.$EventBus.$emit('removeTab', node.label)
    }
  }
}
</script>
<style>
</style>
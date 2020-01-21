<template>
  <div>
    <el-form ref="form" :model="node" label-width="120px">
      <el-form-item label="标签(label)：">
        <el-input v-model="node.label"></el-input>
      </el-form-item>
      <el-form-item label="属性名(prop)：">
        <el-input v-model.trim="node.prop"></el-input>
      </el-form-item>
      <el-form-item label="url：">
        <el-input v-model.trim="node.url"></el-input>
      </el-form-item>
      <el-form-item label="labelField：">
        <el-input v-model.trim="node.labelField"></el-input>
      </el-form-item>
      <el-form-item label="valueField：">
        <el-input v-model.trim="node.valueField"></el-input>
      </el-form-item>
      <el-form-item label="多选(multiple)：">
        <el-switch v-model="node.multiple"></el-switch>
      </el-form-item>
      <el-form-item label="禁用(disabled)：">
        <el-switch v-model="node.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="可清空：">
        <el-switch v-model="node.clearable"></el-switch>
      </el-form-item>
    </el-form>
    <div class="item-container">
      <div class="title">
        数据源配置
        <el-button
          v-if="node.data.length === 0"
          type="primary"
          icon="el-icon-plus"
          circle
          size="mini"
          style="vertical-align: top"
          @click="onAddClick(0)"
        ></el-button>
      </div>
      <el-table :data="node.data" border style="width: 100%">
        <el-table-column :prop="labelField" label="标签">
          <template slot-scope="scope">
            <el-input v-model="scope.row[labelField]" :disabled="tableDisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column :prop="valueField" label="值">
          <template slot-scope="scope">
            <el-input v-model="scope.row[valueField]" :disabled="tableDisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
             :disabled="tableDisabled"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="onAddClick(scope.$index + 1)"
            ></el-button>
            <el-button
              :disabled="tableDisabled"
              type="danger"
              icon="el-icon-minus"
              circle
              size="mini"
              @click="onDeleteClick(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-common-select-sheet',

  data() {
    return {
      count: 0
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    },
    labelField() {
      return this.node.labelField
    },
    valueField() {
      return this.node.valueField
    },
    tableDisabled() {
      return Boolean(this.node.url)
    }
  },
  methods: {
    onAddClick(index) {
      const newItem = { [this.labelField]: '新节点', [this.valueField]: this.count++ }
      this.node.data.splice(index, 0, newItem)
    },
    onDeleteClick(index) {
      this.node.data.splice(index, 1)
    }
  }
}
</script>
<style>
</style>
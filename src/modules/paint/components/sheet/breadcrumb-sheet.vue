<template>
  <div>
    <div class="item-container">
      <div class="title">数据源配置
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
        <el-table-column prop="label" label="标签">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由">
          <template slot-scope="scope">
            <el-input v-model="scope.row.path"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="onAddClick(scope.$index + 1)"
            ></el-button>
            <el-button
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
      const newItem = { label: '页面', path: '/' }
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
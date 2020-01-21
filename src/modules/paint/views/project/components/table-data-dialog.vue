<template>
  <el-dialog
    title="编辑列表数据源"
    :visible.sync="visible"
    width="50%">
    <div class="content">
      <el-table :data="data" border style="width: 100%">
        <el-table-column 
          v-for="(column, index) in node.columns"
          :key="index"
          :prop="column.prop" 
          :label="column.label"
          :width="column.width">
          <template slot-scope="scope">
            <el-input v-model="scope.row[column.prop]"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="onAddClick(scope.$index + 1)"></el-button>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="onDeleteClick(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide()">取 消</el-button>
      <el-button type="primary" @click="onConfirmClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import manager from '../../../util/node-manager'
export default {
  data () {
    return {
      visible: false,
      data: [],
      types: manager.tableColumnTypes
    }
  },
  computed: {
    node () {
      return this.$store.state.property.currentNode || {}
    },
    showDialog () {
      return this.$store.state.property.currentNode
    },
    showTableDataDialog () {
      return this.$store.state.property.showTableDataDialog
    }
  },
  watch: {
    node: {
      handler () {
        this.initData()
      },
      deep: true
    },
    // eslint-disable-next-line
    ['$store.state.property.showTableDataDialog'](val){
      this.visible = val
    },
    visible (val) {
      if (val) {
        this.$store.dispatch('showTableDataDialog')
      } else {
        this.$store.dispatch('hideTableDataDialog')
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.data = this.node.data ? [...this.node.data] : []
    },
    onAddClick (index) {
      const newNode = {}
      this.node.columns.forEach((column) => {
        newNode[column.prop] = ''
      })
      this.data.splice(index, 0, newNode)
    },
    onDeleteClick (index) {
      this.data.splice(index, 1)
    },
    onConfirmClick () {
      this.updateNode()
      this.hide()
    },
    updateNode () {
      this.$store.dispatch('updateNode', {data: this.data})
    },
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>
<style>
</style>
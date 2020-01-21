<template>
  <el-dialog
    title="编辑列表项"
    :visible.sync="visible"
    width="50%">
    <div class="content">
      <el-table :data="columns" border style="width: 100%">
        <el-table-column prop="label" label="列名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="属性" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.prop"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="contentType" label="类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.contentType" :disabled="types && types.length === 1"  placeholder="请选择">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="width" label="宽度">
          <template slot-scope="scope">
            <el-input v-model="scope.row.width"></el-input>
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
      columns: [],
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
    showColumnConfigDialog () {
      return this.$store.state.property.showColumnConfigDialog
    }
  },
  watch: {
    node: {
      handler () {
        this.initColumns()
      },
      deep: true
    },
    // eslint-disable-next-line
    ['$store.state.property.showColumnConfigDialog'] (val) {
      this.visible = val
    },
    visible (val) {
      if (val) {
        this.$store.dispatch('showColumnConfigDialog')
      } else {
        this.$store.dispatch('hideColumnConfigDialog')
      }
    }
  },
  mounted () {
    this.initColumns()
  },
  methods: {
    initColumns () {
      const columns = this.node.columns
      if (!columns || columns.length === 0) {
        this.columns = [
          {label: '', prop: '', contentType: '', width: ''}
        ]
      } else {
        this.columns = columns
      }
    },
    onAddClick (index) {
      const newColumn = {label: '', prop: '', contentType: '', width: ''}
      this.columns.splice(index, 0, newColumn)
    },
    onDeleteClick (index) {
      this.columns.splice(index, 1)
    },
    onConfirmClick () {
      this.updateNode()
      this.hide()
    },
    updateNode () {
      this.$store.dispatch('updateNode', {columns: this.columns})
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
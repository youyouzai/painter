<template>
  <el-dialog title="图表配置" :visible.sync="visible" width="50%">
    <div class="content">
      <div class="item-container">
        <div class="title">
          数据项配置
          <el-button
            v-if="node.series && node.series.length === 0"
            type="primary"
            icon="el-icon-plus"
            circle
            size="mini"
            style="vertical-align: top"
            @click="onAddSerieClick(0)"
          ></el-button>
        </div>
        <el-table :data="node.series" border style="width: 100%">
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择">
                <el-option
                  v-for="(value, index) in types"
                  :key="index"
                  :label="value"
                  :value="value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="labelField" label="labelField">
            <template slot-scope="scope">
              <el-input v-model="scope.row.labelField"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="valueField" label="valueField">
            <template slot-scope="scope">
              <el-input v-model="scope.row.valueField"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                size="mini"
                @click="onAddSerieClick(scope.$index + 1)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="onDeleteSerieClick(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="item-container">
        <div class="title">
          数据源配置
          <el-button
            v-if="data.length === 0"
            type="primary"
            icon="el-icon-plus"
            circle
            size="mini"
            style="vertical-align: top"
            @click="onAddDataClick(0)"
          ></el-button>
        </div>
        <el-table :data="data" border style="width: 100%">
          <el-table-column :prop="node.xAxisField" label="xAxis">
            <template slot-scope="scope">
              <el-input v-model="scope.row[node.xAxisField]"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(column, index) in node.series"
            :key="index"
            :prop="column.valueField"
            :label="column.labelField"
            :width="column.width"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row[column.valueField]"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                size="mini"
                @click="onAddDataClick(scope.$index + 1)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="onDeleteDataClick(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide()">取 消</el-button>
      <el-button type="primary" @click="onConfirmClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      data: [],
      types: ['line', 'bar']
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    },
    showDialog() {
      return this.$store.state.property.currentNode
    },
    showChartConfigDialog() {
      return this.$store.state.property.showChartConfigDialog
    }
  },
  watch: {
    node: {
      handler() {
        this.initData()
      },
      deep: true
    },
    // eslint-disable-next-line
    ['$store.state.property.showChartConfigDialog'](val) {
      this.visible = val
    },
    visible(val) {
      if (val) {
        this.$store.dispatch('showChartConfigDialog')
      } else {
        this.$store.dispatch('hideChartConfigDialog')
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.data = this.node.data ? [...this.node.data] : []
    },
    onAddDataClick(index) {
      const newNode = {}
      this.node.series.forEach(column => {
        newNode[column.valueField] = ''
      })
      this.data.splice(index, 0, newNode)
    },
    onDeleteDataClick(index) {
      this.data.splice(index, 1)
    },
    onAddSerieClick(index) {
      const newColumn = { type: 'line', labelField: '', valueField: '' }
      this.node.series.splice(index, 0, newColumn)
    },
    onDeleteSerieClick(index) {
      this.node.series.splice(index, 1)
    },
    onConfirmClick() {
      this.updateNode()
      this.hide()
    },
    updateNode() {
      this.$store.dispatch('updateNode', { data: this.data })
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.item-container {
  .title {
    font-weight: bold;
    padding: 15px 0;
  }
}
</style>
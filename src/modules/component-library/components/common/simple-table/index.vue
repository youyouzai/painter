<template>
  <div>
    <el-table
      ref="table"
      v-bind="$attrs"
      :data="tableData"
      style="width: 100%"
    >
      <template v-if="options">
        <el-table-column v-if="hasCheckBox" type="selection" width="70"></el-table-column>
        <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          :type="column.type"
          :label="column.label"
          :prop="column.prop"
          :width="column.width"
        >
          <template slot-scope="scope">
            <simple-table-render :options="column" :row="scope.row"></simple-table-render>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <div v-if="options.showPagination === undefined || options.showPagination" class="pagination-cotnainer">
      <el-pagination
        :current-page="form.pageNo"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="form.pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="changeSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import './table-render'
import { httpGet } from '../../../util/http'
import { getField } from '../../../util/util'
export default {
  props: ['options', 'data'],
  data() {
    return {
      url: '',
      form: {
        pageSize: 10,
        pageNo: 1
      },
      tableData: [],
      totalCount: 0
    }
  },
  computed: {
    columns() {
      let columns = this.options.columns
      if (!columns) return []
      let arr = columns.filter(column => {
        return column.type !== 'selection'
      })
      return arr
    },
    hasCheckBox() {
      let columns = this.options.columns
      return (
        columns &&
        columns.some(column => {
          return column.type === 'selection'
        })
      )
    },
    dataField() {
      return this.options.dataField || 'data'
    },
    totalField() {
      return this.options.totalField || 'totalCount'
    }
  },
  watch: {
    data(val) {
      this.tableData = val
    },
    ['options.url'](val) {
      this.url = val
      this.query()
    }
  },
  mounted() {
    if (this.options) {
      this.url = this.options.url
      this.tableData = this.options.data
      this.query()
    }
  },
  methods: {
    async query(params) {
      if (!this.url) return
      if (this.url.then) {
        // 是promise对象
        const _self = this
        this.url.then(response => {
          _self.initDataByResponse(response)
        })
      } else if (typeof this.url === 'string') {
        this.form = {
          ...this.form,
          ...params
        }
        const response = await httpGet(this.url, this.form)
        this.initDataByResponse(response)
      }
    },
    reset() {
      this.pageSize = 10
      this.pageNo = 1
      this.query()
    },
    changePage(val) {
      this.form.pageNo = val
      this.query()
    },
    changeSize(val) {
      this.option.pageSize = val
      this.query()
    },
    initDataByResponse(response) {
      this.tableData = getField(response, this.dataField)
      this.totalCount = getField(response, this.totalField)
      
      this.$emit('updateData', this.tableData, this.totalCount)
    }
  }
}
</script>
<style scoped>
.pagination-cotnainer {
  margin-top: 20px;
  text-align: right;
}
</style>
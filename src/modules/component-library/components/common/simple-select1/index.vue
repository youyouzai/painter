<template>
  <div class="u-simple-select">
    <el-input v-model="condition" :placeholder="placeholder"></el-input>
    <div class="panel">
      <el-row class="item">
        <el-col :span="18">全部</el-col>
        <el-col :span="6">
          <el-checkbox v-model="selectedAll" :disabled="disabled" @change="onAllSelectedChange"></el-checkbox>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in list" :key="index" class="item">
        <el-col :span="18">{{ item.label }}</el-col>
        <el-col :span="6">
          <el-checkbox v-model="item.selected" :disabled="disabled" :key="item.value" @change="dispatchEvent"></el-checkbox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getList, getDataSourceByUrl } from '../../../util/util'

export default {
  props: {
    url: {
      default: ''
    },
    data: {
      default: () => []
    },
    value: {
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    dataField: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入查询条件'
    }
  },
  data() {
    return {
      selectedAll: false,
      dataSource: [],
      condition: ''
    }
  },
  watch: {
    url(){
      this.init()
    }
  },
  computed: {
    list() {
      const reg = /\s*,\s*/
      const conditions = this.condition.split(reg)
      const arr = []
      for (let i = 0; i< this.dataSource.length; i++) {
        const item = this.dataSource[i]
        item.selected = this.value.indexOf(item[this.valueField]) > -1
        if (!this.condition) {
          arr.push(item)
        } else {
          for (let i = 0; i < conditions.length; i++) {
            const value = conditions[i].toUpperCase()
            if (value !== '' && item[this.labelField].toUpperCase().indexOf(value) > -1) {
              arr.push(item)
              break
            }
          }
        }
      }
      return getList(arr, this.labelField, this.valueField)
    },
    selectValues() {
      const result = []
      for(let i = 0; i< this.list.length; i++) {
        const item = this.list[i]
        if (item.selected) {
          result.push(item.value)
        }
      }
      return result
    }
  },
  mounted() {
    this.dataSource = this.data
    this.init()
  },
  methods: {
    init(params) {
      this.query(params)
    },
    async query(params) {
      const dataSource = await getDataSourceByUrl(this, params)
      this.dataSource = dataSource
      this.$emit('updateData', dataSource)
    },
    onAllSelectedChange() {
      this.list.forEach(item => {
        item.selected = this.selectedAll
      })
      this.dispatchEvent()
    },
    dispatchEvent() {
      this.$emit('input', this.selectValues)
    }
  }
}
</script>
<style lang="less" scoped>
.u-simple-select {
  width: 100%;
  max-width: 500px;
  .panel {
    max-height: 380px;
    border: 1px solid #dcdfe6;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 3px;
    overflow-y: auto;
    margin-top: 20px;
  }
  .item {
    line-height: 36px;
    text-align: left;
    font-size: 14px;
  }
}
</style>

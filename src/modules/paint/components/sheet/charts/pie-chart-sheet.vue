<template>
  <div>
    <el-form ref="form"  label-width="110px">
      <el-form-item label="标题：">
        <el-input v-model="node.label"></el-input>
      </el-form-item>
      <el-form-item label="url：">
        <el-input v-model.trim="node.url"></el-input>
      </el-form-item>
    </el-form>
    <div class="item-container">
      <div class="title">
        数据项配置&nbsp; &nbsp;
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="onEditConfigClick"></el-button>
      </div>
      <el-table :data="node.series" border style="width: 100%">
        <el-table-column prop="labelField" label="labelField"></el-table-column>
        <el-table-column prop="valueField" label="valueField"></el-table-column>
      </el-table>
    </div>
    <div class="item-container">
      <div class="title">
        数据源配置&nbsp; &nbsp;
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="onEditConfigClick"></el-button>
      </div>
      <el-table :data="node.data" border style="width: 100%">
        <el-table-column 
          v-for="(column, index) in node.series"
          :key="index"
          :prop="column.valueField" 
          :label="column.labelField"
          :width="column.width">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pie-chart-sheet',
  props: {},
  data() {
    return {
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    }
  },
  methods: {
    updateNode() {
      this.$store.dispatch('updateNode', this.form)
    },
    onEditConfigClick() {
      this.$store.dispatch('showChartConfigDialog')
    }
  }
}
</script>
<style lang="less" scoped>
  .item-container{
    margin: 10px 0;
    border: solid 1px #f8f8f8;
    .title{
      padding: 10px 15px;
      background: #f8f8f8;
    } 
  }
</style>
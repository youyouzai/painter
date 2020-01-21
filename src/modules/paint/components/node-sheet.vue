<template>
  <component v-bind:is="currentComponent"></component>
</template>

<script>
import commonSheet from './sheet/common/common-sheet'
import container from './sheet/container-sheet'
import horizontalContainer from './sheet/horizontal-container-sheet'
import formSheet from './sheet/form-sheet'
import tableSheet from './sheet/table-sheet'
import selectSheet from './sheet/select-sheet'
import inputSheet from './sheet/input-sheet'
import datePickerSheet from './sheet/date-picker-sheet'
import buttonSheet from './sheet/button-sheet'
import labelSheet from './sheet/label-sheet'
import tabsSheet from './sheet/tabs-sheet'
import baseChartSheet from './sheet/charts/base-chart-sheet'
import pieChartSheet from './sheet/charts/pie-chart-sheet'
import breadcrumbSheet from './sheet/breadcrumb-sheet'
import pageSheet from './sheet/page-sheet'

export default {
  name: 'component-property',
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    },
    type() {
      return this.node.componentType
    },
    currentComponent() {
      let component = null
      switch (this.type) {
        case 6: // 垂直布局容器
          component = container
          break
        case 7: // 水平布局容器
          component = horizontalContainer
          break
        case 11: // 表单
          component = formSheet
          break
        case 12: // 表格
          component = tableSheet
          break
        case 13: // select
        case 24: // checkbox-group-select
        case 25: // transfer-input
          component = selectSheet
          break
        case 14: // input
          component = inputSheet
          break
        case 15: // date
          component = datePickerSheet
          break
        case 16: // button
          component = buttonSheet
          break
        case 17: // label
          component = labelSheet
          break
        case 18: // breadcrumb-sheet
          component = breadcrumbSheet
          break
        case 31: // tabs
          component = tabsSheet
          break
        case 41: // page
          component = pageSheet
          break
        case 51: // line chart
        case 53: // bar chart
          component = baseChartSheet
          break
        case 52: // pie chart
          component = pieChartSheet
          break
        default:
          component = commonSheet
          break
      }
      return component
    }
  }
}
</script>
<style lang="less" scoped>
</style>
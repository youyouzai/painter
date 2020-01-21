<template>
  <div
    :id="node.id"
    :class="containerClass"
    draggable="true"
    @dragstart="onDragStart($event)"
    @dragover="onDragOver"
    @dragleave="showBorder = false"
    class="node-container">
    <div class="mask" @mouseover="onMouseOverHandler" @mouseleave="onMouseLeaveHandler">
      <el-button
        v-show="showTool"
        icon="el-icon-edit"
        circle
        size="mini"
        type="primary"
        @click="onEditClick"
      ></el-button>
      <el-button
        v-show="showTool"
        icon="el-icon-delete"
        circle
        size="mini"
        type="danger"
        @click="onDeleteClick"
      ></el-button>
    </div>
    <component v-bind:is="currentComponent" :node="node" :style="node.style"></component>
  </div>
</template>

<script>
import horizontalContainer from './render/horizontal-container'
import containerNode from './container'
import formNode from './render/form'
import tableNode from './render/table'
import selectNode from './render/select'
import inputNode from './render/input'
import buttonNode from './render/button'
import labelNode from './render/label'
import datePickerNode from './render/date-picker'
import myFormNode from './render/my-form'
import checkboxGroupSelectNode from './render/checkbox-group-select'
import transferInputNode from './render/transfer-input'
import Breadcrumb from './render/breadcrumb'

import Tabs from './tabs'
import Page from './page'
import Dialog from './dialog'

import LineChart from './render/charts/line-chart'
import PieChart from './render/charts/pie-chart'
import BarChart from './render/charts/bar-chart'

import manager from '../util/node-manager.js'
export default {
  name: 'component-node',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showTool: false,
      showBorder: false
    }
  },
  computed: {
    type() {
      return this.node.componentType
    },
    containerClass() {
      return { active: this.showBorder }
    },
    currentComponent() {
      let component = null
      switch (this.type) {
        case 6: // 垂直布局容器
          component = containerNode
          break
        case 7: // 水平布局容器
          component = horizontalContainer
          break
        case 11: // 表单
          component = formNode
          break
        case 12: // 表格
          component = tableNode
          break
        case 13: // select
          component = selectNode
          break
        case 14: // input
          component = inputNode
          break
        case 15: // date
          component = datePickerNode
          break
        case 16: // button
          component = buttonNode
          break
        case 17: // label
          component = labelNode
          break
        case 18: //
          component = Breadcrumb
          break
        case 21: // my-form
          component = myFormNode
          break
        case 24:
          component = checkboxGroupSelectNode
          break
        case 25:
          component = transferInputNode
          break
        case 31:
          component = Tabs
          break
        case 41:
          component = Page
          break
        case 42:
          component = Dialog
          break
        case 51:
          component = LineChart
          break
        case 52:
          component = PieChart
          break
        case 53:
          component = BarChart
          break
        default:
          break
      }
      return component
    }
  },
  methods: {
    onDragStart(event) {
      event.stopImmediatePropagation()
      // 数据处理
      event.dataTransfer.setData('operateType', 'move')
    },
    onDragOver() {
      if (manager.isContainer(this.node)) {
        this.showBorder = true
      }
    },
    onEditClick() {
      this.$emit('edit')
      this.$store.dispatch('showPropertySheet', this.node)
    },
    onDeleteClick() {
      this.$emit('delete')
    },
    onMouseOverHandler() {
      this.showTool = true
    },
    onMouseLeaveHandler() {
      this.showTool = false
    }
  }
}
</script>
<style lang="less" scoped>
.node-container {
  position: relative;
  border-radius: 4px;
  box-sizing: content-box;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 30px;
    padding: 1px 3px;
    text-align: right;
    cursor: pointer;
    z-index: 20;
  }
  .mask:hover {
    background-color: #ecf5ff60;
  }
}
.node-container:hover,
.node-container.active {
  border-color: #409eff;
}
</style>
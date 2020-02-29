<template>
  <div class="container">
    <components-selector class="l-left"></components-selector>
    <div class="l-main" @dragover="onDragOver($event)">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="视图" name="view">
          <container ref="container" :id="node.id" class="panel-container" :node="panelNode"></container>
          <container class="dialog-container" :node="dialogGroupNode"></container>
        </el-tab-pane>
        <el-tab-pane label="源码" name="sourceCode">
          <div class="code">展示生成的json数据配置</div>
        </el-tab-pane>
      </el-tabs>
      <el-button-group class="tool-container">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          title="下载文件"
          @click="downloadFile"
        ></el-button>
        <el-button type="primary" icon="el-icon-folder" size="mini" title="下载工程"></el-button>
      </el-button-group>
    </div>
    <property-sheet class="property-panel-container"></property-sheet>
    <div class="dialog-tool-container">
      <el-tag v-for="tag in tags" :key="tag.id" closable class="tag" @click="onDialogClick(tag)" @close="onDialogClose(tag)">{{tag.label}}</el-tag>
    </div>
    <column-config-dialog></column-config-dialog>
    <table-data-dialog></table-data-dialog>
    <chart-config-dialog></chart-config-dialog>
  </div>
</template>

<script>
import componentsSelector from './components/components-selector'
import propertySheet from './components/property-sheet'
import columnConfigDialog from './components/column-config-dialog'
import tableDataDialog from './components/table-data-dialog'
import chartConfigDialog from './components/chart-config-dialog/index'
import container from '../../components/container.vue'
import { createNode, deleteNode } from '../../util/node-factory'

export default {
  components: { componentsSelector, container, propertySheet, columnConfigDialog, tableDataDialog, chartConfigDialog },
  data() {
    return {
      activeName: 'view',
      count: 1,
      node: null, // 根组件
      panelNode: null, // 用于画布的节点
      dialogGroupNode: null // 用于存放弹出框的节点
    }
  },
  computed: {
    dialogsMap() {
      return this.$store.state.property.dialogsMap
    },
    tags() {
      const result = []
      const dialogsMap = this.dialogsMap
      for (let key in dialogsMap) {
        if (!dialogsMap[key]) break
        result.push(dialogsMap[key].node)
      }
      return result
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // this.$store.dispatch('showPropertySheet', createNode(6))
  },
  methods: {
    initData() {
      this.panelNode = createNode(1)
      this.dialogGroupNode = createNode(2)
      this.node = {
        ...createNode(0),
        children: [this.panelNode, this.dialogGroupNode],
        panelNode: this.panelNode,
        dialogGroupNode: this.dialogGroupNode
      }
      this.panelNode.parent = this.node
      this.dialogGroupNode.parent = this.node
      this.$store.dispatch('setRootNode', this.node)
    },
    onDialogClick(node) {
      const vueComponent = this.dialogsMap[node.id]
      if (vueComponent) {
        vueComponent.show()
      }
    },
    onDialogClose(node) {
      deleteNode(node)
      this.$store.dispatch('deleteDialog', node.id)
    },
    onDragOver(event) {
      event.preventDefault()
    },
    downloadFile() {
      this.traverseNode(this.node)
      // eslint-disable-next-line
      console.log(JSON.stringify(this.node))
      // const path = generator(this.node)
      this.$electron.ipcRenderer.send('download', this.node)
    },
    traverseNode(node) {
      delete node.parent
      node.children && node.children.forEach((child) => {
        this.traverseNode(child)
      })
      node.node  && node.node.children.forEach((child) => {
        this.traverseNode(child)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;

  .l-left {
    flex-basis: 180px;
    border-right: solid 1px #ecf5ff;
  }
  .l-main {
    position: relative;
    flex: 1;
    padding-top: 0;
    padding-right: 10px;
    overflow: auto;
    transform:translateX(0);
    .panel-container {
      height: 100%;
      box-sizing: border-box;
      background-color: #fff;
    }
    dialog-container{
      width: 0;
      height: 0;
      overflow: hidden;
    }
    .property-panel-container {
      flex-basis: 300px;
    }
    .tool-container {
      position: absolute;
      top: 5px;
      left: 180px;
    }
    .dialog-tool-container {
      position: absolute;
      left: 400px; bottom: 5px;
      height: 40px;
      line-height: 40px;
      min-width: 100px;
      .tag {
        cursor: pointer;
      }
    }
  }
}
</style>
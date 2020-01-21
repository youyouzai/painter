<template>
  <el-tabs
    v-model="activeName"
    :type="node.type"
    :editable="node.editable"
    :stretch="node.stretch"
    :tab-position="node.tabPosition"
    @edit="onTabsEdit"
  >
    <el-tab-pane
      v-for="(tab, index) in node.children"
      :key="index"
      :label="tab.label"
      :name="nameRender(tab, index)"
    >
      <container :node="tab" class="tab-container"></container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import container from './container'
import commonPart from '../util/node-common-part-code.js'
import { getEmptyNode } from '../util/node-factory.js'
export default {
  name: 'tabs-node',
  components: { container },
  props: ['node'],
  data() {
    return {
      activeName: 'tab0',
      newTabCount: 0
    }
  },
  mounted() {
    this.initEventBus()
  },
  methods: {
    ...commonPart,
    nameRender(tab, index) {
      return tab.name || `tab${index}`
    },
    initEventBus() {
      this.$EventBus.$on('addTab', (node, index) => {
        if (node.id === this.node.id) {
          this.addTab(index)
        }
      })
      this.$EventBus.$on('removeTab', this.removeTab)
    },
    addTab(index) {
      const node = getEmptyNode(0)
      node.name = node.label = `newTab${this.newTabCount++}`
      if (index > -1) {
        this.node.children.splice(index, 0, node)
      } else {
        this.node.children.push(node)
      }
      this.activeName = node.name
    },
    removeTab(targetName) {
      const children = this.node.children
      for (let i = 0; i < children.length; i++) {
        if (targetName === children[i].label) {
          children.splice(i, 1)
          this.activeName = children[0].label
          return
        }
      }
    },
    onTabsEdit(targetName, action) {
      if (action === 'add') {
        this.addTab()
      }
      if (action === 'remove') {
        this.removeTab(targetName)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tab-container {
  min-height: 300px;
  border-color: transparent;
}
</style>
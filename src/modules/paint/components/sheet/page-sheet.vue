<template>
  <div>
    <el-form>
      <el-form-item label="方向(inline)：">
        <el-radio v-model="node.mode" label="horizontal">水平</el-radio>
        <el-radio v-model="node.mode" label="vertical">垂直</el-radio>
      </el-form-item>
    </el-form>
    <div class="item-container">
      <div class="title">
        数据源配置
        <div class="btn-container">
          <el-button type="success" icon="el-icon-plus" size="mini" @click="onAddClick()"></el-button>
          <el-button type="danger" icon="el-icon-minus" size="mini" @click="onDeleteClick()"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="onEditClick()"></el-button>
          <el-button type="primary" icon="el-icon-document" size="mini" @click="onSaveClick()"></el-button>
        </div>
      </div>
      <el-tree
        ref="tree"
        :data="node.menus"
        draggable
        show-checkbox
        node-key="index"
        :check-strictly="true"
        default-expand-all
        :expand-on-click-node="false"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span
            v-if="!data.edit"
            style="cursor: pointer"
            @click="onNodeClick(data)"
          >{{ data.label }}</span>
          <div v-else style="display: inline-block">
            <el-input v-model="data.label" placeholder="名称label" class="tree-node-input"></el-input>-
            <el-input v-model="data.index" placeholder="标志index" class="tree-node-input"></el-input>
          </div>
          <!-- <span>
            <i class="icon el-icon-plus"  @click="append(data)"></i>
            <i class="icon el-icon-minus"  @click="remove(node, data)"></i>
          </span>-->
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getEmptyNode } from '../../util/node-factory.js'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {}
    }
  },
  methods: {
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    },
    onNodeClick(data) {
      this.save()
      this.edit(data, true)
      this.$refs.tree.setCheckedKeys([data.index])
    },
    onAddClick() {
      const checkNodes = this.getCheckedNodes()
      if (checkNodes.length) {
        checkNodes.forEach(this.append)
      } else {
        this.append(this.$refs.tree)
      }
    },
    onDeleteClick() {
      const getNode = this.$refs.tree.getNode
      this.getCheckedNodes().forEach(data => {
        const treeNode = getNode(data.index)
        this.remove(treeNode, data)
      })
    },
    onEditClick() {
      this.getCheckedNodes().forEach(data => {
        this.edit(data, true)
      })
    },
    onSaveClick() {
      this.save()
    },
    save() {
      const data = this.$refs.tree.data
      this.traverseTree(data, node => {
        this.edit(node, false)
      })
    },
    traverseTree(treeNodes, callback) {
      if (!treeNodes) return
      treeNodes.forEach(node => {
        callback.call(this, node)
        this.traverseTree(node.children, callback)
      })
    },
    edit(data, editable) {
      this.$set(data, 'edit', editable)
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      const suffix = `-${data.children.length + 1}`
      const label = data.label || 'newItem'
      const index = data.index || 'menu'

      const newChild = this.createMenuNode(`${label}${suffix}`, `${index}${suffix}`)
      data.children.push(newChild)
    },
    createMenuNode(label, index) {
      const newNode = {
        ...getEmptyNode(0),
        label: name,
        prop: index,
        menuIndex: index
      }
      this.node.children.push(newNode)
      return {
        label,
        index,
        nodeId: newNode.id
      }
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)

      const nodeIndex = this.node.children.findIndex(d => d.id === data.nodeId)
      this.node.children.splice(nodeIndex, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.tree-node-input {
  display: inline-block;
  width: 90px;
  height: 25px;
  line-height: 25px;
}
.icon {
  padding: 2px;
}
.el-icon-minus {
  color: #409eff;
}
.el-icon-plus {
  color: #67c23a;
}
.btn-container {
  display: inline-block;
  margin-left: 15px;
  .el-button {
    margin-left: 3px;
  }
}
</style>
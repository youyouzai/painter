<template>
  <el-dialog
    ref="dialog"
    :title="node.title"
    :visible.sync="visible"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :show-close="false"
    class="dialog-container"
    width="75%"
  >
    <div slot="title">
      {{ node.label }}
      <div class="tool-container">
        <el-button
          icon="el-icon-edit"
          circle
          size="mini"
          type="primary"
          @click="onEditClick"
        ></el-button>
        <el-button
          icon="el-icon-delete"
          circle
          size="mini"
          type="danger"
          @click="onDeleteClick"
        ></el-button>
        <el-button
          icon="el-icon-close"
          circle
          size="mini"
          type="info"
          @click="onCloseClick"
        ></el-button>
      </div>
    </div>
    <container :node="node" class="dialog-content-container"></container>
    <div slot="footer" class="dialog-footer"> 
      <el-button type="primary" @click="onConfirm">确定</el-button>
      <el-button type="danger" @click="hide()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import container from './container'
import commonPart from '../util/node-common-part-code.js'
export default {
  name: 'dialog-node',
  components: { container },
  props: ['node'],
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.$store.dispatch('addDialog', this)
    this.show()
  },
  methods: {
    ...commonPart,
    onEditClick() {
      this.$store.dispatch('showPropertySheet', this.node)
    },
    onDeleteClick() {
      this.$store.dispatch('deleteDialog', this.node.id)
      this.deleteNode(this.node)
    },
    onCloseClick() {
      this.hide()
    },
    onConfirm() {
      this.hide()
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
.tool-container{
  float: right;
}
.dialog-content-container{
  min-height: 300px;
}
</style>
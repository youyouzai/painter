<template>
  <div
    ref="container"
    :id="node.id"
    class="node-groups-container"
    @dragover="onDragOver($event)"
    @drop="onDrop($event)"
  >
    <node
      v-for="(node, index) in node.children"
      :key="index"
      :node="node"
      draggable="true"
      @edit="editNode(node)"
      @delete="deleteNodeByIndex(index)"
      class="node-container"
    ></node>
  </div>
</template>

<script>
import commonPart from '../util/node-common-part-code.js'
export default {
  name: 'container',
  props: ['node'],
  data() {
    return {}
  },
  methods: {
    ...commonPart
  }
}
</script>
<style lang="less" scoped>
.node-groups-container {
  flex-grow: 1;
}
</style>
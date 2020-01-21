<template>
  <div ref="container" class="node-groups-container"  @dragover="onDragOver($event)"  @drop="onDrop($event)">
    <el-form :label-width="labelWidth" :inline="inline">
      <template v-for="(node, index) in node.children">
        <node 
          v-if="isContainer(node)"
          :key="`node${index}`"
          :node="node"
          draggable="true"
          @edit="editNode(node)"
          @delete="deleteNodeByIndex(index)" 
          class="node-container">
        </node >
        <el-form-item  v-else
          :key="`form-item${index}`"
          :prop="node.prop"
          :label="getItemLabel(node)">
          <node 
            :node="node"
            draggable="true"
            @edit="editNode(node)"
            @delete="deleteNodeByIndex(index)" 
            class="node-container">
          </node >
        </el-form-item>
      </template>
    </el-form>    
  </div>
</template>

<script>
  import operator from '../../util/node-common-part-code.js'
  import manager from '../../util/node-manager.js'
  export default {
    name: 'my-form-node',
    props: ['node'],
    data () {
      return {}
    },
    computed: {
      labelWidth () {
        return `${this.node.labelWidth || 80}px`
      },
      inline () {
        return Boolean(this.node.inline)
      }
    },
    methods: {
      ...operator,
      getItemLabel (node) {
        const show = [16].indexOf(node.componentType) === -1
        return show ? node.label : ''
      },
      isContainer (node) {
        return manager.isContainer(node)
      }
    }
  }
</script>
<style lang="less" scoped>
  .node-groups-container{
    flex-grow: 1;
  }
</style>
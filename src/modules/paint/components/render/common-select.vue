<template>
  <component v-bind:is="currentComponent"
    v-if="update"
    v-model="data" 
    :data="node.data"
    :url="node.url"
    :multiple="node.multiple" 
    :label-field="node.labelField" 
    :value-field="node.valueField" 
    @change="onChange"
    @updateData="updateData">
  </component>
</template>

<script>
import simpleSelect from '@/modules/component-library/components/common/simple-select'
import simpleSelect1 from '@/modules/component-library/components/common/simple-select1'
import transferInput from '@/modules/component-library/components/common/simple-transfer-input'
export default {
  name: 'common-select-node',
  props: ['node'],
  data () {
    return {
      update: true,
      data: this.getInitData()
    }
  },
  computed: {
    currentComponent () {
      let component = null
      switch (this.node.componentType) {
        case 23:
          component = simpleSelect
          break
        case 24:
          component = simpleSelect1
          break
        case 25:
          component = transferInput
          break
        default:
          component = simpleSelect
          break
      }
      return component
    }
  },
  watch: {
    node: {
      handler () {
        this.refresh()
      },
      deep: true
    }
  },
  methods: {
    getInitData () {
      return this.node.multiple ? [] : ''
    },
    onChange (value) {
      // eslint-disable-next-line
      console.log('change=' + value)
    },
    // 强制刷新组件
    refresh () {
      // this.update = false
      // this.$nextTick(() => {
      //   this.update = true
      // })
    },
    updateData(data) {
      this.$store.dispatch('updateNode', {data})
    }
  }
}
</script>
<style>
</style>
<template>
  <component :is="currentComponent"></component>
</template>

<script>
import BaseConfig from './base-config'
import PieConfig from './pie-config'
export default {
  components: {BaseConfig, PieConfig},
  data () {
    return {
    }
  },
  computed: {
    node () {
      return this.$store.state.property.currentNode || {}
    },
    currentComponent () {
      let component = null
      switch (this.node.componentType) {
        case 52:
          component = PieConfig
          break
        default:
          component = BaseConfig
          break
      }
      return component
    }
  }
}
</script>
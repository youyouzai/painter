<template>
   <simple-table :options="node" :showHeader="node.showHeader" :border="node.border"></simple-table>
</template>

<script>
import simpleTable from '@/modules/component-library/components/common/simple-table'
export default {
  components: { simpleTable },
  props: ['node'],
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>




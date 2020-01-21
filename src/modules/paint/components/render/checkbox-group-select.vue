<template>
  <common-select :node="node"></common-select>
</template>

<script>
import commonSelect from './common-select'
export default {
  name: 'checkbox-group-select-node',
  components: { commonSelect },
  props: ['node']
}
</script>
<style>
</style>
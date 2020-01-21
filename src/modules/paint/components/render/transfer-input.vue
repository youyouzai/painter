<template>
  <common-select :node="node"></common-select>
</template>

<script>
import commonSelect from './common-select'
export default {
  name: 'transfer-input',
  components: { commonSelect },
  props: ['node']
}
</script>
<style>
</style>
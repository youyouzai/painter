<template>
  <common-sheet :show-prop="false" :types="types"></common-sheet>
</template>

<script>
import commonSheet from './common/common-sheet'
export default {
  name: 'button-sheet',
  components: { commonSheet },
  data () {
    return {
      types: ['primary', 'success', 'info', 'default', 'warning', 'danger']
    }
  }
}
</script>
<style lang="less" scoped>

</style>
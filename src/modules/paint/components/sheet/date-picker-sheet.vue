<template>
  <common-sheet :types="types"></common-sheet>
</template>

<script>
import commonSheet from './common/common-sheet'
export default {
  name: 'date-picker-sheet',
  components: { commonSheet },
  data () {
    return {
      types: ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'dates', 'week', 'monthrange']
    }
  }
}
</script>
<style lang="less" scoped>

</style>
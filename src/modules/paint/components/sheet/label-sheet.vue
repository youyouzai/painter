<template>
  <div>
    <common-sheet :show-prop="false"></common-sheet>
    <style-part></style-part>
  </div>
</template>

<script>
import commonSheet from './common/common-sheet'
import stylePart from './common/style-part'
export default {
  name: 'label-sheet',
  components: { commonSheet, stylePart },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
</style>
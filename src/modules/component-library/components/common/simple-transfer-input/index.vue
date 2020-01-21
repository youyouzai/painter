<template>
  <div>
    <el-input v-model="text" placeholder="请选择" @focus="onInputClick" />
    <simple-transfer-dialog
      ref="dialog"
      v-bind="$attrs"
      v-model="selectValue"
      @confirm="onConfirm"
      @updateData="updateData"
    ></simple-transfer-dialog>
  </div>
</template>

<script>
import SimpleTransferDialog from '../simple-transfer-dialog'

export default {
  components: {
    SimpleTransferDialog
  },
  props: ['value'],
  data() {
    return {
      selectValue: []
    }
  },
  watch: {
    value(val) {
      this.selectValue = [...val]
    },
    url() {
      this.init()
    }
  },
  computed: {
    text() {
      return this.selectValue && this.selectValue.join(',')
    }
  },
  mounted() {
    this.selectValue = [...this.value]
  },
  methods: {
    onInputClick() {
      this.$refs.dialog.show()
    },
    onConfirm(value) {
      this.$emit('input', value)
    },
    updateData(data) {
      this.$emit('updateData', data)
    }
  }
}
</script>
<style>
</style>
<template>
  <el-input v-bind="$attrs" @change="debounceInput" />
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    debounceInput(value) {
      if (this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('input', value)
      }, 300)
    }
  }
}
</script>
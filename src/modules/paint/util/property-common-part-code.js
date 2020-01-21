export default {
  computed: {
    node () {
      return this.$store.state.property.currentNode || {}
    }
  },
  watch: {
    node: {
      handler (val) {
        this.form = {...val}
      },
      deep: true
    },
    form: {
      handler () {
        this.updateNode()
      },
      deep: true
    }
  },
  mounted () {
    this.form = {...this.node}
  },
  methods: {
    updateNode () {
      this.$store.dispatch('updateNode', this.form)
    }
  }
}

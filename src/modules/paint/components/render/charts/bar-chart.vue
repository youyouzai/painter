<template>
  <base-chart ref="chart" :node="node"></base-chart>
</template>

<script>
import baseChart from './base-chart'

export default {
  name: 'bar-chart-node',
  components: { baseChart: baseChart },
  props: ['node']
}
</script>
<style>
</style>
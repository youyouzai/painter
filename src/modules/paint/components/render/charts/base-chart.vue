<template>
  <div :id="elementId" :options="options" style="height: 300px; min-width: 400px"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'base-chart-node',
  props: ['node'],
  data() {
    return {
      update: false,
      options: {},
      echarts: null
    }
  },
  computed: {
    elementId() {
      return `${this.node.id}_${this.type}_chart`
    },
    type() {
      let type = ''
      switch (this.node.componentType) {
        case 51:
          type = 'line'
          break
        case 52:
          type = 'pie'
          break
        case 53:
          type = 'bar'
          break
      }
      return type
    },
    defaultOptions() {
      let options = {
        title: {
          text: this.node.label,
          x: 'center'
        }
      }
      switch (this.type) {
        case 'line':
        case 'bar':
          options = {
            ...options,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '30',
              containLabel: true
            },
            yAxis: {
              type: 'value'
            },
            tooltip: {
              trigger: 'axis'
            }
          }
          break
        case 'pie':
          options = {
            ...options,
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            }
          }
          break
      }
      return options
    }
  },
  watch: {
    node: {
      handler() {
        this.initOptions()
      },
      deep: true
    },
    // eslint-disable-next-line
    ['$store.state.property.showPropertySheet']() {
      this.echarts.resize()
    }
  },
  mounted() {
    this.echarts = echarts.init(document.getElementById(this.elementId))
    this.initOptions()
  },
  methods: {
    initOptions() {
      if (!this.node.data || !this.node.series) return
      // 初始化options
      const result = {
        ...this.defaultOptions,
        xAxis: this.initXAsis(),
        legend: {
          bottom: 0,
          data: this.initLegend()
        },
        series: this.initSeries()
      }
      this.options = result
      this.echarts.setOption(result)
    },
    initLegend() {
      const legendData = []
      this.node.series.forEach(serie => {
        legendData.push(serie.labelField)
      })
      return legendData
    },
    initXAsis() {
      if (!this.node.xAxisField) return
      const xAxisData = []
      this.node.data.forEach(item => {
        xAxisData.push(item[this.node.xAxisField])
      })
      return { data: xAxisData }
    },
    initSeries() {
      let series = []
      switch (this.type) {
        case 'line':
        case 'bar':
          series = this.initLineAndBarSeries()
          break
        case 'pie':
          series = this.initPieSeries()
          break
      }
      return series
    },
    initPieSeries() {
      const seriesData = []
      let nodeData = this.node.data
      if (!nodeData || !nodeData.length) return
      nodeData = nodeData[0]
      this.node.series.forEach(serie => {
        seriesData.push({
          name: serie.labelField,
          value: nodeData[serie.valueField]
        })
      })
      return [
        {
          type: 'pie',
          data: seriesData
        }
      ]
    },
    initLineAndBarSeries() {
      const series = []
      this.node.series.forEach(serie => {
        const serieData = []
        this.node.data.forEach(item => {
          serieData.push(item[serie.valueField])
        })
        series.push({
          type: serie.type || this.type,
          name: serie.labelField,
          stack: serie.stack,
          barMaxWidth: 40,
          data: serieData
        })
      })
      return series
    }
  }
}
</script>
<style>
</style>
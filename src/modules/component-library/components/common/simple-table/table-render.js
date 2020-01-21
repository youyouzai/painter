import Vue from 'vue'
(function () {
  function createElementByType (h, options, row) {
    if (options.render) {
      return options.render.call(null, h, row, options)
    }
    let value = row[options.prop]
    value = options.formatter ? options.formatter(row) : value
    return h('span', value)
  }
  Vue.component('simple-table-render', {
    render: function (createElement) {
      return createElementByType(createElement, this.options, this.row)
    },
    props: ['options', 'row']
  })
})()


const tableColumnTypes = [
  {label: '--', value: ''},
  {label: '复选框', value: 'selection'},
  {label: '图片', value: 'img'},
  {label: '图标', value: 'icon'},
  {label: '链接', value: 'anchor'},
  {label: '按钮', value: 'buttons'}
]
function isContainer (node) {
  return [0, 1, 2].indexOf(node.componentType) > -1
}
function getReact ($el) {
  let width = $el.width() + parseInt($el.css('padding-left')) + parseInt($el.css('padding-right')) + parseInt($el.css('margin-left')) + parseInt($el.css('margin-right'))
  let height = $el.height() + parseInt($el.css('padding-top')) + parseInt($el.css('padding-bottom')) + parseInt($el.css('margin-top')) + parseInt($el.css('margin-bottom'))
  return {
    width,
    height
  }
}
export default {
  tableColumnTypes,
  isContainer,
  getReact
}

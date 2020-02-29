 /* eslint-disable */
let count = 0
const nodeNameMap = {
  // 顶级容器
  0: '根组件',
  1: '面板容器',
  2: '弹出框容器',
  // 容器
  6: '容器',
  7: '水平布局',
  8: '垂直布局',
  // 基础组件
  11: '表单',
  12: '表格',
  13: 'select',
  14: 'input',
  15: 'date',
  16: 'button',
  17: 'label',
  18: 'breadcrumb',
  101: 'tree',
  102: 'tag',
  103: 'upload',
  104: 'switch',
  105: 'card',
  106: 'messageBox',
  107: 'tooltip',
  // 自定义组件
  21: 'my-form',
  24: 'checkbox-group-select',
  25: 'transfer-input',
  31: 'tab组',
  32: 'tab内容',
  41: '页面组',
  42: '弹出框',
  43: '单个页面',
  // 图表
  51: '折线图',
  52: '饼状图',
  53: '柱状图'
}
export function getEmptyNode(componentType, parent) {
  const typeName = nodeNameMap[componentType]
  const id = count++
  const node = {
    id,
    componentType,
    typeName,
    label: `component${id}`,
    children: [],
    data: [],
    parent: parent,
    style: {
      borderStyle: '',
      borderColor: '',
      borderWidth: '',
      backgroundColor: '',
      color: ''
    }
  }
  return node
}
function getSelectDataSource() {
  return [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    }
  ]
}
export function createNode(componentType, parent) {
  const node = getEmptyNode(componentType, parent)
  let options = {}
  switch (componentType) {
    case 0:
      options = {
        label: '根组件',
        type: 'root',
        prop: 'main'
      }
      break
    case 1:
      options = {
        label: '画布组件',
        type: 'panel-node',
        prop: 'panel'
      }
      break
    case 2:
      options = {
        label: '弹出框集合',
        type: 'dialog-group',
        prop: 'dialogs'
      }
      break
    case 6:
    case 7:
    case 8:
      options = {
        style: {
          borderStyle: 'solid',
          borderColor: '#ebeef5',
          borderWidth: '1px',
          width: 'auto',
          height: 'auto',
          color: ''
        }
      }
      break
    case 11: // 表单
      options = {
        prop: 'form',
        inline: true,
        labelWidth: 80
      }
      break
    case 12: // 表格
      options = {
        prop: 'table',
        url: '',
        showPagination: true,
        showHeader: true,
        border: true,
        columns: [
          { label: '道号', prop: 'name' },
          { label: '封号', prop: 'profession' },
          { label: '四象', prop: 'flag' }
        ],
        data: [
          { name: '青龙', profession: '孟章神君', flag: '青龙为木' },
          { name: '白虎', profession: '监兵神君', flag: '白虎为金' },
          { name: '朱雀', profession: '陵光神君', flag: '玄武为水' },
          { name: '玄武', profession: '执明神君', flag: '中央黄龙为土' }
        ]
      }
      break
    case 14: // 文本框
      options = {
        label: '文本：',
        prop: 'text',
        type: 'text',
        placeholder: '请输入内容',
        clearable: false,
        showPassword: false,
        disabled: false
      }
      break
    case 15: // 日期
      options = {
        label: '日期：',
        prop: 'date',
        type: 'date'
      }
      break
    case 16: // 按钮
      options = {
        label: '查询',
        type: 'primary'
      }
      break
    case 17: // 标签
      options = {
        label: '标签'
      }
      break
    case 18: // breadcrumb
      options = {
        label: '面包屑',
        prop: 'breadcrumb',
        type: 'breadcrumb',
        data: [{ label: '首页', path: '/' }, { label: '管理页面', path: '/' }, { label: '管理列表', path: '/' }, { label: '详情页' }]
      }
      break
    case 13: // 选择框
    case 24: // checkbox-group-select
    case 25: // transfer-input
      options = {
        label: 'select',
        prop: 'select',
        url: '',
        multiple: true,
        labelField: 'label',
        valueField: 'value',
        data: getSelectDataSource()
      }
      break
    case 31: // tabs
      const children = []
      for (let i = 0; i < 3; i++) {
        const item = {
          ...getEmptyNode(0),
          label: `tab${i}`,
          name: `tab${i}`,
          componentType: 32
        }
        children.push(item)
      }
      options = {
        label: '标签页',
        prop: 'tabs',
        type: 'border-card',
        editable: false,
        tabPosition: 'top',
        stretch: false,
        children
      }
      break
    case 41: // page
      const node1 = getEmptyNode(0)
      node1.prop = node1.menuIndex = 'project'
      const node2 = getEmptyNode(0)
      node2.prop = node2.menuIndex = 'library'
      const node3 = getEmptyNode(0)
      node3.prop = node3.menuIndex = 'configuration'
      const menus = [
        { label: '无边海', index: 'sea', children: [{ label: '火阗真人', index: 'project', icon: 'el-icon-menu', nodeId: node1.id }] },
        { label: '万妖窟', index: 'library', icon: 'el-icon-s-grid', nodeId: node2.id },
        { label: '九云洞', index: 'configuration', icon: 'el-icon-s-tools', nodeId: node3.id }
      ]
      options = {
        label: '视图',
        prop: 'page',
        type: 'page',
        mode: 'vertical',
        menus,
        children: [node1, node2, node3]
      }
      break
    case 42: // dialog
      options = {
        label: '弹出框',
        prop: 'dialog',
        type: 'dialog'
      }
      break
    case 51: // echart-line
      options = {
        label: '折线图',
        prop: 'line-chart',
        type: 'line',
        url: '',
        data: [
          { value1: 34, value2: 24, time: 'Mon' },
          { value1: 34, value2: 24, time: 'Tue' },
          { value1: 34, value2: 24, time: 'Wed' },
          { value1: 24, value2: 24, time: 'Thu' }
        ],
        xAxisField: 'time',
        series: [
          {
            type: 'bar',
            labelField: '中国',
            valueField: 'value1'
          },
          {
            type: 'line',
            labelField: '美国',
            valueField: 'value2'
          }
        ]
      }
      break
    case 52: // echart-pie
      options = {
        label: '饼状图',
        prop: 'pie-chart',
        type: 'pie',
        url: '',
        data: [{ value1: 999, value2: 335, value3: 333 }],
        series: [
          {
            labelField: '不良帅',
            valueField: 'value1'
          },
          {
            labelField: '李星云',
            valueField: 'value2'
          },
          {
            labelField: '鬼王',
            valueField: 'value3'
          }
        ]
      }
      break

    case 53: // echart-bar
      options = {
        label: '柱状图',
        prop: 'bar-chart',
        type: 'bar',
        url: '',
        data: [
          { value1: 34, value2: 24, time: 'Mon' },
          { value1: 34, value2: 24, value3: 124, time: 'Tue' },
          { value1: 34, value2: 24, value3: 124, time: 'Wed' },
          { value1: 24, value2: 24, value3: 124, time: 'Thu' }
        ],
        xAxisField: 'time',
        series: [
          {
            type: 'bar',
            labelField: '邮件营销',
            valueField: 'value1',
            stack: '广告'
          },
          {
            type: 'bar',
            labelField: '联盟广告',
            valueField: 'value2',
            stack: '广告'
          },
          {
            type: 'bar',
            labelField: '视频广告',
            valueField: 'value3'
          }
        ]
      }
      break
  }
  Object.assign(node, options)
  // 初始化默认填充子元素
  initChildren(node)
  return node
}
function initChildren(node) {
  switch (node.componentType) {
    case 11: // 表单
      const input = createNode(14, node)
      input.label = '搜索'
      const confirmBtn = createNode(16, node)
      confirmBtn.label = '筛选'
      confirmBtn.type = 'primary'
      const cancelBtn = createNode(16, node)
      cancelBtn.label = '取消筛选'
      confirmBtn.type = 'danger'
      node.children = [input, confirmBtn, cancelBtn]
      break
  }
}
export function deleteNode(node) {
  if (!node.parent || !node.parent.children) return
  const index = node.parent.children.findIndex(item => {
    return item.id === node.id
  })
  node.parent.children.splice(index, 1)
}

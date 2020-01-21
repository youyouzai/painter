export default {
  state: {
    rootNode: null, // 画布的根组件
    showPropertySheet: false,
    showColumnConfigDialog: false,
    showTableDataDialog: false,
    showChartConfigDialog: false,
    currentNode: null,
    dialogsMap: {}
  },
  mutations: {
    SHOW_PROPERTY_SHEET (state, data) {
      state.showPropertySheet = true
      state.currentNode = data
    },
    HIDE_PROPERTY_SHEET (state) {
      state.showPropertySheet = false
    },
    UPDATE_NODE (state, data) {
      if (!state.currentNode) {
        state.currentNode = data
      } else {
        Object.assign(state.currentNode, data)
      }
    },
    SET_NODE (state, data) {
      state.currentNode = data
    },
    // 显示和隐藏列表项配置窗口
    SHOW_COLUMN_CONFIG_DIALOG (state) {
      state.showColumnConfigDialog = true
    },
    HIDE_COLUMN_CONFIG_DIALOG (state) {
      state.showColumnConfigDialog = false
    },
    // 显示和隐藏列表数据配置窗口
    SHOW_TABLE_DATA_DIALOG (state) {
      state.showTableDataDialog = true
    },
    HIDE_TABLE_DATA_DIALOG (state) {
      state.showTableDataDialog = false
    },
    // 显示和隐藏图表配置窗口
    SHOW_CHART_CONFIG_DIALOG (state) {
      state.showChartConfigDialog = true
    },
    HIDE_CHART_CONFIG_DIALOG (state) {
      state.showChartConfigDialog = false
    },
    // 管理弹出框数组
    ADD_DIALOG(state, vueComponent) {
      state.dialogsMap[vueComponent.node.id] = vueComponent
      state.dialogsMap = {...state.dialogsMap}
    },
    DELETE_DIALOG(state, id) {
      delete state.dialogsMap[id]
      state.dialogsMap = {...state.dialogsMap}
    },
    // 根组件
    SET_ROOT_NODE(state, node) {
      state.rootNode = node
    }
  },
  actions: {
    showPropertySheet ({ commit }, node) {
      commit('SHOW_PROPERTY_SHEET', node)
    },
    hidePropertySheet ({ commit }) {
      commit('HIDE_PROPERTY_SHEET')
    },
    updateNode ({ commit }, data) {
      commit('UPDATE_NODE', data)
    },
    setNode ({ commit }, data) {
      commit('SET_NODE', data)
    },
    // 显示和隐藏列表项配置窗口
    showColumnConfigDialog ({ commit }) {
      commit('SHOW_COLUMN_CONFIG_DIALOG')
    },
    hideColumnConfigDialog ({ commit }) {
      commit('HIDE_COLUMN_CONFIG_DIALOG')
    },
    // 显示和隐藏列表数据配置窗口
    showTableDataDialog ({ commit }) {
      commit('SHOW_TABLE_DATA_DIALOG')
    },
    hideTableDataDialog ({ commit }) {
      commit('HIDE_TABLE_DATA_DIALOG')
    },
    // 显示和隐藏图表配置窗口
    showChartConfigDialog ({ commit }) {
      commit('SHOW_CHART_CONFIG_DIALOG')
    },
    hideChartConfigDialog ({ commit }) {
      commit('HIDE_CHART_CONFIG_DIALOG')
    },
    // 管理弹出框数组
    addDialog({ commit }, vueComponent) {
      commit('ADD_DIALOG', vueComponent)
    },
    deleteDialog({ commit }, id) {
      commit('DELETE_DIALOG', id)
    },
    // 根组件
    setRootNode({ commit }, node) {
      commit('SET_ROOT_NODE', node)
    }
  }
}

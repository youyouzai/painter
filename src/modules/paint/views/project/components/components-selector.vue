<template>
  <div>
    <el-collapse v-model="activeItem">
      <el-collapse-item 
        v-for="(group, index) in groups"
        :key="`group${index}`"
        :title="group.title"
        :name="index"
      >
        <template v-for="(item, index1) in group.items">
          <div 
            :key="`group${index}-item${index1}`" 
            draggable 
            @dragstart="onDragStart($event, item)"
            class="item" >
            <span 
              v-if="item.icon" 
              :title="item.label" 
              class="item-span" >
              <i :class="{[item.icon]: true}"></i>
            </span>
            <el-tag 
              v-else  
              class="item-tag" >
              {{ item.label }} 
            </el-tag>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      activeItem: [0, 1, 2, 3],
      groups: [
        { title: '容器',
          items: [
            {label: '垂直布局', type: 6, icon: 'el-icon-tickets'},
            {label: '水平布局', type: 7, icon: 'el-icon-c-scale-to-original'},
            {label: 'page', type: 41},
            {label: 'dialog', type: 42},
            {label: 'tabs', type: 31}
          ]},
        { title: '基础组件',
          items: [
            {label: '表单', type: 11},
            {label: '表格', type: 12},
            {label: 'breadcrumb', type: 18},
            {label: 'select', type: 13},
            {label: 'input', type: 14},
            {label: 'date', type: 15},
            {label: 'button', type: 16},
            {label: 'label', type: 17}
          ]
        },
        { title: '自定义组件',
          items: [
            {label: 'checkbox-group-select', type: 24},
            {label: 'transfer-input', type: 25}
          ]
        },
        { title: '图表',
          items: [
            {label: 'line', type: 51},
            {label: 'pie', type: 52},
            {label: 'bar', type: 53}
          ]
        }
      ]
    }
  },
  methods: {
    onDragStart (event, item) {
      // 交互
      $('.node-container').removeClass('active')
      // this.$store.dispatch('hidePropertySheet')
      // 数据处理
      event.dataTransfer.setData('operateType', 'add')
      event.dataTransfer.setData('type', item.type)
    }
  }
}
</script>
<style lang="less" scoped>
  .container{
    .item{
      display: inline-block;
      margin: 5px;
      cursor: pointer;
      .item-span{
        background-color: #ecf5ff;
        border-color: #d9ecff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409EFF;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
      }
    }
  }
  
</style>
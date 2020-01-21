<template>
  <div class="page-container" :style="pageStyle">
    <div class="l-left" :style="menuStyle">
      <section>
        <el-menu
          :default-active="activeItem"
          :default-openeds="defaultOpendMenus"
          :mode="node.mode"
          class="u-menu"
          @select="onMenuSelect"
        >
          <template v-for="(menu, index) in node.menus">
            <el-submenu v-if="menu.children" :key="`submenu${index}`" :index="menu.index">
              <template slot="title">
                <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                <span slot="title">{{ menu.label }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(submenu, index) in menu.children"
                  :key="`submenu-item${index}`"
                  :index="submenu.index"
                >
                  <i class="el-icon-reading" :class="{ [submenu.icon]: true}"></i>
                  <span slot="title">{{ submenu.label }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-if="!menu.children" :key="`menu-item${index}`" :index="menu.index">
              <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
              <span slot="title">{{ menu.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </section>
    </div>
    <div class="l-main">
      <container
        v-for="(child, index) in this.node.children"
        v-show="child.menuIndex === activeItem"
        :key="index"
        :node="child"
        class="content-container"
      ></container>
    </div>
  </div>
</template>

<script>
import container from './container'
import commonPart from '../util/node-common-part-code.js'
export default {
  name: 'pages-node',
  components: { container },
  props: ['node'],
  data() {
    return {
      isCollapse: false,
      activeItem: 'project',
      defaultOpendMenus: ['sea']
    }
  },
  computed: {
    isRow() {
      return this.node.mode === 'vertical'
    },
    pageStyle() {
      return {
        'flex-direction': this.isRow ? 'row' : 'column'
      }
    },
    menuStyle() {
      return {
        'flex-basis': this.isRow ? '200px' : '70px'
      }
    }
  },
  methods: {
    ...commonPart,
    onMenuSelect(index) {
      this.activeItem = index
    }
  }
}
</script>
<style lang="less" scoped>
.page-container {
  display: flex;
  height: 100%;
  min-height: 600px;

  .l-left {    
    flex-basis: 200px;
    position: relative;
    border-right: solid 1px #ecf5ff;
  }
  .l-main {
    position: relative;
    display: flex;
    flex: 1;
    padding-top: 0;
    overflow: auto;

    .content-container {
      margin: 0;
      padding: 10px 15px;
      box-sizing: border-box;
    }
    .content-container:hover,
    .content-container.active {
      border-color: #409eff;
    }
  }
}
</style>
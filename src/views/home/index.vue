<template>
  <div class="container">
    <!-- <div class="l-left">
      <header class="header">
        <el-button type="primary" icon="el-icon-plus">新建项目</el-button>
      </header>
      <section>
        <el-menu 
          :collapse="isCollapse"
          :default-active="activeItem" 
          class="u-menu" 
          @open="handleOpen" 
          @close="handleClose" >
          <template v-for="(menu, index) in menus">
              <el-submenu v-if="menu.children" :key="`submenu${index}`" index="">
                <template slot="title">
                  <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                  <span slot="title">{{ menu.label }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(submenu, index) in menu.children" :key="`submenu-item${index}`" :index="submenu.url">
                    <i class="el-icon-reading" :class="{ [submenu.icon]: true}"></i>
                    <span slot="title">{{ submenu.label }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item v-if="!menu.children" :key="`menu-item${index}`" :index="menu.url">
                <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                <span slot="title">{{ menu.label }}</span>
              </el-menu-item>
          </template>
        </el-menu>
      </section>
    </div> -->
    <div class="l-main">
      <router-view />
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isCollapse: false,
        activeItem: '/project',
        menus: [
          {label: '我的项目',
            children: [
              {label: '项目1', url: '/project', icon: 'el-icon-menu'}
            ]},
          {label: '组件库', url: '/library', icon: 'el-icon-s-grid'},
          {label: '工程配置', url: '/configuration', icon: 'el-icon-s-tools'}
        ]
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        // eslint-disable-next-line
        console.log(key, keyPath) 
      },
      handleClose (key, keyPath) {
        // eslint-disable-next-line
        console.log(key, keyPath) 
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    height: 100%;
    .l-left{
      flex-basis: 150px;
      border-right: solid 1px #e6e6e6;
      .header{
        padding: 10px 10px 10px 25px;
      }
      .u-menu{
        border-right: none;
      }
    }
    .l-main{
      flex: 1;
      padding: 10px;
    }
    .u-menu:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  
</style>
<template>
            <div v-loading="loading">
                <div class="container">
            <div class="page-container" >
            <div class="l-left" >
            <section>
                <el-menu
                :default-active="activeName"
                :default-openeds="[]"
                class="u-menu"
                @select="onMenuSelect"
                >
                <template v-for="(menu, index) in menus">
                    <el-submenu v-if="menu.children" :key="'menu-item' + index" :index="menu.index">
                    <template slot="title">
                        <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                        <span slot="title">{{ menu.label }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                        v-for="(submenu, index) in menu.children"
                        :key="'submenu-item' + index"
                        :index="submenu.index"
                        >
                        <i class="el-icon-reading" :class="{ [submenu.icon]: true}"></i>
                        <span slot="title">{{ submenu.label }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-if="!menu.children" :key="'submenu-item' + index" :index="menu.index">
                    <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                    <span slot="title">{{ menu.label }}</span>
                    </el-menu-item>
                </template>
                </el-menu>
            </section>
            </div>
            <div class="l-main">
                <router-view></router-view>
            </div>
        </div>
        
        </div><div class="container">
            
        </div>
            </div>
        </template>
        <script>
             
            export default {
                components: {
                    
                },
                props: {
                    
                },
                data() {
                    return {loading:false,activeName:'sea',menus:[{children:[{icon:'el-icon-menu',index:'project',label:'火阗真人',nodeId:4}],index:'sea',label:'无边海'},{icon:'el-icon-s-grid',index:'library',label:'万妖窟',nodeId:5},{icon:'el-icon-s-tools',index:'configuration',label:'九云洞',nodeId:6}]}
                },
                computed: {
                    
                },
                mounted(){
                    
                },
                methods: {
                    
            onMenuSelect(index) {
                this.activeName = index
                this.$router.push({name: index})
            },
        
                }
            }
        </script>
        <style lang="less">
        </style>
<template>
            <div v-loading="loading">
                <div class="form-container">
            <el-form ref="form" inline :model="form" >
                <el-form-item  label="搜索" prop="text">
            <el-input v-model="form.text" ></el-input>
        </el-form-item><el-form-item   >
            <el-button  type="primary">筛选</el-button>
        </el-form-item><el-form-item   >
            <el-button  type="primary">取消筛选</el-button>
        </el-form-item>
                <el-form-item>
                
                
                </el-form-item>
            </el-form>
        </div><div class="table-container">
            <el-table :data="tableDataSource"   >
                <el-table-column  prop="name" label="道号" >
            
        </el-table-column><el-table-column  prop="profession" label="封号" >
            
        </el-table-column><el-table-column  prop="flag" label="四象" >
            
        </el-table-column>
            </el-table>
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
                    return {loading:false,form:{text:''},tableDataSource:[{flag:'青龙为木',name:'青龙',profession:'孟章神君'},{flag:'白虎为金',name:'白虎',profession:'监兵神君'},{flag:'玄武为水',name:'朱雀',profession:'陵光神君'},{flag:'中央黄龙为土',name:'玄武',profession:'执明神君'}]}
                },
                computed: {
                    
                },
                mounted(){
                    
                },
                methods: {
                    
                }
            }
        </script>
        <style lang="less">
        </style>
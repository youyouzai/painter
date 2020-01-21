<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in node.data" :key="index">
      <a :href="item.path">{{item.label}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb-node',
  props: ['node'],
  data() {
    return {}
  },
  methods: {}
}
</script>
<style>
</style>
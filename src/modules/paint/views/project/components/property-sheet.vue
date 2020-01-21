<template>
  <div class="property-sheet-container" v-show="show">
    <header class="header">
        {{ `属性框-${node.typeName}` }}
        <i class="close-btn el-icon-circle-close"  @click="hide()"></i>
    </header>
    <section class="main">
      <property></property>
    </section>
    <footer class="footer">
        <el-button type="primary" @click="hide()">关闭</el-button>
    </footer>
  </div>
</template>

<script>
import property from '../../../components/node-sheet'
export default {
  components: { property },
  data () {
    return {}
  },
  computed: {
    property () {
      return this.$store.state.property
    },
    show () {
      return this.property.showPropertySheet
    },
    node () {
      return this.property.currentNode || {}
    }
  },
  methods: {
    hide () {
      this.$store.dispatch('hidePropertySheet')
    }
  }
}
</script>
<style lang="less" scoped>
.property-sheet-container{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  background-color: #fdfdfd;
  border:solid 1px #e4e4e4;
  .header{
    position: relative;
    padding: 10px 15px 6px 15px;
    font-weight: bold;
    background-color: #ebeef5;

    .close-btn{
      float: right;
      font-size: 24px;
      color: #409EFF;
      cursor: pointer;
    }
  }
  .main{
    flex: 1;
    padding: 10px 15px;
  }
  .footer{
    padding: 10px 15px;
    text-align: right;
  }
}
</style>
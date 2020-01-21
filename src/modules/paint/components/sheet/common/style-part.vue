<template>
  <div class="item-container">
    <div class="title">样式</div>
    <el-form ref="form" size="mini" label-width="70px" class="form">
      <el-form-item label="宽&高：">
        <el-input v-model="node.style.width" class="item"></el-input>
        <el-input v-model="node.style.height" class="item"></el-input>
      </el-form-item>
      <el-form-item label="字体：">
        <el-color-picker v-model="node.style.color" show-alpha :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="背景：">
        <el-color-picker
          v-model="node.style.backgroundColor"
          show-alpha
          :predefine="predefineColors"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框：">
        <el-select v-model="node.style.borderStyle" class="item border-width-item" placeholder="样式">
          <el-option v-for="item in borderStyles" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-color-picker
          v-model="node.style.borderColor"
          show-alpha
          :predefine="predefineColors"
          class="item color-item"
        ></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'style-part-sheet',
  props: {},
  data() {
    return {
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      borderStyles: ['solid', 'none']
    }
  },
  computed: {
    node() {
      return this.$store.state.property.currentNode || {style: {}}
    }
  }
}
</script>
<style lang="less" scoped>
.form{
  padding: 10px;
  border: solid 1px #f8f8f8;
  border-top: none;
}
.item {
  display: inline-block;
  width: 80px;
  line-height: 30px;
  vertical-align: middle;
}
.color-item {
  width: auto;
}
.border-width-item {
  width: 120px;
}
</style>
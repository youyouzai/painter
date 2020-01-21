<template>
    <el-transfer
        v-model="selectValue"
        filterable
        :left-default-checked="leftSelectedValue"
        :right-default-checked="rightSelectedValue"
        :titles="titles"
        :button-texts="['', '']"
        :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
        }"
        @change="onChange"
        :data="list"
        class="simple-transfer">
    </el-transfer>
</template>

<script>
import {getList, getDataSourceByUrl } from '../../../util/util'

export default {
    props: {
        url: {
            default: ''
        },
        data: {
            default: ()=> []
        },
        titles: {
            default: () => [' ', ' ']
        },
        labelField: {
            type: String,
            default: 'label'
        },
        valueField: {
            type: String,
            default: 'value'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        dataField: {
            type: String,
            default: ''
        },
        value: {
            default: ()=> []
        },
    },
    data() {
        return {
            dataSource: [],
            selectValue: [],
            leftSelectedValue: [],
            rightSelectedValue: []
        }
    },
    computed: {
        list() {
            const arr =  getList(this.dataSource, this.labelField, this.valueField);
            JSON.stringify('arr=' + JSON.stringify(arr))
            return arr
        }
    },
    watch: {
        value(val) {
            this.selectValue = [...val]
        },
        data(val) {
            console.log('data=' + JSON.stringify(val))
            this.dataSource = [...val];
        },
        url() {
            this.init()
        }
    },
    mounted() {
      this.selectValue = [...this.value]
      this.dataSource = [...this.data];
      this.init();
    },
    methods: {
        async init(params) {
            const dataSource = await getDataSourceByUrl(this, params);
            this.dataSource = dataSource;
            this.$emit('updateData', dataSource)
        },
        onChange() {
            this.$emit('input', this.selectValue)
        }
    }
}

</script>
<style scoped>
.simple-transfer{
    width: 100%;
    text-align: left; 
}
</style>
<style lang="less">
.simple-transfer {
    display: flex;
    .el-transfer-panel{
        flex: 1;
    }
    .el-transfer__buttons{
        flex-basis: auto;
        align-self: center;
    }
    .el-transfer-panel__body{
        height: 100%;
        max-height: 500px;
    }
    .el-transfer-panel__list.is-filterable{
        height: calc(100% - 102px);
    }
    .el-transfer-panel__item{
        display: block;
    }
    .el-transfer-panel__filter .el-input__inner{
            border-radius: 4px;
    }
    .el-transfer-panel__header .el-checkbox__label{
        height: 16px;
    }
}
</style>

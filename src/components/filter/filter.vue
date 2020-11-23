<template>
  <div class="filter-container">
    <el-row>
      <el-form :inline="true" class="content">
        <el-col :span="14" class="filter-left">
          <el-form-item v-for="(filter, idx) in filters" :key="idx" :label="filter.cnName" label-width="120px">
            <el-input v-if="!filter.type || filter.type ==='input'" v-model="keyWords[idx].value" :style="'width:' + (filters[idx].width?filters[idx].width: 150) + 'px;'" size="mini" clearable />
            <el-date-picker v-if="filter.type==='date'" v-model="keyWords[idx].value" style="width:150px;" size="mini" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
            <el-select v-if="filter.type==='select'" v-model="keyWords[idx].value" size="mini" style="width:150px;" clearable placeholder="请选择">
              <el-option v-for="(option,index) in filter.options" :key="index" :value="option.value" :label="option.label" style="text-align:center;" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="filter-right">
          <el-form-item>
            <el-button
              v-for="(btn, idx) in btns"
              :key="idx"
              :icon="btn.icon==='add'? 'el-icon-circle-plus-outline' : 'el-icon-search'"
              :style="'width:'+ (btn.name.length>4 ||btn.icon) ? (btn.name.length + 1) * 20: 80 + 'px;'"
              size="mini"
              type="primary"
              @click="handleClick"
            >{{ btn.name }}</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import utils from '../../utils/utils'

const INCLUDECONTENT = ['查询', '解析', '新增', '文件签名']
const EXCLUDECONTENT = ['注册']
export default {
  name: 'FilterSearch',
  props: {
    filters: {
      type: Array,
      default() {
        return []
      }
    },
    btns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      keyWords: [{
        key: '',
        value: ''
      }]
    }
  },
  created() {
    this._getFiltersList()
  },
  methods: {
    handleClick(event) {
      for (let i = 0; i < this.btns.length; i++) {
        if (this.btns[i].name === event.target.innerText) {
          if (INCLUDECONTENT.includes(event.target.innerText)) {
            let searchBody = '{'
            for (let j = 0; j < this.keyWords.length; j++) {
              searchBody += '"' + this.keyWords[j].key + '":"' + utils.trimStr(this.keyWords[j].value) + '",'
            }
            searchBody = searchBody.slice(0, -1)
            searchBody += '}'
            const btnFunction = this.btns[i].click
            this.$emit(btnFunction, JSON.parse(searchBody))
            break
          }
          if (EXCLUDECONTENT.includes(event.target.innerText)) {
            const btnFunction = this.btns[i].click
            this.$emit(btnFunction)
            break
          }
        }
      }
    },
    _getFiltersList() {
      this.keyWords = []
      for (let i = 0; i < this.filters.length; i++) {
        this.keyWords.push({
          key: this.filters[i].enName,
          value: ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container{
  border-bottom: 1px solid #e8eaec;
  margin-bottom: 10px;
  padding-bottom: 10px;
  .content{
    width: 100%;
    .filter-left{
      display: inline-block;
      /*max-width: 840px;*/
      .el-form-item {
        padding-bottom: 10px;
        margin-bottom: 0;
        >>>.el-form-item__label {
          color: #909399;
        }
      }
    }
    .filter-right{
      display: inline-block;
      /*width: calc(100% - 840px);*/
    }
  }
}
</style>

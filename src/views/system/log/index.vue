<template>
  <div class="parse-container">
    <el-card class="card">
      <div class="parse-condition">
        <filter-list :filters="filters" :btns="btns" @search="searchBth" />
      </div>
      <div v-if="list" class="parse-result">
        <list :list="list" :first-index="firstIndex" />
        <div v-if="pageShow" style="text-align:center;padding-top:1rem;">
          <domain-pagination :page-count="totalPage" :total-count="totalCount" @pageCurrentChange="pageCurrentChange" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import FilterList from '../../../components/filter/filter'
import DomainPagination from '../../../components/pagination'
import List from './list'
import { dataMixin } from '../../../assets/mixins/mixins'

export default {
  name: 'Index',
  inject: ['reload'],
  components: {
    List,
    FilterList,
    DomainPagination
  },
  mixins: [dataMixin],
  methods: {
    _getInit (params = this.params) {
      this.params.count = 10
    },
    _setFilters () {
      this.filters = [{
        enName: 'customName',
        cnName: '操作人员',
        type: 'input'
      }, {
        enName: 'operationName',
        cnName: '功能模块',
        type: 'input'
      }, {
        enName: 'operationTime',
        cnName: '操作日期',
        type: 'date'
      }, {
        enName: 'operationResult',
        cnName: '操作结果',
        type: 'select',
        options: [
          {
            value: '成功',
            label: '成功'
          },
          {
            value: '失败',
            label: '失败'
          }
        ]
      }]
    },
    _getButtonList () {
      this.btns = [
        {
          type: 'success',
          click: 'search',
          name: '查询',
          icon: 'search'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

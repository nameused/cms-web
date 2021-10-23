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
import {getSyslogList} from '../../../api/syslog'
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
      getSyslogList(params).then((res) => {
        if (res.code === 200) {
          const result = res.data.list
          const resultList = []
          for (let i = 0; i < result.length; i++) {
            const resultMap = {
              'id': result[i].id,
              'operator': result[i].operator,
              'operateType': result[i].operateType,
              'operateContent': result[i].operateContent,
              'operateResult': result[i].operateResult,
              'operateTime': result[i].operateTime,
              'remark': result[i].remark
            }
            resultList.push(resultMap)
          }
          this.list = resultList
          this.totalCount = res.data.total
          this.totalPage = res.data.totalPage
        } else {
          this.$message({
            message: '获取数据失败' + res.message,
            type: 'error'
          })
        }
      })
    },
    _setFilters () {
      this.filters = [{
        enName: 'operator',
        cnName: '操作人',
        type: 'input'
      }, {
        enName: 'operateType',
        cnName: '操作类型',
        type: 'input'
      }, {
        enName: 'operateTime',
        cnName: '操作日期',
        type: 'date'
      }, {
        enName: 'operateResult',
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

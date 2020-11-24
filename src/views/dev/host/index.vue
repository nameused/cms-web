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
import {getAllHost} from '../../../api/dev'
export default {
  name: 'Index',
  components: {
    List,
    FilterList,
    DomainPagination
  },
  mixins: [dataMixin],
  methods: {
    _getInit (params = this.params) {
      this.params.count = 10
      getAllHost(params).then((res) => {
        if (res.code === 200) {
          const result = res.data.list
          const resultList = []
          for (let i = 0; i < result.length; i++) {
            const resultMap = {
              'id': result[i].id,
              'hostName': result[i].hostName,
              'hostAddress': result[i].hostAddress,
              'hostDes': result[i].hostDes,
              'createTime': result[i].createTime
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
        enName: 'customName',
        cnName: '主机名称',
        type: 'input'
      }, {
        enName: 'operationName',
        cnName: '主机地址',
        type: 'input'
      }, {
        enName: 'operationTime',
        cnName: '创建时间',
        type: 'date'
      }, {
        enName: 'hostDes',
        cnName: '用途描述',
        type: 'input'
      } ]
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

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
import {getDevList} from '../../../api/host'
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
      getDevList(params).then((res) => {
        if (res.code === 200) {
          const result = res.data.list
          const resultList = []
          for (let i = 0; i < result.length; i++) {
            const resultMap = {
              'id': result[i].id,
              'deviceName': result[i].deviceName,
              'deviceAddress': result[i].deviceAddress,
              'deviceDes': result[i].deviceDes,
              'rootPassword': result[i].rootPassword,
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
        enName: 'deviceName',
        cnName: '设备名称',
        type: 'input'
      }, {
        enName: 'deviceAddress',
        cnName: '设备地址',
        type: 'input'
      }, {
        enName: 'createTime',
        cnName: '录入时间',
        type: 'date'
      }, {
        enName: 'deviceDes',
        cnName: '设备用途',
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

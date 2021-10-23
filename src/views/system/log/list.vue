<template>
  <div class="log-container">
    <div></div>
    <el-table ref="logslist" v-loading="loading" :data="list" size="mini" border stripe highlight-current-row>
      <el-table-column :index="firstIndex" type="index" label="序号" align="center" width="60" fixed="left" />
      <el-table-column prop="operator" label="操作人" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operateType" label="操作类型" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operateContent" label="操作内容" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operateResult" label="操作结果" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operateTime" label="操作时间" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="remark" label="操作详情" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="detailStatus" :destroy-on-close="true" title="日志详情" center width="40%">
      <detail :detail="selectData" :label-info="labelData" />
    </el-dialog>
  </div>
</template>

<script>
import Detail from '../../../components/detail/detail'
import { listMixin } from '../../../assets/mixins/mixins'

export default {
  name: 'LogList',
  components: {
    Detail
  },
  mixins: [listMixin],
  methods: {
    handleDetail (data) {
      this.detailStatus = true
      this.selectData = data
      this.labelData = [{
        key: 'operator',
        value: '操作人'
      }, {
        key: 'operateType',
        value: '功能模块'
      }, {
        key: 'operateResult',
        value: '操作结果'
      }, {
        key: 'operateTime',
        value: '操作时间'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

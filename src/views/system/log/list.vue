<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 区块链密码与安全服务平台
  @author 潘世成
  @date 2020/7/8
  @company Dingxuan
-->
<template>
  <div class="log-container">
    <div></div>
    <el-table ref="logslist" v-loading="loading" :data="list" size="mini" border stripe highlight-current-row>
      <el-table-column :index="firstIndex" type="index" label="序号" align="center" width="60" fixed="left" />
      <el-table-column prop="operator" label="操作人员" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operationName" label="功能模块" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operationResult" label="操作结果" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="operationTime" label="操作时间" show-overflow-tooltip align="center" min-width="150" />
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
        value: '操作人员'
      }, {
        key: 'operationName',
        value: '功能模块'
      }, {
        key: 'operationResult',
        value: '操作结果'
      }, {
        key: 'operationTime',
        value: '日志状态'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

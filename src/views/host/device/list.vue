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
      <el-table-column prop="id" label="序号" align="center" width="60" fixed="left" />
      <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="deviceAddress" label="设备地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="rootPassword" label="root密码" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="deviceDes" label="设备用途" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="createTime" label="录入时间" show-overflow-tooltip align="center" min-width="150" />
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
  name: 'deviceList',
  components: {
    Detail
  },
  mixins: [listMixin],
  methods: {
    handleDetail (data) {
      this.detailStatus = true
      this.selectData = data
      this.labelData = [{
        key: 'deviceName',
        value: '主机名称'
      }, {
        key: 'deviceAddress',
        value: '主机地址'
      }, {
        key: 'rootPassword',
        value: 'root密码'
      },
      {
        key: 'deviceDes',
        value: '功能描述'
      }, {
        key: 'createTime',
        value: '创建时间'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

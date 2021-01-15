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
      <el-table-column prop="vmName" label="vm名称" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="vmIp" label="服务地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="owner" label="负责人" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="rootPassword" label="root密码" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="url" label="服务访问地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="startMethod" label="启动方式" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="status" label="状态" show-overflow-tooltip align="center" min-width="150" />
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
  name: 'vmList',
  components: {
    Detail
  },
  mixins: [listMixin],
  methods: {
    handleDetail (data) {
      this.detailStatus = true
      this.selectData = data
      this.labelData = [{
        key: 'vmName',
        value: 'vm名称'
      }, {
        key: 'vmIp',
        value: '服务地址'
      }, {
        key: 'owner',
        value: '负责人'
      },
      {
        key: 'startMethod',
        value: '启动方式'
      }, {
        key: 'createTime',
        value: '创建时间'
      },
      {
        key: 'url',
        value: '服务访问地址'
      },
      {
        key: 'insidePort',
        value: '内部端口'
      },
      {
        key: 'internetPort',
        value: '外网端口'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

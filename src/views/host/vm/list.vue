<template>
  <div class="log-container">
    <div></div>
    <el-table ref="logslist" v-loading="loading" :data="list" size="mini" border stripe highlight-current-row>
      <el-table-column prop="id" label="序号" align="center" width="60" fixed="left" />
      <el-table-column prop="vmName" label="名称" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="vmIp" label="IP地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="rootPassword" label="root密码" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="owner" label="负责人" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="insidePort" label="内网端口" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="outsidePort" label="外网端口" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="insideUrl" label="内网访问地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="outsideUrl" label="外网访问地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="startMethod" label="服务启动方式" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="startStatus" label="启用状态" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="isDevice" label="是否为设备" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="hostIp" label="宿主机IP" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="createTime" label="录入时间" show-overflow-tooltip align="center" min-width="150" >
        <template slot-scope='scope'>
          <span>{{scope.row.createTime | dataFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" show-overflow-tooltip align="center" min-width="150" />
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
import moment from 'moment'
import { listMixin } from '../../../assets/mixins/mixins'
export default {
  name: 'vmList',
  components: {
    Detail
  },
  mixins: [listMixin],
  methods: {
    handleDetail (data) {
      data.createTime = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
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
        value: '内网端口'
      },
      {
        key: 'outsidePort',
        value: '外网端口'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

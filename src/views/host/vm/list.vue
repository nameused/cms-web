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
      <el-table-column label="操作"  fixed="right"  width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="primary"  @click="open(scope.row)">删除</el-button>
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
import {deleteVm} from '../../../api/host'
export default {
  inject: ['reload'],
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
        value: '名称'
      },
      {
        key: 'vmIp',
        value: 'IP地址'
      },
      {
        key: 'owner',
        value: '负责人'
      },
      {
        key: 'rootPassword',
        value: 'root密码'
      },
      {
        key: 'insideUrl',
        value: '内网访问地址'
      },
      {
        key: 'outsideUrl',
        value: '外网访问地址'
      },
      {
        key: 'startMethod',
        value: '服务启动方式'
      },
      {
        key: 'hostIp',
        value: '宿主机IP'
      },
      {
        key: 'createTime',
        value: '创建时间'
      },
      {
        key: 'insidePort',
        value: '内网端口'
      },
      {
        key: 'outsidePort',
        value: '外网端口'
      },
      {
        key: 'isDevice',
        value: '是否为设备'
      },
      {
        key: 'startStatus',
        value: '启用状态'
      },
      {
        key: 'note',
        value: '备注'
      }
      ]
    },
    open (data) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVm(data.id).then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.reload()
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err.message
          })
          this.loading = false
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

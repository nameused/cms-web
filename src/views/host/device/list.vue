<template>
  <div class="log-container">
    <div></div>
    <el-table ref="logslist" v-loading="loading" :data="list" size="mini" border stripe highlight-current-row>
      <el-table-column prop="id" label="序号" align="center" width="60" fixed="left" />
      <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="deviceAddress" label="设备地址" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="rootPassword" label="root密码" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="deviceDes" label="设备用途" show-overflow-tooltip align="center" min-width="150" />
      <el-table-column prop="createTime"  label="录入时间" show-overflow-tooltip align="center" min-width="150" >
      <template slot-scope='scope'>
        <span>{{scope.row.createTime | dataFormat}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="deleteData(scope.row)">删除</el-button>
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
import moment from 'moment'
import {deleteDev} from '../../../api/host'
export default {
  name: 'deviceList',
  components: {
    Detail
  },
  mixins: [listMixin],
  methods: {
    handleDetail (data) {
      data.createTime = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
      console.info()
      this.detailStatus = true
      this.selectData = data
      this.labelData = [{
        key: 'deviceName',
        value: '设备名称'
      }, {
        key: 'deviceAddress',
        value: '设备地址'
      }, {
        key: 'rootPassword',
        value: 'root密码'
      },
      {
        key: 'deviceDes',
        value: '设备用途'
      }, {
        key: 'createTime',
        value: '录入时间'
      }]
    },
    deleteData (data) {

      deleteDev(data.id).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            type: 'success',
            message: '删除设备信息成功!'
          })
          this.$emit('refresh')
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

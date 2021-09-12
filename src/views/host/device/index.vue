<template>
  <div class="parse-container">
    <el-card class="card">
      <div class="parse-condition">
        <filter-list :filters="filters" :btns="btns" @search="searchBth" @add="add" @templateDown="templateDown" @importExcel="importExcel"/>
      </div>
      <div v-if="list" class="parse-result">
        <list :list="list" :first-index="firstIndex" />
        <div v-if="pageShow" style="text-align:center;padding-top:1rem;">
          <domain-pagination :page-count="totalPage" :total-count="totalCount" @pageCurrentChange="pageCurrentChange" />
        </div>
      </div>
      <el-dialog :visible.sync="addStatus" :destroy-on-close="true" title="新增设备信息" center width="40%">
        <add v-if="addStatus" @refresh="_getInit" @closeWindows="closeWindows" />
      </el-dialog>
      <el-dialog :visible.sync="importStatus" :destroy-on-close="true" title="导入数据" center width="40%">
        <import v-if="importStatus" @refresh="_getInit" @closeImportWindows="closeImportWindows" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import FilterList from '../../../components/filter/filter'
import DomainPagination from '../../../components/pagination'
import List from './list'
import Add from './add'
import Import from './import'
import { dataMixin } from '../../../assets/mixins/mixins'
import {getDevList, downloadDeviceFile} from '../../../api/host'
export default {
  name: 'Index',
  components: {
    Add,
    Import,
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
          icon: 'el-icon-search'
        },
        {
          type: 'success',
          click: 'add',
          name: '新增',
          icon: 'el-icon-circle-plus-outline'
        },
        {
          type: 'success',
          click: 'templateDown',
          name: '模板下载',
          icon: 'el-icon-download'
        },
        {
          type: 'success',
          click: 'importExcel',
          name: '批量导入',
          icon: 'el-icon-upload2'
        }
      ]
    },
    templateDown () {
      downloadDeviceFile().then(res => {
        alert(11111)
        if (!res.data) {
          this.$Message.error('下载内容为空')
          return
        }
        // let url = window.URL.createObjectURL(new Blob([res.data]))
        // let link = document.createElement('a')
        // link.style.display = 'none'
        // link.href = url
        // link.setAttribute('download', 'device_template.xlsx')
        //
        // document.body.appendChild(link)
        // link.click()
        // // 释放URL对象所占资源
        // window.URL.revokeObjectURL(url)
        // // 用完即删
        // document.body.removeChild(link)

        let data = res.data
        alert(data)
        if (!data) {
          return
        }
        console.log(res)
        // 构造a标签 通过a标签来下载
        let url = window.URL.createObjectURL(new Blob([data]), {
          type: 'application/vnd.ms-excel;charset=utf-8'
        })
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        // 此处的download是a标签的内容，固定写法，不是后台api接口
        a.setAttribute('download', 'device_template.xlsx')
        document.body.appendChild(a)
        // 点击下载
        a.click()
        // 下载完成移除元素
        document.body.removeChild(a)
        // 释放掉blob对象
        window.URL.revokeObjectURL(url)
      }).catch(err => {
        this.$message({
          message: '文件下载失败!' + err.message,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

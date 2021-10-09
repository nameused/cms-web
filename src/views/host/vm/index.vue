<template>
  <div class="parse-container">
    <el-card class="card">
      <div class="parse-condition">
        <filter-list :filters="filters" :btns="btns" @search="searchBth" @templateDown="templateDown" @add="add"  />
      </div>
      <div v-if="list" class="parse-result">
        <list :list="list" :first-index="firstIndex"/>
        <div v-if="pageShow" style="text-align:center;padding-top:1rem;">
          <domain-pagination :page-count="totalPage" :total-count="totalCount" @pageCurrentChange="pageCurrentChange"/>
        </div>
      </div>
      <el-dialog :visible.sync="addStatus" :destroy-on-close="true" title="新增虚拟机" center width="40%">
        <add v-if="addStatus" @refresh="_getInit" @closeWindows="closeWindows" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import FilterList from '../../../components/filter/filter'
import DomainPagination from '../../../components/pagination'
import List from './list'
import Add from './add'
import {dataMixin} from '../../../assets/mixins/mixins'
import {downloadVmFile, getVmList} from '../../../api/host'

export default {
  name: 'Index',
  components: {
    Add,
    List,
    FilterList,
    DomainPagination
  },
  mixins: [dataMixin],
  methods: {
    _getInit (params = this.params) {
      this.params.count = 10
      getVmList(params).then((res) => {
        if (res.code === 200) {
          const result = res.data.list
          this.list = result
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
        enName: 'vmName',
        cnName: '名称',
        type: 'input'
      }, {
        enName: 'vmIp',
        cnName: '服务地址',
        type: 'input'
      }, {
        enName: 'createTime',
        cnName: '录入时间',
        type: 'date'
      }, {
        enName: 'owner',
        cnName: '负责人',
        type: 'input'
      }]
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
      downloadVmFile().then(res => {
        if (!res) {
          this.$message.error('下载内容为空')
          return
        }
        // 构造a标签 通过a标签来下载
        let url = window.URL.createObjectURL(new Blob([res]))
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        // 此处的download是a标签的内容，固定写法，不是后台api接口
        a.setAttribute('download', 'vm_template.xlsx')
        document.body.appendChild(a)
        // 点击下载
        a.click()
        // 下载完成移除元素
        document.body.removeChild(a)
        // 释放掉blob对象
        window.URL.revokeObjectURL(url)
      }).catch(err => {
        console.info(err)
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

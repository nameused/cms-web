export const listMixin = {
  data () {
    return {
      loading: false,
      detailStatus: false,
      updateStatus: false,
      addStatus: false,
      selectData: [],
      labelData: []
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    firstIndex: {
      type: Number,
      default () {
        return 1
      }
    }
  },

  methods: {
    closeWindow () {
      this.updateStatus = false
      this.addStatus = false
    },
    handleUpdate (data) {
      this.selectData = data
      this.updateStatus = true
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
export const dataMixin = {

  data () {
    return {
      params: {
        page: 0,
        count: 10
      },
      filters: [],
      btns: [],
      list: [],
      pageShow: true,
      addStatus: false,
      importStatus: false,
      totalPage: 1,
      totalCount: 0,
      firstIndex: 1
    }
  },
  created () {
    this._setFilters()
    this._getButtonList()
  },

  mounted () {
    this._getInit()
  },
  methods: {
    add () {
      this.addStatus = true
    },
    importExcel () {
      this.importStatus = true
    },
    closeWindows () {
      this.addStatus = false
    },
    closeImportWindows () {
      this.importStatus = false
    },
    searchBth (data) {
      if (data === undefined || data === null) {
        return
      }
      this.params = data
      this.params.page = 0
      this.totalPage = 1
      this._getInit(this.params)
    },

    pageCurrentChange (page) {
      this.params.page = page - 1
      if (page === 1) {
        this.firstIndex = 1
      } else {
        const startIndex = (page - 1) * 10
        this.firstIndex = startIndex + 1
      }
      this._getInit(this.params)
    },
    refresh () {
      this._getInit()
    }
  }
}

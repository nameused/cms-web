<template>
  <div class="page-container">
    <el-pagination
      :page-count="totalPage"
      :total="totalCount"
      background
      layout="total,  prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    totalPage: {
      type: Number,
      default () {
        return 1
      }
    },
    totalCount: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (num) {
      this.$emit('pageSizeChange', num)
    },
    handleCurrentChange (num) {
      this.$emit('pageCurrentChange', num)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 15px;
    margin-bottom: -10px;
  }
</style>

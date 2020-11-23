<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 区块链密码与安全服务平台
  @author 潘世成
  @date 2020/7/7
  @company Dingxuan
-->
<template>
  <div class="detail-container">
    <el-form v-for="item in labelInfo" ref="detailDetail" :key="item.key" class="detail-form" :model="detail" label-width="100px">
      <el-form-item :label="item.value + ':'" style="text-align: justify; text-justify: newspaper; word-break: break-all;">
        <span v-if="detail[item.key]">{{ detail[item.key] }}</span>
        <span v-else> -- </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    labelInfo: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dialog {
    border-radius: 5px;
    .el-dialog__header {
      background: #f2f2f2;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
</style>

<template>
<div class="container-importExcel">
  <el-upload
    class="upload-demo"
    drag
    action=""
    multiple
    :before-upload="beforeAvatarUpload"
    :auto-upload="false"
    :limit="1"
    accept=".xlsx, .xls"  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过10MB</div>
  </el-upload>

  <div align="center" style="margin-top: 20px;">
    <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
    <el-button  type="primary" @click="importDeviceExcel()" size="small">确定</el-button>
  </div>
</div>

</template>
<script>
import { importDeviceExcel } from '../../../api/host'
export default{
  name: 'import',
  // data () {
  //
  // },
  methods: {
    /** 文件预上传格式限制 */
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xlsx'
      if (!extension) {
        this.$message({
          message: '上传文件只能是.xlsx格式!',
          type: 'error'
        })
      }
      return extension
    }
    // importDeviceExcel () {
    //
    // }
  }

}
</script>
<style lang="scss" scoped>
.container-importExcel {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

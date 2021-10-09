<template>
<div class="container-importExcel">
  <el-form :model="form">
  <el-upload
    class="upload-demo"
    drag
    ref="upload"
    action=""
    multiple
    :auto-upload="false"
    :before-upload="beforeAvatarUpload"
    :http-request="submit"
    :limit="1"
    :file-list="fileList"
    accept=".xlsx, .xls"  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过10MB</div>
  </el-upload>
  </el-form>
  <div align="center" style="margin-top: 20px;">
    <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
    <el-button  type="primary" @click="uploadFile" size="small">确定</el-button>
  </div>
</div>

</template>
<script>
import {importDeviceExcel} from '../../../api/host'
export default {
  name: 'import',

  data () {
    return {
      form: {
        file: ''
      },
      fileList: []
    }
  },
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
    },

    uploadFile () {
      this.$refs.upload.submit()
    },

    submit (params) {
      // 如果要自定义submit的话el-upload需要加上:http-request="submit"
      console.log(params)
      const form = new FormData()
      form.append('file', params.file)
      importDeviceExcel(form).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            type: 'success',
            message: '导入数据成功!'
          })
          this.$emit('closeImportWindows')
          this.$emit('refresh')
        } else {
          this.loading = false
          this.formData = new window.FormData()
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
        this.$emit('closeImportWindows')
      })
    }
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

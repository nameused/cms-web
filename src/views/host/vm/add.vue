<template>
  <div>
    <div class="add-container">
      <el-form :model="registerForm" size="small" label-width="200px" inline>
        <el-form-item  prop="vmName" label="虚拟机名称">
          <el-input
            v-model="registerForm.vmName"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="虚拟机名称"
            @input="e => registerForm.vmName "
          />
        </el-form-item>
        <el-form-item  prop="vmIp" label="虚拟机IP">
          <el-input
            v-model="registerForm.vmIp"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="虚拟机IP"
            @input="e => registerForm.vmIp "
          />
        </el-form-item>
        <el-form-item  prop="owner" label="责任人">
          <el-input
            v-model="registerForm.owner"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="责任人"
            @input="e => registerForm.owner "
          />
        </el-form-item>
        <el-form-item  prop="rootPassword" label="root密码">
          <el-input
            v-model="registerForm.rootPassword"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="root密码"
            @input="e => registerForm.rootPassword "
          />
        </el-form-item>
        <el-form-item  prop="insidePort" label="内网端口">
          <el-input
            v-model="registerForm.insidePort"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="内网端口"
            @input="e => registerForm.insidePort "
          />
        </el-form-item>
        <el-form-item prop="internetPort" label="外网端口">
        <el-input
          v-model="registerForm.internetPort"
          maxlength="40"
          style="width:200px;"
          auto-complete="off"
          placeholder="外网端口"
          @input="e => registerForm.internetPort"
        />
      </el-form-item>
        <el-form-item  prop="url" label="外网访问地址">
        <el-input
          v-model="registerForm.url"
          maxlength="40"
          style="width:200px;"
          auto-complete="off"
          placeholder="外网访问地址"
          @input="e => registerForm.url "
        />
      </el-form-item>
        <el-form-item  prop="startMethod" label="启动方式">
          <el-input
            v-model="registerForm.startMethod"
            maxlength="40"
            style="width:200px;"
            auto-complete="off"
            placeholder="启动方式"
            @input="e => registerForm.startMethod"
          />
        </el-form-item>
      </el-form>
      <div align="center">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="add('registerForm')" size="small">新 增</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { addVm } from '../../../api/host'
export default {
  name: 'VmAdd',
  data () {
    return {
      loading: false,
      registerForm: {
        vmName: '',
        vmIp: '',
        owner: '',
        rootPassword: '',
        insidePort: '',
        internetPort: '',
        url: '',
        startMethod: ''
      }
    }
  },
  methods: {
    add () {
      const params = {
        vmName: this.registerForm.vmName,
        vmIp: this.registerForm.vmIp,
        owner: this.registerForm.owner,
        rootPassword: this.registerForm.rootPassword,
        insidePort: this.registerForm.insidePort,
        internetPort: this.registerForm.internetPort,
        url: this.registerForm.url,
        startMethod: this.registerForm.startMethod
      }
      addVm(params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            type: 'success',
            message: '新增虚拟机成功!'
          })
          this.$emit('closeWindows')
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
        this.$emit('closeWindows')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-addUser {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

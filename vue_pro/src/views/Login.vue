<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="loginForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from '../api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'LoginPage',
  setup () {
    const router = useRouter()
    const loginForm = ref({
      username: '',
      password: ''
    })

    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }

    const form = ref(null)

    const submitForm = () => {
      form.value.validate(valid => {
        if (valid) {
          axios.post('/api/login/', loginForm.value).then(res => {
            const { access } = res
            ElMessage({
              message: '登陆成功',
              type: 'success',
              duration: 1000
            })
            localStorage.setItem('token', access)
            setTimeout(() => {
              router.push('/')
            }, 400);
          })
        } else {
          return false
        }
      })
    }

    return {
      loginForm,
      rules,
      submitForm,
      form
    }
  }
})
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

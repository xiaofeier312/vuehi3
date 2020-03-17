<template>
  <div id='login' class='login_container'>
    <div class='login_box'>
      <div class='avator_box'>
        <img src='../assets/logo.png'/>
      </div>
      <div class="login_form">
        <el-form ref="loginFormRef" :model="form" :rules="login_from_rules">
          <el-form-item prop="username">
            <el-input  v-model="form.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="密码" type="password" prefix-icon="el-icon-goods">></el-input>
          </el-form-item>
          <el-form-item class='login_buttons'>
            <el-button type="primary" v-on:click="submitLoginForm" plain>登录</el-button>
            <el-button type="info" v-on:click="resetLoginForm" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login'

export default {
  name: 'login',
  data () {
    return {
      form: {
        'username': 'admin',
        'password': '123456'
      },
      login_from_rules: {
        // 验证用户名和密码规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    submitLoginForm () {
      let this_ = this
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(`valid: ${valid}`)
        if (valid) {
          // login(this_.form).then(
          //   res => {
          //     console.log(res)
          //     if (res === 'True') {
          //       console.log('login success')
          //     } else {
          //       console.log('res is false')
          //     }
          //   }
          // )
          const res = await login(this_.form)
          console.log(res.data)
          console.log(res.data.token)
          console.log(`--login get: ${res.data['rs']}`)
          if ((res['status'] === 200) && (res.data['rs'])) {
            console.log('--login success')
            this.$message({
              message: 'Login success!',
              type: 'success'
            })
            window.sessionStorage.setItem('token', res.data.token)
            let localSession = window.sessionStorage.getItem('token')
            console.log(`local session token: ${localSession}`)
            this.$router.push('/home')
          } else if ((res['status'] === 200) && (!res.data['rs'])) {
            console.log('--login fail')
            this.$message.error({
              message: '用户名或者密码错误!'
            })
          } else {
            this.$message.error({
              message: '网络不通!'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avator_box{
      height:130px;
      width:130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #ffffff;
      img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .login_buttons{
    display: flex;
    justify-content: flex-end;
  }
</style>

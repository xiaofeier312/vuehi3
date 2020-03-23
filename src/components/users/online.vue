<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/online">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>在职用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- <div style="margin-top: 15px;"> -->
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="queryInfo.query">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-button type="primary">添加用户</el-button>
        </el-row>
      <!-- </div> -->
    </el-card>

  </div>
</template>

<script>
import { getUserList } from '../../api/login'

export default {
  name: 'online',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getUserList(this.queryInfo)
  },
  methods: {
    getUserList() {
      const userList = getUserList(this.queryInfo)
      console.log('-- userlist')
      console.log(userList)
      return userList
    }
  }
}
</script>

<style lang="less" scoped>

</style>

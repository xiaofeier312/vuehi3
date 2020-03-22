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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="input3">
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
export default {
  name: 'online'
}
</script>

<style lang="less" scoped>

</style>

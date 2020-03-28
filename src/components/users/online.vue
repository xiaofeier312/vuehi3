<template>
  <div class="user_mange">
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
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-button type="primary">添加用户</el-button>

        <div>
          <el-table :data="pageUserList" stripe style="width: 100%;" border>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="mg_id" label="ID" width="100"></el-table-column>
            <el-table-column prop="mg_name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="mg_mobile" label="Mobile"></el-table-column>
            <el-table-column prop="role_id" label="role_id" width="100"></el-table-column>
            <el-table-column prop="mg_state" label="state" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="mg_id" label="操作"  width="200">
              <template slot-scope="scope">
                <el-tooltip  effect="dark" content="编辑" placement="top-start" :enterable="false">
                  <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                </el-tooltip>

                <el-tooltip  effect="dark" content="删除" placement="top-start" :enterable="false">
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </el-tooltip>

                <el-tooltip  effect="dark" content="权限" placement="top-start" :enterable="false">
                  <el-button type="info" icon="el-icon-message" size="mini"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        query: '1',
        pagenum: 1,
        pagesize: 10
      },
      pageUserList: []
    }
  },
  created() {
    this.getUserList(this.queryInfo)
  },
  computed: {},
  methods: {
    async getUserList() {
      const userList = await getUserList(this.queryInfo)
      console.log('-- userlist')
      console.log(userList)
      console.log(userList.data.users)
      this.pageUserList = userList.data.users
      console.log('-- this')
      console.log(this)
      return userList
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  height: 990px;
  flex-grow: 1;
}
.el-row {
  width: 1000px;
  margin: 1px;
  padding: 1px;
  height: 1px;
}
// .el-col{
//   padding: 1px;
//   margin: 5px;
//   height: 10px;
// }
</style>

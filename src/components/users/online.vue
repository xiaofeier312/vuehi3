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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" v-on:click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-button type="primary" v-on:click="dialogVisible = true">添加用户</el-button>

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
            <el-table-column prop="mg_id" label="操作" width="200">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="编辑" placement="top-start" :enterable="false">
                  <el-button
                    type="primary"
                    @click="showEditDialog(scope.row)"
                    icon="el-icon-edit"
                    size="mini"
                  ></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteUser(scope.row.id)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip effect="dark" content="权限" placement="top-start" :enterable="false">
                  <el-button type="info" icon="el-icon-message" size="mini"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="paginationblock">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 10, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-row>
    </el-card>

    <el-dialog
      title="新建用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="closeAddDialogForm"
      v-loading="loading"
    >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="mg_name">
          <el-input v-model="addForm.mg_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mg_mobile">
          <el-input v-model="addForm.mg_mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-input v-model="addForm.role_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialogForm">重置</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" v-loading="loading">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="mg_name">
          <el-input v-model="editForm.mg_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mg_mobile">
          <el-input v-model="editForm.mg_mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-input v-model="editForm.role_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addEditUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { getUserListUtil, addUserUtil, editUserUtil, deleteUserUtil } from '../../api/login'

export default {
  name: 'online',
  data() {
    var checkMobile = (rule, value, cb) => {
      const valueStr = value.toString()
      if (valueStr.indexOf('1') === 0) {
        console.log('--手机开头是1')
        return cb()
      }
      cb(new Error('手机开头并不是1'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      pageUserList: [],
      total: 0,
      allPageNums: 0,
      dialogVisible: false,
      editDialogVisible: false,
      addForm: {
        mg_name: '',
        mg_mobile: '',
        role_id: '',
        mg_state: 1
      },
      editForm: {
        mg_name: '',
        mg_mobile: '',
        role_id: '',
        mg_state: 1
      },
      addFormRules: {
        mg_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度3~11', trigger: 'blur' }
        ],
        mg_mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度11', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormRules: {
        mg_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度3~11', trigger: 'blur' }
        ],
        mg_mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度11', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created() {
    this.getUserList(this.queryInfo)
  },
  computed: {},
  methods: {
    async getUserList() {
      const userList = await getUserListUtil(this.queryInfo)
      console.log('-- userlist')
      console.log(userList)
      this.pageUserList = userList.data.users
      console.log('-- this')
      console.log(this)
      this.total = userList.data.all_num
      this.allPageNums = userList.data.page_nums
      return userList
    },
    handleSizeChange(newSize) {
      console.log('--this.queryInfo.pagesize:')
      this.queryInfo.pagesize = newSize
      console.log(this.queryInfo.pagesize)
      this.getUserList()
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUserList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeAddDialogForm() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        this.loading = true
        console.log('信息验证2:')
        console.log(valid)
        if (valid) {
          this.loading = true
          try {
            const rs = await addUserUtil(this.addForm)
            console.log(' -- add user result:')
            console.log(rs)
            if (rs.status === 200) {
              this.dialogVisible = false
              this.$message({
                message: '创建成功',
                type: 'success'
              })
            } else {
              this.$message.error(rs)
            }
          } catch (err) {
            console.log(err)
            this.loading = false
            this.$message.error('添加失败: ' + err)
          }
        }
        this.loading = false
      })
    },
    showEditDialog(scopeRow) {
      console.log('--showEditDialog')
      this.editForm.mg_id = scopeRow.mg_id
      this.editForm.mg_name = scopeRow.mg_name
      this.editForm.mg_mobile = scopeRow.mg_mobile
      this.editForm.role_id = scopeRow.role_id
      this.editForm.mg_state = scopeRow.mg_state
      this.editDialogVisible = true
    },
    addEditUser() {
      this.$refs.editFormRef.validate(async valid => {
        this.loading = true
        console.log('信息验证2:')
        console.log(valid)
        if (valid) {
          this.loading = true
          try {
            const rs = await editUserUtil(this.editForm)
            console.log(' -- add edit user result:')
            console.log(rs)
            if (rs.status === 200) {
              this.editDialogVisible = false
              this.loading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.loading = false
              this.$message.error(rs)
            }
          } catch (err) {
            console.log(err)
            this.loading = false
            this.$message.error('更新失败: ' + err)
          }
        }
        this.loading = false
      })
    },
    async deleteUser(userId) {
      const rs = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          return 'confirm'
        })
        .catch(() => {
          return 'cancel'
        })
      console.log(rs)
      if (rs === 'confirm') {
        const rsDelete = deleteUserUtil(userId)
        console.log(rsDelete)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
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
.paginationblock {
  margin-left: 10%;
  margin-top: 15px;
}
</style>

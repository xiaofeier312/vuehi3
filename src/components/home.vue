<template>
  <div id="home">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/homeicon.png" width="30" height="30" />
          <span>管理系统</span>
        </div>
        <div>
          <el-button class="logoutclass" v-on:click="logout" type="info">退出</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            text-color="#fff"
            default-active="1"
            background-color="#333744"
            class="el-menu-vertical-demo"
          >
            <el-submenu
            v-for="item in homeMenuList"
            :key="item.id"
            :index="item.id+''">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>  {{ item.name }} </span>
              </template>
              <el-menu-item v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.id+''">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>Main</el-main>
          <el-footer>Copyright 2021.</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenuListUtil } from '../api/login'
export default {
  name: 'home',
  data() {
    return {
      homeMenuList: []
    }
  },
  async created() {
    this.homeMenuList = await this.getMenuList()
    console.log('--create():')
    console.log(this.homeMenuList)
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login/')
    },
    async getMenuList() {
      const menuRs = await getMenuListUtil()
      const {data: res} = menuRs
      console.log('----getMenuList() res:')
      console.log(res.menu_list)
      // if (res.rs !== true) {
      //   console.log('--get res fail')
      //   return this.$message.error(res)
      // }
      return res.menu_list
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      color: #b3c0d1;
    }
  }
}

.logoutclass {
  text-align: right;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #213744;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  color: #fff;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

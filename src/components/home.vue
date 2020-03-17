<template>
  <div id="home">
    <h3>Home</h3>
    <el-button v-on:click="logout" type="info">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      test: 'd'
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login/')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

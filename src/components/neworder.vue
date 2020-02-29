<template>
  <div id="createorder">
    <div>
      <span>info: {{ mobile }} </span>
    </div>
    <div>
      mobile: <el-input type="text" v-model.number="mobile" placeholder="mobile" maxlength=11 clearable=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createorder',
  data () {
    return {
      mobile: null
    }
  }
}
</script>

<style>
#createorder {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

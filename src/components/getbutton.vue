<template>
  <div class="getbutton">
    <span>{{ string }}</span><br/>
    <el-button v-on:click="changedisplay">Change display</el-button>
    <div v-if="isdisplay">
      <el-button v-on:click="clickmethod" >click {{ buttonInfo }} times</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getbutton',
  data () {
    return {
      string: 'nihao',
      isdisplay: true,
      buttonInfo: 0
    }
  },
  methods: {
    clickmethod: function () {
      this.buttonInfo++
    },
    changedisplay: function () {
      this.isdisplay = !this.isdisplay
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

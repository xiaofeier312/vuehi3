<template>
  <div class="hi">
    <h1>{{ msg }}</h1>
    <h2>ETeest Links</h2>
    <getbutton></getbutton>
  </div>
</template>

<script>
import getbutton from './getbutton'
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Tsts App'
    }
  },
  components: {
    getbutton
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

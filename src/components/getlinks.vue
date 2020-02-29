<template>
    <div id="getlinks">
        <ul>
            <li v-for="url in urls" :key="url.url">
                <a v-bind:href="url.url">{{ url.url }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'getlinks',
  data () {
    return {
      urls: [
        {url: '/hi'},
        {url: '/getbutton'},
        {url: '/getimage'},
        {url: '/inputprice'}
      ]
    }
  }
}
</script>

<style>
#getlinks {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

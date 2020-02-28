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
        {url: '/hi1'},
        {url: '/getbutton'},
        {url: '/getimage'}
      ]
    }
  }
}
</script>

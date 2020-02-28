<template>
    <div>
        <div>
            <img v-bind:src="imageUrl"/>
        </div>
        <div>
            <button v-on:click="changeImage">Change image</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'getimage',
  data () {
    return {
      imageUrl: 'http://img.wxcha.com/file/202002/28/d902f38585.jpeg'
    }
  },
  methods: {
    changeImage: function () {
      this.imageUrl = 'http://img.wxcha.com/file/202002/28/b2cbed2f13.jpeg'
    }
  }
}
</script>

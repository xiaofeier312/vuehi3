<template>
    <div id='getimage'>
        <div>
            <img v-bind:src="imageUrl"/>
        </div>
        <div>
            <button v-on:click="changeImage">Change image</button>
        </div>
        <div>
          <getbutton></getbutton>
        </div>
    </div>
</template>

<script>
import getbutton from './getbutton'

export default {
  name: 'getimage',
  data () {
    return {
      imageUrl: 'http://img.wxcha.com/file/202002/28/d902f38585.jpeg',
      father_msg1: 'thisismsg1',
      msg2: 'this is msg2'
    }
  },
  methods: {
    changeImage: function () {
      this.imageUrl = 'http://img.wxcha.com/file/202002/28/b2cbed2f13.jpeg'
    }
  },
  components: {
    getbutton
  }
}
</script>

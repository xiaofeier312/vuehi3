<template>
    <div id="inputprice">
        {{ displayprices }}
    </div>
</template>

<script>
export default {
  name: 'inputprice',
  data () {
    return {
      prices: 1.1,
      object1: {
        price: 10
      },
      object2: {
        price: 12
      }
    }
  },
  computed: {
    displayprices: function () {
      var rs = 0;
      rs = this.object1.price + this.object2.price + this.prices;
      return rs;
    }
  }
}
</script>

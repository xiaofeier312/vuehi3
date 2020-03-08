<template>
  <div id="orderinfo">
    <div>
      <h3>输入订单信息</h3>
      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content ">手机号*</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <el-input
                type="number"
                v-model.number="orderobject.mobile"
                oninput="if(value.length>11)value=value.slice(0,11)"
                clearable
                placeholder="mobile"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content">产品*</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ">
              <el-select v-model="orderobject.itemid" placeholder="请选择">
                <el-option
                  v-for="item in item_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content ">渠道*</div></el-col>
          <el-col :span="7"><div class="grid-content ">
            <el-radio-group @change="chooseMall()" v-model="orderobject.channelradio">
              <el-radio-button label="3">商城</el-radio-button>
              <el-radio-button label="6">分校</el-radio-button>
              <el-radio-button label="9">备选项</el-radio-button>
            </el-radio-group>
            </div></el-col>
        </el-row>
      </div>

      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content ">优惠券金额</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">
            <el-input
                type="number"
                v-model.number="orderobject.coupon"
                oninput="if(value.length>11)value=value.slice(0,5)"
                clearable
                placeholder="0"
              />
            </div></el-col>
        </el-row>
      </div>

      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content ">支付订单</div></el-col>
          <el-col :span="6"><div class="grid-content ">
              <el-switch
                style="display: block"
                v-model="orderobject.ispay"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="下单支付"
                inactive-text="下单不支付">
              </el-switch>
            </div></el-col>
        </el-row>
      </div>
      
      <div class="part">
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content ">支付方式</div></el-col>
          <el-col :span="15"><div class="grid-content ">
            <el-radio-group v-bind:disabled="!orderobject.ispay" v-model="orderobject.payradio">
              <el-radio v-bind:disabled="!isMallChoose" :label="3">聚合微信</el-radio>
              <el-radio v-bind:disabled="!isMallChoose" :label="6">聚合支付宝</el-radio>
              <el-radio v-bind:disabled="isMallChoose" :label="9">微信支付</el-radio>
              <el-radio v-bind:disabled="isMallChoose" :label="12">支付宝支付</el-radio>
            </el-radio-group>
            </div></el-col>
        </el-row>
      </div>

      <div class="part">
        <el-button v-on:click="submitorderinfo">创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'createorder',
  data() {
    return {
      url: '/tool/createordertool',
      isMallChoose: true, // 是否选中商城下单
      orderobject: {
        mobile: null,
        itemid: null,
        coupon: null,
        channelradio: 3,
        payradio: 3,
        ispay: true
      },
      item_options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  created: function() {
    this.orderobject.itemid = this.item_options[0].label
  },

  methods: {
    submitorderinfo: function() {
      console.log(this.orderobject.mobile)
      console.log(this.orderobject.itemid)
      console.log(this.orderobject.coupon)
      console.log('computed' + this.orderobject.channelradio)
      axios.post(this.url, this.orderobject).then(function(response) {
        console.log(response)
        alert(JSON.stringify(response.data))
      })
        .catch(function(response) {
          console.log(response)
        })
    },
    chooseMall: function() {
      console.log('chooseMall()-this.orderobject.channelradio:' + this.orderobject.channelradio)
      console.log('chooseMall()-this.orderobject.ispay:' + this.orderobject.ispay)
      if (this.orderobject.channelradio === 3) {
        this.isMallChoose = true
        console.log(this.orderobject.channelradio === 3)
      } else {
        this.isMallChoose = false
        console.log(this.orderobject.channelradio === 3)
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  #orderinfo{
    margin-left:50px;
    margin-top:2px;
  }
  .part {
    margin-left:2px;
    margin-top:2px;
    margin-bottom: 10px;
  }
</style>

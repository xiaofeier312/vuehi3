<template>
  <div id="orderinfo">
    <div>
      <h3>输入订单信息</h3>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple">手机号</div>
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
      
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple">产品</div>
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

      <el-row :gutter="10">
        <el-col :span="4"><div class="grid-content bg-purple">优惠券金额</div></el-col>
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

      <el-button v-on:click="submitorderinfo">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createorder',
  data () {
    return {
      orderobject: {
        mobile: null,
        itemid: null,
        coupon: null
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
  created: function () {
    this.orderobject.itemid = this.item_options[0].label;
  },
  methods: {
    submitorderinfo: function () {
      console.log(this.orderobject.mobile);
      console.log(this.orderobject.itemid);
      console.log(this.orderobject.coupon);
    }
  }
}
</script>

<style scoped>
width: 90%;
margin: auto;
display: flex;
flex-wrap: wrap;

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<template>
  <view class="settle-container">
    <label class="radio" @click="changeAllState">
      <radio :checked="isFullCheck" color="#c00000"></radio>
      <text>全选</text>
    </label>
    <view class="amount-box">
      合计：
      <text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>
    <view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "Settle",
  data() {
    return {}
  },
  computed: {
    ...mapGetters("cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    ...mapGetters("user", ["addstr"]),
    ...mapState("user", ["token"]),
    isFullCheck() {
      return this.checkedCount === this.total;
    },
  },
  methods: {
    ...mapMutations("cart", ["updateAllGoodsState"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck);
    },
    settlement() {
      if (!this.checkedCount) return uni.showToast({title: "请选择要结算的商品", icon: "none"});
      if (!this.addstr) return uni.showToast({title: "请选择收获地址", icon: "none"});
      if (!this.token) return uni.showToast({title: "请先登录", icon: "none"});
    },
  }
}
</script>

<style scoped lang="scss">
.settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  font-size: 14px;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount-box {
    .amount {
      color: #c00000;
      font-weight: bold;
    }
  }

  .btn-settle {
    background-color: #c00000;
    height: 50px;
    color: #ffffff;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>

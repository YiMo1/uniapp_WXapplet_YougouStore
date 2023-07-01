<template>
  <view class="goods-item" @click="goDetail">
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{ Number(goods.goods_price).toFixed(2) }}</view>
        <uni-number-box :min="1" v-if="showNum" :value="goods.goods_count" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    },
    showRadio: {
      type: Boolean,
      default: false,
    },
    showNum: {
      type: Boolean,
      default: false,
    }
  },
  name: "Goods",
  data() {
    return {}
  },
  methods: {
    goDetail() {
      this.$emit("click", this.goods);
    },
    radioClickHandler() {
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state,
      });
    },
    numChangeHandler(value) {
      this.$emit("num-change", {
        goods_id: this.goods.goods_id,
        goods_count: +value
      });
    },
  },
}
</script>

<style scoped lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 14px;
    }

    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>

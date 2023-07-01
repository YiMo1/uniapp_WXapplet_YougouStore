<template>
  <view class="cart-container" v-if="cart.length!==0">
    <Address></Address>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <uni-swipe-action-item v-for="item in cart" :key="item.goods_id" :right-options="options"
                             @click="swiperItemClickHandler(item.goods_id)">
        <Goods :goods="item" :show-radio="true" :show-num="true"
               @radio-change="radioChangeHandler" @num-change="numChangeHandler"></Goods>
      </uni-swipe-action-item>
    </uni-swipe-action>
    <settle></settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/logo.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import tabbarBadge from "@/mixins/tabbar-badge";
import {mapState, mapMutations} from "vuex";
import Goods from "@/components/goods/Goods.vue";
import Address from "@/components/address/Address.vue";
import Settle from "@/components/settle/Settle.vue";

export default {
  components: {Settle, Address, Goods},
  mixins: [tabbarBadge],
  data() {
    return {
      options: [
        {
          text: '确认',
          style: {
            backgroundColor: '#c00000'
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
  },
  methods: {
    ...mapMutations("cart", ["updateGoodsState", "updateGoodsCount", "removeGoodsById"]),
    radioChangeHandler(value) {
      this.updateGoodsState(value);
    },
    numChangeHandler(value) {
      this.updateGoodsCount(value);
    },
    swiperItemClickHandler(goodsId) {
      this.removeGoodsById(goodsId);
    },
  }
}
</script>

<style scoped lang="scss">
.cart-container {
  padding-bottom: 50px;
}

.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: #808080;
    margin-top: 15px;
  }
}
</style>

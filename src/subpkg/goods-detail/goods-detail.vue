<template>
  <view v-if="goodsInfo.goods_name" class="goods-detail-container">
    <swiper indicator-dots autoplay :interval="3000" circular>
      <swiper-item v-for="(item,index) in goodsInfo.pics" :key="item.pics_id">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="price">￥{{ goodsInfo.goods_price }}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ goodsInfo.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="grey"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
    </view>
  </view>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
  data() {
    return {
      goodsInfo: {},
      options: [
        {
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#ffffff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#ffffff'
        }
      ]
    };
  },
  computed: {
    ...mapGetters("cart", ["total"]),
  },
  methods: {
    ...mapMutations("cart", ["addToCart"]),
    async getGoodsDetail(goodsId) {
      const {data: result} = await uni.$http.get("/api/public/v1/goods/detail", {goods_id: goodsId});
      result.message.goods_introduce = result.message.goods_introduce.replace(/<img/g, "<img style='display:block'").replace(/src="[^"]*"/g,
        "src='http://image1.suning.cn/uimg/b2c/newcatentries/0070118448-000000000165989474_2_800x800.jpg'").replace(/webp/g, "jpg");
      this.goodsInfo = result.message;
    },
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goodsInfo.pics.map(item => item.pics_big),
      })
    },
    onClick(e) {
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: "/pages/cart/cart"
        })
      }
    },
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        const goods = {
          goods_id: this.goodsInfo.goods_id,
          goods_name: this.goodsInfo.goods_name,
          goods_price: this.goodsInfo.goods_price,
          goods_count: 1,
          goods_small_logo: this.goodsInfo.goods_small_logo,
          goods_state: true,
        };
        this.addToCart(goods);
      }
    },
  },
  watch: {
    total: {
      handler(newVal) {
        const findResult = this.options.find(item => item.text === "购物车");
        if (findResult) {
          findResult.info = newVal;
        }
      },
      immediate: true,
    },
  },
  onLoad(option) {
    this.getGoodsDetail(option.goods_id);
  }
}
</script>

<style scoped lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.goods-info-box {
  padding: 10px 0 10px 10px;

  .price {
    color: #c00000;
    font-size: 18px;
    padding: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      margin-right: 10px;
    }

    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color: #808080;
    }
  }

  .yf {
    font-size: 12px;
    color: #808080;
    margin: 10px 0;
  }
}

.goods-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.goods-detail-container {
  padding-bottom: 50px;
}
</style>

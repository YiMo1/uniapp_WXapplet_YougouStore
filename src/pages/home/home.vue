<template>
  <view>
    <view class="search-box">
      <Search @click="goSearch"></Search>
    </view>
    <swiper autoplay indicator-dots circular :interval="3000">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandle(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator :url="it.url" class="right-img-item" v-for="(it,i) in item.product_list" :key="i" v-if="i!==0">
              <image :src="it.image_src" :style="{width:it.image_width+'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Search from "@/components/search/Search.vue";
import tabbarBadge from "@/mixins/tabbar-badge";

export default {
  mixins: [tabbarBadge],
  components: {Search},
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
    };
  },
  methods: {
    async getSwiperList() {
      const {data: result} = await uni.$http.get("/api/public/v1/home/swiperdata");
      this.swiperList = result.message;
    },
    async getNavList() {
      const {data: result} = await uni.$http.get("/api/public/v1/home/catitems");
      this.navList = result.message;
    },
    navClickHandle({name}) {
      switch (name) {
        case "分类":
          uni.switchTab({
            url: "/pages/cate/cate"
          })
          break;
        case "秒杀拍":
          break;
        case "超市购":
          break;
        case "母婴品":
          break;
        default:
          return;
      }
    },
    async getFloorList() {
      const {data: result} = await uni.$http.get("/api/public/v1/home/floordata");
      result.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url = "/subpkg/goods-list/goods-list?" + prod.navigator_url.split("?")[1];
        })
      })
      this.floorList = result.message;
    },
    goSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search"
      })
    }
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  }
}
</script>

<style scoped lang="scss">
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  width: 100%;
  height: 60rpx;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}

.search-box {
  position: sticky;
  /* #ifdef H5 */
  top: 44px;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  top: 0;
  /* #endif */
  z-index: 99;
}
</style>

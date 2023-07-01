<template>
  <view>
    <Search @click="goSearch"></Search>
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
        <view v-for="(item,index) in cateList" :key="item.cat_id"
              :class="['left-scroll-view-item',index===active?'active':'']"
              @click="activeChange(index)">{{ item.cat_name }}
        </view>
      </scroll-view>
      <scroll-view scroll-y :style="{height:wh+'px'}" ref="rightScrollView" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="item in cateLevel" :key="item.cat_id">
          <view class="cate-lv2-title">/ {{ item.cat_name }} /</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="item2 in item.children" :key="item2.cat_id"
                  @click="goGoodsList(item2)">
              <image :src="item2.cat_icon"></image>
              <text>{{ item2.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
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
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel: [],
      scrollTop: 0,
    };
  },
  onLoad() {
    const {windowHeight} = uni.getWindowInfo();
    this.wh = windowHeight - 50;
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const {data: result} = await uni.$http.get("/api/public/v1/categories");
      this.cateList = result.message;
      this.cateLevel = result.message[0].children;
    },
    activeChange(index) {
      this.active = index;
      this.cateLevel = this.cateList[index].children;
      // #ifdef H5
      this.$refs.rightScrollView.$refs.main.scrollTop = 0;
      // #endif
      // #ifdef MP-WEIXIN
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
      // #endif
    },
    goGoodsList(item) {
      uni.navigateTo({
        url: "/subpkg/goods-list/goods-list?cid=" + item.cat_id,
      })
    },
    goSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      })
    }
  }
}
</script>

<style scoped lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid #ffffff;

      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.cate-lv2-title {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}

.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 14px;
    }
  }
}
</style>

<template>
  <view>
    <view class="goods-list">
      <Goods v-for="item in goodsList" :key="item.goods_id" :goods="item" @click="goDetail"></Goods>
    </view>
  </view>
</template>

<script>
import Goods from "@/components/goods/Goods.vue";

export default {
  components: {Goods},
  data() {
    return {
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
      },
      goodsList: [],
      total: 0,
      isLoading: false,
    };
  },
  methods: {
    async getGoodsList(callBack) {
      if (this.isLoading) return;
      this.isLoading = true;
      const {data: result} = await uni.$http.get("/api/public/v1/goods/search", this.queryObj);
      this.goodsList = [...this.goodsList, ...result.message.goods];
      this.total = result.message.total;
      this.isLoading = false;
      if (callBack) callBack();
    },
    goDetail(goods) {
      uni.navigateTo({
        url: "/subpkg/goods-detail/goods-detail?goods_id=" + goods.goods_id,
      })
    },
  },
  onLoad(option) {
    this.queryObj.query = option.query || "";
    this.queryObj.cid = option.cid || "";
    this.getGoodsList();
  },
  onReachBottom() {
    if (this.isLoading) return;
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
      return uni.showToast({
        title: "我是有底线的。",
        icon: "none",
      });
    }
    this.queryObj.pagenum++;
    this.getGoodsList();
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];
    this.getGoodsList(() => uni.stopPullDownRefresh());
  }
}
</script>

<style scoped lang="scss">

</style>

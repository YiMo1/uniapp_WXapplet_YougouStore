<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancel-button="none" placeholder="请输入搜索内容" focus></uni-search-bar>
    </view>
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="item in searchResults" :key="item.goods_id"
            @click="goDetail(item)">
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clear"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" inverted v-for="(item,index) in histories" :key="index"
                 @click="goGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timeoutId: 0,
      searchResults: [],
      historyList: [],
    };
  },
  methods: {
    input(keyword) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.getSearchList(keyword);
      }, 500);
    },
    async getSearchList(keyword) {
      if (keyword === "") {
        return this.searchResults = [];
      }
      const {data: result} = await uni.$http.get("/api/public/v1/goods/qsearch", {query: keyword})
      this.searchResults = result.message;
      this.saveHistory(keyword);
    },
    goDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods-detail/goods-detail?goods_id=" + item.goods_id
      })
    },
    saveHistory(keyword) {
      let set = new Set(this.historyList);
      set.add(keyword);
      this.historyList = Array.from(set);
      uni.setStorageSync("keyword", JSON.stringify(this.historyList));
    },
    clear() {
      this.historyList = [];
      uni.setStorageSync("keyword", "[]");
    },
    goGoodsList(keyword) {
      uni.navigateTo({
        url: "/subpkg/goods-list/goods-list?query=" + keyword
      })
    }
  },
  computed: {
    histories() {
      return [...this.historyList].reverse();
    }
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync("keyword") || "[]");
  }
}
</script>

<style scoped lang="scss">
.search-box {
  background-color: #c00000;
}

.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 14px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    uni-text {
      margin-top: 5px;
      margin-left: 5px;
      padding: 4px 10px;
    }
  }
}
</style>

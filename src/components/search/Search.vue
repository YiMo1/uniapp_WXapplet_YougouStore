<template>
  <view class="my-search-container" @click="handleClick">
    <view class="my-search-box">
      <icon type="search" size="17"></icon>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
}
</script>

<style scoped lang="scss">
.my-search-container {
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 18px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>

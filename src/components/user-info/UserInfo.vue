<template>
  <view class="userinfo-container">
    <view class="top-box">
      <image :src="userInfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{ userInfo.nickName }}</view>
    </view>
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>12</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>2</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>54</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/icons/member-active.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/icons/cart-active.png" class="icon"></image>
            <text>待收获</text>
          </view>
          <view class="panel-item">
            <image src="/static/icons/home-active.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/icons/news-active.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-list-item">
          <text>收获地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logOut">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {}
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    ...mapMutations("user", ["updateUserInfo", "updateToken", "updateAddress"]),
    async logOut() {
      const result = await uni.showModal({
        title: "提示",
        content: "确认退出登录吗？",
      });
      if (result.confirm) {
        this.updateUserInfo({});
        this.updateAddress({});
        this.updateToken("");
      }
    }
  }
}
</script>

<style scoped lang="scss">
.userinfo-container {
  height: 100%;
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #ffffff;
      box-shadow: 0 1px 5px #000000;
    }

    .nickname {
      font-size: 16px;
      color: #ffffff;
      font-weight: bold;
      margin-top: 10px;
    }
  }
}

.panel-list {
  padding: 0 10px;
  position: relative;
  top: -10px;

  .panel {
    background-color: #ffffff;
    border-radius: 3px;
    margin-bottom: 8px;

    .panel-title {
      line-height: 40px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }

    .panel-body {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;

      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        font-size: 13px;

        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}

.panel-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
  line-height: 40px;
}
</style>

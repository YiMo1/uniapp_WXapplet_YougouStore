<template>
  <view class="login-container">
    <uni-icons type="contact" size="80" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapMutations("user", ["updateUserInfo", "updateToken"]),
    getUserInfo(e) {
      if (e.detail.errMsg === "getUserInfo:ok") {
        this.updateUserInfo(e.detail.userInfo);
        this.getToken(e.detail);
      } else {
        uni.showToast({title: "授权失败", icon: "none"});
      }
    },
    async getToken(info) {
      const result = await uni.login();
      if (result.errMsg === "login:ok") {
        this.updateToken(result.code);
      } else {
        uni.showToast({title: "登录失败", icon: "none"});
      }
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.login-container {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: " ";
    display: block;
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    transform: translateY(50%);
    background-color: #ffffff;
  }

  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: #808080;
  }
}
</style>

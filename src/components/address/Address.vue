<template>
  <view>
    <view class="address-choose-box" v-if="Object.keys(address).length===0">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收获地址</button>
    </view>
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{ address.userName }}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{ address.telNumber }}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收获地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>
    <image src="/static/logo.png" class="address-border"></image>
  </view>
</template>

<script>
import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations("user", ["updateAddress"]),
    async chooseAddress() {
      let address = await uni.chooseAddress();
      this.updateAddress(address);
    },
  },
  computed: {
    ...mapState("user", ["address"]),
    ...mapGetters("user", ["addstr"]),
  }
}
</script>

<style scoped lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

.address-choose-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      justify-content: space-between;
    }
  }

  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>

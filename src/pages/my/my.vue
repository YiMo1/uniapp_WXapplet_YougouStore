<template>
  <view class="container">
    <Login v-if="!token"></Login>
    <UserInfo v-else></UserInfo>
  </view>
</template>

<script>
import tabbarBadge from "@/mixins/tabbar-badge";
import Login from "@/components/login/Login.vue";
import UserInfo from "@/components/user-info/UserInfo.vue";
import {mapState} from "vuex";

export default {
  components: {UserInfo, Login},
  mixins: [tabbarBadge],
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["token"]),
  },
}
</script>

<style scoped lang="scss">
page,
.container {
  width: 100%;
  height: 100%;
}
</style>

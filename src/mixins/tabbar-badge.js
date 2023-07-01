import {mapGetters} from "vuex";

export default {
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + "",
      })
    },
  },
  computed: {
    ...mapGetters("cart", ["total"]),
  },
  watch: {
    total() {
      this.setBadge();
    },
  },
  onShow() {
    this.setBadge();
  }
}

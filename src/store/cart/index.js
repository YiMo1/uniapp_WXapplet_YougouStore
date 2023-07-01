export default {
  namespaced: true,
  state: {
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
  },
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count++;
      } else {
        state.cart.push(goods);
      }
      this.commit("cart/saveToStorage");
    },
    saveToStorage(state) {
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    updateGoodsState(state, value) {
      const {goods_id, goods_state} = value;
      const findResult = state.cart.find(item => item.goods_id === goods_id);
      if (findResult) {
        findResult.goods_state = goods_state;
        this.commit("cart/saveToStorage");
      }
    },
    updateGoodsCount(state, value) {
      const {goods_id, goods_count} = value;
      const findResult = state.cart.find(item => item.goods_id === goods_id);
      if (findResult) {
        findResult.goods_count = goods_count;
        this.commit("cart/saveToStorage");
      }
    },
    removeGoodsById(state, goodsId) {
      state.cart = state.cart.filter(item => item.goods_id !== goodsId);
      this.commit("cart/saveToStorage");
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach(item => item.goods_state = newState);
      this.commit("cart/saveToStorage");
    },
  },
  getters: {
    total(state) {
      return state.cart.reduce((total, item) => total + item.goods_count, 0);
    },
    checkedCount(state) {
      let checkedGoods = state.cart.filter(item => item.goods_state);
      return checkedGoods.reduce((total, item) => total + item.goods_count, 0);
    },
    checkedGoodsAmount(state) {
      const checkedGoods = state.cart.filter(item => item.goods_state);
      return checkedGoods.reduce((total, item) => total + item.goods_count * item.goods_price, 0).toFixed(2);
    },
  },
}

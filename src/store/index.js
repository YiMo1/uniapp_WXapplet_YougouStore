import Vue from "vue";
import Vuex from "vuex";
import cart from "@/store/cart"
import user from "@/store/user"

Vue.use(Vuex);

const index = new Vuex.Store({
  modules: {
    cart,
    user,
  }
})

export default index;

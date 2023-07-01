import Vue from 'vue'
import App from './App'
import index from "@/store";
import './uni.promisify.adaptor'
import {$http} from '@escook/request-miniprogram';

$http.baseUrl = "https://api-hmugo-web.itheima.net";
$http.beforeRequest = () => {
  uni.showLoading({
    title: "数据加载中..."
  })
}
$http.afterRequest = () => {
  uni.hideLoading();
}
uni.$http = $http;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store: index
})
app.$mount()

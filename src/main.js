// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
window.fbAsyncInit = function () {
  FB.init({
    appId: '{540611569645359}',
    cookie: false, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.12' // use graph api version 2.8
  })
};
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.12&appId=540611569645359&autoLogAppEvents=1'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))


//todo 這函數還需要優化
Vue.prototype.setJwtToken = function (accessToken, provider) {
  var jwtToken
  var instance = axios.create({
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  var self=this;
  self.$store.state.jwtToken=12345679;
  //todo 異步處理

  // todo 已經可以傳access token 換jwt token回來了
  instance.get('http://localhost/api/login/' + provider + '/callback')
    .then(function (response) {
      jwtToken = response.data.data.token;
      Vue.cookie.set('jwtToken',jwtToken,100);
      //todo    router.go(-1)不應該放在這邊的，但嵌套異步處理的解決方式目前還沒想到
      router.go(-1);
    })
    .catch(function (error) {
      console.log(self.$store.state.jwtToken);
      console.log(error)
    })
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
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
  // todo 已經可以傳access token 換jwt token回來了
  return instance.get('http://localhost/api/login/' + provider + '/callback')
    .then(function (response) {
      jwtToken = response.data.data.token
      Vue.cookie.set('jwtToken',jwtToken,100);
    })
    .catch(function (error) {
      console.log(error)
    })
}

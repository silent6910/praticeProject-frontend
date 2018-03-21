<template>
  <div>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
    <fb-signin-button
      :params="fbSignInParams"
      @success="onFBSignInSuccess"
      @error="onFBSignInError">
      Sign in with Facebook
    </fb-signin-button>
  </div>

</template>

<script>
  //todo 這部分還有很多要優化的地方，但因為是跳躍式的方式，所以暫時會不知道要怎麼處理

  export default {
    /** 這邊是使用第三方套件的 https://github.com/phanan/vue-google-signin-button  and  https://github.com/phanan/vue-facebook-signin-button
     *  將來希望可以custom化
     */
    data () {
      return {
        googleSignInParams: {
          client_id: '841955498576-h716mura55f07q6fddt11s6ihoia13m4.apps.googleusercontent.com'
        },
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        }
      }
    },
    methods: {
      //facebook login handle
      onFBSignInSuccess (response) {
        FB.api('/me', dude => {
          let accessToken = response.authResponse.accessToken;
          this.setJwtToken(accessToken, 'facebook');
          history.back();
        })
      },
      onFBSignInError (error) {
        console.log('OH NOES', error)
      },
      //google login handle
      onSignInSuccess (googleUser) {
        //todo 下方這取得assess_token的方式不妥
        let accessToken = googleUser.Zi.access_token;

        thigs.setJwtToken(accessToken,'google');
        history.back();
      },
      onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      }
    }
  }
</script>

<style>
  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }

</style>

<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
  export default {
    data () {
      return {
        /**
         * The Auth2 parameters, as seen on
         * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
         * As the very least, a valid client_id must present.
         * @type {Object}
         */
        googleSignInParams: {
          client_id: '841955498576-h716mura55f07q6fddt11s6ihoia13m4.apps.googleusercontent.com'
        }
      }
    },
    methods: {
      onSignInSuccess (googleUser) {
        let accessToken=googleUser.Zi.access_token;
        console.log(accessToken);
        var instance = axios.create({
          headers: {'Authorization': "Bearer " + accessToken ,
            'Accept': 'application/json',
            'Content-Type': 'application/json',}
        });
        //todo 已經可以傳access token 換jwt token回來了
        instance.get('http://localhost/api/login/google/callback')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users

        // const profile = googleUser.getBasicProfile() ;// etc etc
        // console.log();
      },
      onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      }
    }
  }
</script>

<style>
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

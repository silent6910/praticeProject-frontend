<template>

</template>

<script>
    export default {
        name: "comment-list",
      props:{
        'articleId':{
          type:Number,
          required: true
        }
      },
      created(){
          this.fetchComment(this.articleId)
      },
      methods:{
          fetchComment(articleId)
          {
            console.log(articleId);

            let jwt = this.$cookie.get('jwtToken');

            if (jwt === null) {
              return;
            }
            //必須先把this存下來，否則進success，this call就不是我要的了
            var self = this;
            var instance = axios.create({
              headers: {
                'Authorization': 'Bearer ' + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
            console.log(jwt);
            // todo 已經可以確認登入了
            return instance.get('http://localhost/api/article')
              .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                  self.articles = response.data.data;
                }

              })
              .catch(function (error) {
                console.log(error)
              })
          }
      }
    }
</script>

<style scoped>

</style>

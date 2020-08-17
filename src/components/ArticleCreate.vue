<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
      <form v-on:submit.prevent="publish()" class="panel panel-default" id="publish">
        <div class="panel-body">
          <fieldset>
            <legend class="section">發表文章</legend>
            <article-type></article-type>
            <div class="form-group">
              <label for="title" class="control-label">Title</label>
              <input class="form-control" name="title" type="text" id="title">
            </div>
            <div class="form-group">
              <label for="note" class="control-label">內容</label>
              <input class="form-control" name="content" type="text" id="note">
            </div>
          </fieldset>
        </div>
        <div class="panel-footer clearfix">
          <div class="btns pull-right">
            <button class="btn btn-success">發表</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {apiURL} from "../main";

  const articleType = require('@/components/ArticleType').default;
  export default {
    name: "create-article",
    components:{
      'article-type':articleType,
    },
    methods: {
      publish() {
        let publish = new FormData(document.getElementById('publish'));
        let jwt = this.$cookie.get('jwtToken');
        var self = this;
        var instance = axios.create({
          headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        instance.post(apiURL + '/article', publish)
          .then(function (response) {
            if (response.data.code == 200) {
              //todo 沒有提示成功跟失敗，type有權限的問題
              self.$router.push({name:'index'});
            }
            else
              {
                console.log(response.data.code);
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

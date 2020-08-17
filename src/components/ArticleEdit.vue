<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
      <form v-on:submit.prevent="update()" class="panel panel-default" id="update"
            enctype="application/x-www-form-urlencoded">
        <div class="panel-body">
          <fieldset>
            <legend class="section">Edit Article</legend>
           <article-type :defaultType="article.type"></article-type>
            <div class="form-group">
              <label for="title" class="control-label">Title</label>
              <input class="form-control" v-bind:value="article.title" name="title" type="text" id="title">
            </div>
            <div class="form-group">
              <label for="note" class="control-label">content</label>
              <input class="form-control" v-bind:value="article.content" name="content" type="text" id="note">
            </div>
          </fieldset>
        </div>
        <div class="panel-footer clearfix">
          <div class="btns pull-right">
            <button class="btn btn-success">更新</button>
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
    name: "article-edit",
    components:{
      'article-type':articleType,
    },
    data() {
      return {
        type: '',
        article: []
      }
    },
    created: function () {
      this.fetchContent()
    },
    methods: {
      fetchContent() {
        let jwt = this.$cookie.get('jwtToken');

        if (jwt === null) {
          return;
        }
        var self = this;
        var instance = axios.create({
          headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        // todo 已經可以確認登入了

        return instance.get(apiURL + `/article/${this.$route.params.id}/edit`)
          .then(function (response) {
            if (response.data.code == 200) {
              // 如果文章為空則導至404page，不能使用router.push，因為有history，會導致LOOP
              if (response.data.data == null) {
                self.$router.replace({name: 'pageNotFound'});
              }
              self.article = response.data.data;
            }

          })
          .catch(function (error) {
            console.log(error)
          })
      },
      update() {
        //FormData format is not match x-www-form-urlencoded format,so that must use 'URLSearchParams' API to trun it again.
        let updateForm = new URLSearchParams(new FormData(document.getElementById('update')));

        let jwt = this.$cookie.get('jwtToken');
        var self = this;
        let instance = axios.create({
          headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        instance.patch(apiURL + `/article/${this.$route.params.id}`, updateForm)
          .then(function (response) {

            if (response.data.code == 200) {
              //todo 沒有提示成功跟失敗，type有權限的問題
              self.$router.push({name: 'index'});
            }
            else {
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

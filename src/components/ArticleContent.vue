<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
        <div class="panel-body">
          <fieldset>
            <legend class="section">發表文章</legend>
            <article-type :defaultType="article.type" :isDisable="true"></article-type>
            <div class="form-group">
              <label for="title" class="control-label">Author</label>
              <p class="form-control" id="title">{{article.user.name}}</p>
            </div>
            <div class="form-group">
              <label for="title" class="control-label">Title</label>
              <p class="form-control" id="title">{{article.title}}</p>
            </div>
            <div class="form-group">
              <label for='content' class="control-label">內容</label>
              <p class="form-control" id="content">{{article.content}}</p>
            </div>
          </fieldset>
        </div>
      <comment-list v-bind:articleId="articleId"></comment-list>
      <comment-create></comment-create>
    </div>


  </div>
</template>

<script>
  import {apiURL} from "../main";

  const articleType = require('@/components/ArticleType').default;
  const CommentCreate = require('@/components/CommentCreate').default;
  const CommentList = require('@/components/CommentList').default;
  export default {
    name: "article-content",
    data()
    {
      return {
        type:'',
        article:[],
        articleId:this.$route.params.id
      }
    },
  created:function () {
    this.fetchContent()
  },
    components:{
      'comment-create':CommentCreate,
      'comment-list':CommentList,
      'article-type':articleType
    },
  methods:{
    fetchContent()
      {
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
        return instance.get(apiURL + '/article/' + this.$route.params.id)
          .then(function (response) {

            if (response.data.code == 200) {
              self.article = response.data.data;

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

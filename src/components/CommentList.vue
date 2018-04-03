<template>
  <div class="row">
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover ">
        <thead>
        <tr class="d-flex">
          <th class="col-2">author</th>
          <th class="col-2">content</th>
          <th class="col-2">publish_at</th>
        </tr>
        </thead>
        <tbody v-cloak>
        <template v-for="(comment, index) in comments">
          <tr class="d-flex">
            <td class="col-2">{{comment.user.name}}</td>
            <td class="col-2">{{comment.content}}</td>
            <td class="col-2">{{comment.created_at}}</td>
            <td class="btns col-2">
              <router-link class="btn btn-info btn-xs" v-if='comment.isAuthor' :to="{name: 'article_edit',params: { id: comment.id }}">編輯</router-link>
              <button class="btn btn-danger btn-xs" v-if='comment.isAuthor' v-on:click="deleteArticle(comment.id, removeRow(index))">刪除</button>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "comment-list",
      data(){
          return{
            comments:[]
          }
      },
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
            // todo 已經可以確認登入了
            return instance.get(`http://localhost/api/article/${this.articleId}/comment`)
              .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                  console.log(response.data.data.data);
                  self.comments = response.data.data.data;
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

<template>
  <div class="row">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover ">
          <thead>
          <tr class="d-flex">
            <th class="col-2">type</th>
            <th class="col-2">title</th>
            <th class="col-2">author</th>
            <th class="col-2">publish_at</th>
          </tr>
          </thead>
          <tbody v-cloak>
          <template v-for="(article, index) in articles">
          <tr class="d-flex">
            <td class="col-2">{{article.type}}</td>
            <td class="col-2">{{article.title}}</td>
            <td class="col-2">{{article.user.name}}</td>
            <td class="col-2">{{article.created_at}}</td>
            <td class="btns col-2">
              <router-link class="btn btn-success" :to="{path: 'article/'+article.id}">查看</router-link>
              <router-link class="btn btn-info btn-xs" v-if='article.isAuthor' :to="{name: 'article_edit',params: { id: article.id }}">編輯</router-link>
              <button class="btn btn-danger btn-xs" v-if='article.isAuthor' v-on:click="deleteArticle(article.id, removeRow(index))">刪除</button>
            </td>
          </tr>
          </template>
          </tbody>
        </table>
  </div>
  </div>

</template>

<script>
    import {apiURL} from "../main";

    export default {
        name: "article-list",
      data()
      {
        return {
          articles:[]
        }
      },
      created:function () {
        this.fetchData()
      },
      methods:{
          fetchData()
          {

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
            return instance.get(apiURL+'/article')
              .then(function (response) {

                if (response.data.code == 200) {
                  self.articles = response.data.data.data;
                }

              })
              .catch(function (error) {
                console.log(error)
              })
          },
        removeRow(index)
        {
          //reset data has some problem,so i just remove the row.

          this.articles.splice(index, 1);
        }
      }
    }
</script>

<style scoped>

</style>

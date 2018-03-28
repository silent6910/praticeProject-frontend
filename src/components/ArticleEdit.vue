<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
      <form v-on:submit.prevent="publish()" class="panel panel-default" id="publish">
        <div class="panel-body">
          <fieldset>
            <legend class="section">發表文章</legend>
            <div class="form-group">
              <label for="type" class="control-label">type</label>
              <select class="form-control" id="type" name="type">
                <option value="" selected="selected">--请选择--</option>
                <option value="0">公告</option>
                <option value="1">討論</option>
                <option value="2">問題</option>
              </select>
            </div>
            <div class="form-group">
              <label for="title" class="control-label">Title</label>
              <input class="form-control" v-bind:value="article.user.name" name="title" type="text" id="title">
            </div>
            <div class="form-group">
              <label for="note" class="control-label">內容</label>
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
    export default {
        name: "article-edit",
      data()
      {
        return {
          type:'',
          article:[]
        }
      }, created:function () {
        this.fetchContent()
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
          return instance.get('http://localhost/api/article/' + this.$route.params.id)
            .then(function (response) {
              console.log(response);
              if (response.data.code == 200) {
                self.article = response.data.data;
                console.log(self.article);
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

<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
        <div class="panel-body">
          <fieldset>
            <legend class="section">發表文章</legend>
            <div class="form-group">
              <label for="type" class="control-label">type</label>
              <select class="form-control" v-model="article.type" id="type" name="type" disabled>
                <option value="" >--请选择--</option>
                <option value="0">公告</option>
                <option value="1">討論</option>
                <option value="2">問題</option>
              </select>
            </div>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "article-content",
    data()
    {
      return {
        type:'',
        article:[]
      }
    },
  created:function () {
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

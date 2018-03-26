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
  export default {
    name: "create-article",
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
        instance.post('http://localhost/api/article', publish)
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

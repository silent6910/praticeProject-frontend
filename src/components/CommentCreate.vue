<template>
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-6">
      <form v-on:submit.prevent="publish()" class="panel panel-default" id="publish">
        <div class="panel-body">
          <fieldset>
      <div class="form-group">
        <label for="content" class="control-label">Comment</label>
        <input class="form-control" name="content" type="text" id="content">
      </div>
          </fieldset>
        </div>
        <div class="panel-footer clearfix">
          <div class="btns pull-right">
            <button class="btn btn-success">publish comment</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "comment-create",
      methods:{
          publish(){
            let publishForm = new FormData(document.getElementById('publish'));
            let jwt = this.$cookie.get('jwtToken');
            var self = this;
            var instance = axios.create({
              headers: {
                'Authorization': 'Bearer ' + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
            instance.post(`http://localhost/api/article/${this.$route.params.id}/comment`, publishForm)
              .then(function (response) {
                if (response.data.code == 200) {
                  self.$router.go(0);
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

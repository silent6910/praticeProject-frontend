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
            <td>
              <p v-if="isEdit[index]">{{comment.content}}</p>
              <input    v-else  v-model="comment.content">
            </td>
            <td class="col-2">{{comment.created_at}}</td>
            <td class="btns col-2">
              <div v-if='comment.isAuthor'>
              <button class="btn btn-info btn-xs"  v-if='isEdit[index]' v-on:click="changeIsEdit(index)">編輯</button>
              <button class="btn btn-success btn-xs" v-else v-on:click=" submitEdit(index)">提交</button>
              <button class="btn btn-danger btn-xs"  v-on:click="deleteComment(index)">刪除</button>
              </div>
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
        name: "comment-list",
      data(){
          return{
            comments:[],
            isEdit:[],
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
      computed:{
          contentId:function (index) {
            return 'content-'+index;
          }
      },
      methods:{
          fetchComment(articleId)
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
            return instance.get(apiURL + `/article/${this.articleId}/comment`)
              .then(function (response) {

                if (response.data.code == 200) {
                  console.log(response.data.data.data);
                  self.comments = response.data.data.data;
                  self.comments.map(function (item,key) {
                    self.isEdit[key]=true;

                  });
                  console.log(self.comments);
                }

              })
              .catch(function (error) {
                console.log(error)
              })
          },
        changeIsEdit(index)
        {
          /*The problem is not about v-if, it's because Vue cannot detect the changes of an array element directly, this is one of the limitation of JavaScript.
          Thus, Vue provides some helper functions for this, like Vue.set */
          this.$set(this.isEdit, index, !this.isEdit[index])
        },
        submitEdit(index)
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
          let requestData = {'content': this.comments[index]['content']};
          return instance.patch(apiURL + `/article/${this.articleId}/comment/${this.comments[index]['id']}`, requestData)
            .then(function (response) {
              console.log(response);
              if (response.data.code == 200) {
                self.fetchComment(self.articleId);
              }

            })
            .catch(function (error) {
              console.log(error)
            })
        },
        deleteComment(index)
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
          instance.delete(apiURL + `/article/${this.articleId}/comment/${this.comments[index]['id']}`)
            .then(function (response) {
              console.log(response);
              if (response.data.code == 200) {
                self.fetchComment(self.articleId);
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

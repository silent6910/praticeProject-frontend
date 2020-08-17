<template>
  <div class="form-group">
    <label for="type" class="control-label">type</label>
    <select class="form-control" id="type" name="type" v-bind:disabled="isDisable" v-model="defaultType">
      <template v-for="(articleType,index) in articleTypes">
        <option v-bind:value='index'>{{articleType}}</option>
      </template>
    </select>
  </div>
</template>

<script>
  import {apiURL} from "../main";

  export default {
    name: "article-type",
    data() {
      return {
        articleTypes: [],
      }
    },
    created: function () {
      this.fetchData();
    },
    props: {
      isDisable: {
        default: false,
        type: Boolean
      },
      defaultType: {
        default: ''
      }
    },
    methods: {
      fetchData() {
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
        return instance.get(apiURL + '/article/type')
          .then(function (response) {
            if (response.data.code == 200) {
              self.articleTypes = response.data.data;

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

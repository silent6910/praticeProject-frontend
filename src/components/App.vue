<template>
  <div class="container-fluid">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{username}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>

    </div>
    <router-link v-if='isLogin' :to="{path: 'article_create'}" >test</router-link>
    <router-link v-if='isLogin' :to="{name: 'login'}" >登出</router-link>
    <router-link v-else :to="{name: 'login'}" >登入</router-link>
  </nav>

    <div class="col-md-12">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  //todo router-view 裡面的東西需要優化
    export default {
        name: "app.vue",
      data(){
        return {username: '遊客', isLogin: false}
      },
    created:function()
    {
      this.fetchData();
    },
      mounted:function () {
     ///   console.log(this.$store.state.jwtToken);
       // let jwt = this.$cookie.get('jwtToken');
       // console.log(jwt);
      },
      methods:{
          fetchData()
          {
            //todo 這邊因為created lifecycle的關係，使用this會call到windows的，建議個別compoent做個別的函數，能require file進來嗎?

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
            return instance.get('http://localhost/api/user/')
              .then(function (response) {
                if (response.data.code == 200) {
                  self.username = response.data.data.name;
                  self.isLogin = true;
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

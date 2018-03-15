<template>
  <div id="app">
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="www.google.com">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="www.google.com">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="www.google.com">Portfolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="www.google.com">Contact</a>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

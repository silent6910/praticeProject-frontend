<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover panel panel-default">
          <thead>
          <tr>
            <th>名称 </th>
            <th>帐号</th>
            <th class="sortable" data-field="login_at"><a>最后登录时间</a></th>
            <th>最后登录IP</th>
            <th class="sortable" data-field="created_at"><a>新增日期</a></th>
            <th>当前状态</th>
            <th>功能</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "ProjectIndex",
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped>

</style>

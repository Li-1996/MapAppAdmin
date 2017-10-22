<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>name:{{name}}</div>
    <div class='dashboard-text'>role:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <User :user-info="user_info"></User>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '@/components/user'

export default {
  name: 'dashboard',
  components: {
    User
  },
  data () {
    return {
      user_info: {
        user_id: 123456
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

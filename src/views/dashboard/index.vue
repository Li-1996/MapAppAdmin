<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>昵称:{{name}}</div>
    <div class='dashboard-text'>权限:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <CreateVersion @finishCreateVersion="finishCreateVersion"></CreateVersion>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateVersion from '@/components/create-version'

export default {
  name: 'dashboard',
  components: {
    CreateVersion
  },
  data () {
    return {
      user_info: {
        user_id: 123456
      }
    }
  },
  methods: {
    finishCreateVersion () {
      console.log('123')
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

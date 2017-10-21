<template>
  <div class="app-container">
    <h1>{{this.user_count}}</h1>
    <h2>{{this.per_day_content}}</h2>
    <h3>{{this.per_day_label}}</h3>
  </div>
</template>

<script>
import { userStatic } from '@/api/static'

export default {
  data() {
    return {
      user_count: 0,
      per_day_label: null,
      per_day_content: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      userStatic().then(response => {
        console.log(response.detail)
        this.user_count = response.detail.totals
        this.per_day_label = response.detail.per_day.label
        this.per_day_content = response.detail.per_day.content
        this.listLoading = false
      })
    }
  }
}
</script>

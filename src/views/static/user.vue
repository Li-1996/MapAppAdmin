<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div id="count">{{this.user_count}}</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div id="echarts_div" style="height: 400px; width: 400px"></div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import { userStatic } from '@/api/static'
import echarts from 'echarts'

export default {
  data() {
    return {
      user_count: 0,
      per_day_label: [],
      per_day_content: [],
      myChart: null
    }
  },
  created() {
    this.fetchData()

  },
  mounted () {
    this.initChart()
  },
  computed: {
    opt () {
      let obj = {
        title: { text: '最近7天注册人数' },
        tooltip: {},
        xAxis: {
          data: this.per_day_label
        },
        yAxis: {},
        series: [{
          name: '注册人数',
          type: 'bar',
          data: this.per_day_content
        }]
      }
      return obj
    }
  },
  updated () {
    console.log('here')
    this.initChart()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      userStatic().then(response => {
        this.user_count = response.detail.totals
        this.per_day_label = response.detail['per_day']['label']
        this.per_day_content = response.detail['per_day']['content']
        this.listLoading = false
      })
    },
    initChart () {
      this.myChart = echarts.init(document.getElementById('echarts_div'))
      this.myChart.setOption(this.opt);
    }
  }
}
</script>

<style>
  #count {
    width: 50px;
    height: 50px;
    background-color: #d3dce6;
  }
</style>

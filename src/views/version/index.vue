<template>
  <div class="app-container">
    <!--头部-->
    <div>
      <CreateVersion @finishCreateVersion="finishCreateVersion"></CreateVersion>
    </div>
    <br>
    <!--内容-->
    <div>
      <el-table :data="version_list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="描述" align="center">
        <template scope="scope">
          <span>{{scope.row.describe}}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本号" align="center">
        <template scope="scope">
          <span>{{scope.row.app_version}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新类型" align="center">
        <template scope="scope">
          {{scope.row.update_type}}
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template scope="scope">
          {{scope.row.device_type}}
        </template>
      </el-table-column>
      <el-table-column label="URL" align="center">
        <template scope="scope">
          {{scope.row.url}}
        </template>
      </el-table-column>
      <el-table-column label="发布状态" align="center">
        <template scope="scope">
          {{scope.row.is_publish}}
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!--翻页组件-->
    <div style="text-align:center">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page_size"
        :current-page.sync="page"
        layout="total, prev, pager, next, jumper"
        :total="totals">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getVersion } from '@/api/version'
import CreateVersion from '@/components/create-version'

export default {
  data() {
    return {
      version_list: null,
      listLoading: true,
      page: 1,
      page_size: 10,
      totals: 0
    }
  },
  components: {
    CreateVersion
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getVersion(this.page, this.page_size).then(response => {
        this.totals = response.detail.totals
        this.version_list = response.detail.list
        this.listLoading = false
      })
    },
    finishCreateVersion () {
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.fetchData()
    }
  }
}
</script>

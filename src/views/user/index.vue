<template>
  <div class="app-container">
    <el-table :data="user_list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <!--<el-table-column align="center" label='ID' width="95">-->
        <!--<template scope="scope">-->
          <!--{{scope.$index}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="用户ID">
        <template scope="scope">
          {{scope.row.user_id}}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="110" align="center">
        <template scope="scope">
          <span>{{scope.row.nick_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="110" align="center">
        <template scope="scope">
          {{scope.row.birthday}}
        </template>
      </el-table-column>
      <el-table-column label="星座" width="110" align="center">
        <template scope="scope">
          {{scope.row.constellation.name}}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template scope="scope">
          {{scope.row.gender}}
        </template>
      </el-table-column>
      <!--<el-table-column label="个性签名" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.person_signature}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="是否可用" width="110" align="center">
        <template scope="scope">
          {{scope.row.is_valid}}
        </template>
      </el-table-column>
      <el-table-column label="粉丝数量" width="110" align="center">
        <template scope="scope">
          {{scope.row.fans_count}}
        </template>
      </el-table-column>
      <el-table-column label="关注了的人数" width="110" align="center">
        <template scope="scope">
          {{scope.row.focus_count}}
        </template>
      </el-table-column>
      <el-table-column label="地区" width="110" align="center">
        <template scope="scope">
          {{scope.row.region}}
        </template>
      </el-table-column>
      <!--<el-table-column label="头像" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.head_image}}-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="page_size"
      :current-page.sync="page"
      layout="total, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>
  </div>
</template>

<script>
import { getUser, getUserBank } from '@/api/user'

export default {
  data() {
    return {
      user_list: null,
      listLoading: true,
      page: 1,
      page_size: 10,
      totals: 0
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUser(this.page, this.page_size).then(response => {
        this.totals = response.detail.totals
        this.user_list = response.detail.list
        this.listLoading = false
      })
    },
    handleCurrentChange (val) {
      this.fetchData()
    }
  }
}
</script>

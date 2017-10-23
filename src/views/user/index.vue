<template>
  <div class="app-container">
    <!--<el-table :data="user_list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>-->
      <!--&lt;!&ndash;<el-table-column align="center" label='ID' width="95">&ndash;&gt;-->
        <!--&lt;!&ndash;<template scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;{{scope.$index}}&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--<el-table-column label="用户ID">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.user_id}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="昵称" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.nick_name}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="生日" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.birthday}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="星座" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.constellation.name}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="性别" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.gender}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--&lt;!&ndash;<el-table-column label="个性签名" width="110" align="center">&ndash;&gt;-->
        <!--&lt;!&ndash;<template scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;{{scope.row.person_signature}}&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--<el-table-column label="是否可用" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.is_valid}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="粉丝数量" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.fans_count}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="关注了的人数" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.focus_count}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="地区" width="110" align="center">-->
        <!--<template scope="scope">-->
          <!--{{scope.row.region}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--&lt;!&ndash;<el-table-column label="头像" width="110" align="center">&ndash;&gt;-->
        <!--&lt;!&ndash;<template scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;{{scope.row.head_image}}&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
    <!--</el-table>-->
    <el-row>
      <el-col :span="6" v-for="user_info in user_list" :key="user_info">
        <User :user-info="user_info"></User>
      </el-col>
    </el-row>
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
import { getUser, getUserBank } from '@/api/user'
import User from '@/components/user'
import ElRow from "element-ui/packages/row/src/row";
console.
export default {
  data() {
    return {
      user_list: null,
      listLoading: true,
      page: 1,
      page_size: 12,
      totals: 0
    }
  },
  components: {
    ElRow,
    User
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

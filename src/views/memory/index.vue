<template>
  <div class="app-container">
    <el-table :data="memory_list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="用户id">
        <template scope="scope">
          {{scope.row.user.user_id}}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template scope="scope">
          {{scope.row.user.nick_name}}
        </template>
      </el-table-column>
      <el-table-column label="评论数">
        <template scope="scope">
          {{scope.row.comment_count}}
        </template>
      </el-table-column>
      <el-table-column label="地理位置">
        <template scope="scope">
          {{scope.row.geo_point}}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            @click.native.prevent="checkMemoryClick(scope.$index, scope.row)"
            type="text"
            size="small">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--审核memoery对话框-->
    <el-dialog title="审核memory" :visible.sync="checkDialogVisible">
      <el-form :model="checkMemoryInfo" :label-width="formLabelWidth">
        <el-form-item label="ID" >
          {{ checkMemoryInfo.memory_id}}
        </el-form-item>
        <el-form-item label="位置" >
          {{ checkMemoryInfo.geo_point}}
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="checkMemoryInfo.content" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div v-for="each_image in checkMemoryInfo.pictures">
            <a :href=each_image target="_blank">{{each_image}}</a>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCheck">取 消</el-button>
        <el-button type="primary" @click="ensureCheck(checkMemoryInfo.memory_id, 'pass')">通过</el-button>
        <el-button type="danger" @click="ensureCheck(checkMemoryInfo.memory_id, 'reject')">不通过</el-button>
      </div>
    </el-dialog>
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
import { getMemory, checkMemory } from '@/api/memory'
import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

export default {
  components: {ElFormItem},
  data() {
    return {
      memory_list: null,
      listLoading: true,
      page: 1,
      page_size: 10,
      totals: 0,
      checkDialogVisible: false,
      formLabelWidth: '120px',
      checkMemoryInfo: this.emptyCheckMemoryInfo()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    emptyCheckMemoryInfo () {
      return {
        memory_id: '',
        background_pic: '',
        check_state: '',
        comment_count: '',
        content: '',
        geo_point: '',
        like_count: '',
        pictures: [],
        style: '',
        unlike_count: '',
        user: {}
      }
    },
    fetchData() {
      this.listLoading = true
      getMemory(this.page, this.page_size).then(response => {
        this.totals = response.detail.totals
        this.memory_list = response.detail.list
        this.listLoading = false
      })
    },
    handleCurrentChange (val) {
      this.fetchData()
    },
    checkMemoryClick (index, row) {
      console.log(row)
      this.checkMemoryInfo = row
      this.checkDialogVisible = true
    },
    cancelCheck () {
      this.checkDialogVisible = false
      this.checkVersionInfo = this.emptyCheckMemoryInfo()
    },
    ensureCheck (id, check_state) {
      console.log(id, check_state)
      checkMemory(id, check_state).then(response => {
        this.checkVersionInfo = this.emptyCheckMemoryInfo()
        this.checkDialogVisible = false
        if (check_state == 'pass') {
          this.$message('通过成功');
        }else {
          this.$message('拒绝');
        }
        this.fetchData()
      })
//      deleteVersion(id).then(response => {

//      })
      this.dialogFormVisible = false
    }
  }
}
</script>

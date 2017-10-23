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
        <el-table-column fixed="right" label="操作" width="120">
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteVersionClick(scope.$index, scope.row)"
              type="text"
              size="small">
              移除
            </el-button>
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

    <!--删除版本对话框-->
    <el-dialog title="删除版本" :visible.sync="deleteDialogVisible" style="z-index: 10">
      <el-form :model="deleteVersionInfo" :label-width="formLabelWidth">
        <el-form-item label="ID" >
          <el-input v-model="deleteVersionInfo.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <!--<el-form-item label="是否发布" >-->
          <!--<el-input v-model="deleteVersionInfo.is_publish" auto-complete="off" :disabled="true"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="版本号" >
          <el-input v-model="deleteVersionInfo.app_version" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" >
          <el-input v-model="deleteVersionInfo.url" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input v-model="deleteVersionInfo.device_type" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新类型">
          <el-input v-model="deleteVersionInfo.update_type" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="版本描述">
          <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="deleteVersionInfo.describe" :disabled="true">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="ensureDelete(deleteVersionInfo.id)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getVersion, deleteVersion } from '@/api/version'
import CreateVersion from '@/components/VersionComponent'

export default {
  data() {
    return {
      version_list: null,
      listLoading: true,
      page: 1,
      page_size: 10,
      totals: 0,
      deleteDialogVisible: false,
      formLabelWidth: '120px',
      deleteVersionInfo: this.emptyDeleteVersionInfo()
    }
  },
  components: {
    CreateVersion
  },
  created() {
    this.fetchData()
  },
  methods: {
    emptyDeleteVersionInfo () {
      return {
        id: '',
        app_version: '',
        url: '',
        describe: '',
        device_type: '',
        update_type: '',
        is_publish: ''
      }
    },
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
    },
    deleteVersionClick(index, rows) {
      console.log(rows)
      this.deleteVersionInfo = rows
      this.deleteDialogVisible = true
    },
    cancelDelete () {
      this.dialogFormVisible = false
      this.deleteVersionInfo = this.emptyDeleteVersionInfo()
    },
    ensureDelete (id) {
      deleteVersion(id).then(response => {
        this.deleteVersionInfo = this.emptyDeleteVersionInfo()
        this.deleteDialogVisible = false
        this.$message('删除成功');
        this.fetchData()
      })
      console.log(id)
      this.dialogFormVisible = false
    }
  }
}
</script>

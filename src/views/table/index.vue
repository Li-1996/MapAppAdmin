<template>
  <div class="app-container">

    <el-row class="divcss" :data="user_list" v-for="value in user_list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-card :body-style="{ padding: '0px'}" class="card">
        <img class="image" :src="value['head_image']" width="80" height="80">
        <el-tag type="primary" class="tag">user_id &nbsp&nbsp：{{value['user_id']}}</el-tag>
        <el-tag type="primary" class="tag">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：{{value['sex']}}</el-tag>
        <el-tag type="primary" class="tag">关注人数：{{value['zqcy_auth']}}</el-tag>
        <el-tag type="primary" class="tag">昵&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：{{value['nick_name']}}</el-tag>
        <el-tag type="primary" class="tag">实名认证：{{value['real_name_auth']}}</el-tag>
        <el-tag type="primary" class="tag">红牛认证：{{value['red_bull_auth']}}</el-tag>
        <el-tag type="primary" class="tag">金牛认证：{{value['gold_bull_auth']}}</el-tag>
        <el-button id="button" class="button" type="info" @click="balance(value.user_id)">余额
        </el-button>
      </el-card>
    </el-row>

    <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
    <!--<template scope="scope">-->
    <!--<i class="el-icon-time"></i>-->
    <!--<span>{{scope.row.display_time}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <el-pagination
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size=10
      :total=totals>
    </el-pagination>
  </div>
</template>

<script>
  import {getUserList, getUserBank} from '@/api/table';

  export default {

    data() {
      return {
        user_list: null,
        listLoading: true,
        totals: 0
      }
    },
    created() {
      this.fetchData({
        page: 1
      });
    },
    methods: {
      handleCurrentChange(val) {
        this.fetchData({
          page: val
        })
      },

      balance: function (user_id) {
        console.log(user_id)
        // this.listLoading = true;
        getUserBank({
          user_id: user_id
        }).then(response => {
          // this.listLoading = false;
          console.log(response)
          alert(response.detail.balance)
        })
      },

      fetchData(params) {
        this.listLoading = true;
        getUserList(params).then(response => {
          this.user_list = response.detail.list;
          this.totals = response.detail.totals;
          this.listLoading = false;

        })
      }
    }
  };
</script>

<style>
  .divcss {
    display: inline-block;
    width: 500px;
    height: 30px;
    margin-right: 5px;
  }

  .tag {
    font-size: 18px;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-left: 40px;
    display: inline-block;
    width: 200px;
  }

  .button {
    margin-left: 150px;
    width: 40%;
    height: 100%;
  }

  .image {
    width: 20%;
    height: 100px;
    display: block;
    margin-left: 40px;
    margin-top: 10px;
  }

  .card {
    margin-bottom: 50px;
    margin-top: 10px;
  }


</style>

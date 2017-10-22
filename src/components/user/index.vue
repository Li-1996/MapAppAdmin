<template>
      <el-card  style="width: 250px; height: 400px; margin: 10px;">
        <img :src=userInfo.head_image class="image">
        <div style="padding: 2px;">
          <div style="padding: 2px">
            <el-tag type="primary">ID: {{userInfo.user_id}}</el-tag>
            <el-tag type="primary">{{userInfo.nick_name}}</el-tag>
          </div>
          <div style="padding: 2px;">
            <el-tag type="primary">{{userInfo.birthday}}</el-tag>
            <el-tag type="primary">{{userInfo.gender}}</el-tag>
            <el-tag type="primary">{{userInfo.region}}</el-tag>
          </div>
          <div style="padding: 2px;">
            <el-tag type="primary">关注人数 {{userInfo.focus_count}}</el-tag>
            <el-tag type="primary">粉丝数量 {{userInfo.funs_count}}</el-tag>
          </div>
          <!--<div class="bottom clearfix">-->
            <!--<time class="time">{{ currentDate }}</time>-->
            <!--<el-button type="text" class="button">操作按钮</el-button>-->
          <!--</div>-->
        </div>
      </el-card>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: 'User',
    props: [
      'userInfo'
    ],
    data () {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 250px;
    display: block;
  }

  /*.clearfix:before,*/
  /*.clearfix:after {*/
    /*display: table;*/
    /*content: "";*/
  /*}*/

  /*.clearfix:after {*/
    /*clear: both*/
  /*}*/
</style>

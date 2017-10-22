<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible=true">创建新版本</el-button>
    <el-dialog title="新版本" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="版本号" >
          <el-input v-model="form.app_version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" >
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-radio class="device_type" v-model="form.device_type" label="ios">iOS</el-radio>
          <el-radio class="device_type" v-model="form.device_type" label="android">Android</el-radio>
        </el-form-item>
        <el-form-item label="更新类型">
          <el-radio class="update_type" v-model="form.update_type" label="1">强制</el-radio>
          <el-radio class="update_type" v-model="form.update_type" label="0">不强制</el-radio>
        </el-form-item>
        <el-form-item label="版本描述">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.describe">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create_version">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

//  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import { createVersion } from '@/api/version'

  export default {
    components: {},
    name: 'CreateVersion',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          app_version: '',
          url: '',
          describe: '',
          device_type: '',
          update_type: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      empty_form () {
        this.form.app_version = ''
        this.form.url = ''
        this.form.describe = ''
        this.form.device_type= ''
        this.form.update_type =''
      },
      create_version () {
        createVersion(this.form).then(response => {
          console.log(response)
          this.$emit('finishCreateVersion')
          this.dialogFormVisible = false
        })
//        console.log('123')
      },
    },
    props: [
//      'userInfo'
    ]
  }
</script>

<style>

</style>

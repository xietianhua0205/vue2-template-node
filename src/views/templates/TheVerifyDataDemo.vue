<template>
<page-content>
  <template slot="page-title">
    {{currentMenuGet() ? currentMenuGet().name : ''}}
  </template>
  <template #main-table>
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字段一" prop="fieldOne">
          <el-input
            v-bind="$getMaxlengthByKey('verifyDataDemo.fieldOne')"
            v-model="form.fieldOne"></el-input>
        </el-form-item>
        <el-form-item label="字段二" prop="fieldTwo">
          <el-input-number
            v-bind="$getMaxlengthByKey('verifyDataDemo.fieldTwo', 'number')"
            v-model="form.fieldTwo"></el-input-number>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="rules2" label-width="80px">
        <el-form-item label="字段三" prop="fieldThree">
          <el-input
            v-bind="$getMaxlengthByKey('verifyDataDemo.form.testField')"
            v-model="form.fieldThree"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

  </template>
</page-content>
</template>

<script>
import PageContent from '@/components/PageContent'
import { buildValidatorRules, verifyData } from '@/utils/verify-data'
export default {
  name: 'TheVerifyDataDemo',
  components: { PageContent },
  inject: ['currentMenuGet'],
  data () {
    return {
      rules: buildValidatorRules([
        {
          key: 'fieldOne',
          label: '字段一',
          path: 'verifyDataDemo.fieldOne',
          ruleTypes: ['required', 'defaultVerify'],
          customRules: [
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      ]),
      rules2: {
        fieldThree: [
          {
            validator: (rule, value, callback) => {
              const errorInfo = verifyData(value, '字段三', 'verifyDataDemo.form.testField')
              if (errorInfo) {
                callback(new Error(errorInfo))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      },
      form: {
        fieldOne: '',
        fieldTwo: 10,
        fieldThree: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

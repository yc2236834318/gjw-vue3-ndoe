<!-- 地址添加 子组件 -->

<script setup>
import { useReceStore } from '@/stores' // 导入仓库文件
import { pcaTextArr } from 'element-china-area-data' // 导入省市区级联插件
import { myAlert } from '@/composables/myAlert'
import { ref } from 'vue'

const receStore = useReceStore() // 注册收货仓库
const receForm = ref() // 绑定表单元素
const showDialog = ref(false) // 地址框显示
// 地址栏数据
const formModel = ref({
  phone: '', // 联系电话
  consignee: '', // 收货人
  area: [], // 地区选择
  address: '' // 详细地址
})
// 验证规则
const rules = {
  consignee: [
    { required: true, message: '请输入收货人', trigger: 'blur' },
    { min: 1, max: 8, message: '收货人必须是 1-8位 的字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的联系电话',
      trigger: 'blur'
    }
  ],
  area: [{ required: true, message: '请选择收货区域', trigger: 'blur' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
}
// 地址添加
const confirm = async () => {
  await receForm.value.validate() // 表单对象数据验证
  await receStore.addRece(formModel.value) // 发起添加请求
  myAlert('添加地址成功')
  showDialog.value = false
  receForm.value.resetFields() // 重置表单
  receStore.getReceList() // 重新获取收货信息
}
</script>

<template>
  <div class="cut">
    <el-button type="primary" @click="showDialog = true">添加地址</el-button>
    <el-dialog
      v-model="showDialog"
      :lock-scroll="false"
      title="添加收货地址"
      width="30%"
      center
    >
      <el-form
        :model="formModel"
        :rules="rules"
        ref="receForm"
        autocomplete="off"
      >
        <el-form-item label="收 货 人" prop="consignee">
          <el-input v-model="formModel.consignee"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="选择地区" prop="area">
          <el-cascader
            size="large"
            :options="pcaTextArr"
            v-model="formModel.area"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="formModel.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>

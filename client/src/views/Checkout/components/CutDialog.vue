<!-- 地址切换 子组件 -->

<script setup>
import { ref } from 'vue'

// 父子通信
const props = defineProps({
  receList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['cutAddress'])

// 地址栏
const showDialog = ref(false) // 地址框显示
const activeAddress = ref({}) // 地址值
const cut = (item) => {
  activeAddress.value = item // 地址栏样式切换
}
// 地址覆盖
const confirm = () => {
  if (activeAddress.value.phone) emit('cutAddress', activeAddress.value)
  showDialog.value = false
}
</script>

<template>
  <div class="cut">
    <el-button size="large" @click="showDialog = true">选择地址</el-button>
    <el-dialog
      v-model="showDialog"
      :lock-scroll="false"
      title="选择收货地址"
      width="30%"
      center
    >
      <div v-if="props.receList.length > 0" class="addressWrapper">
        <div
          class="text item"
          :class="{ active: activeAddress.id === item.id }"
          @click="cut(item)"
          v-for="item in props.receList"
          :key="item.id"
        >
          <ul>
            <li>
              <span>收<i />货<i />人：</span>{{ item.consignee }}
            </li>
            <li><span>联系方式：</span>{{ item.phone }}</li>
            <li><span>收货地址：</span>{{ item.area + item.address }}</li>
          </ul>
        </div>
      </div>
      <div v-else class="empty">暂无地址，去添加吧！</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}
.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
    &.active,
    &:hover {
      border-color: $gjwColor;
      background: rgba($gjwColor, 0.05);
    }
    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>

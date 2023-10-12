// 提示弹窗文件

export const myAlert = (msg) => {
  // 判断是否已有一个弹窗框
  const alert = document.querySelector('.alertShow')
  // 如果已有一个弹窗,就隐藏已有的弹窗,弹出新的弹窗
  if (alert) alert.className = 'alert alertHide'
  // 出现
  const newAlert = document.createElement('div')
  const body = document.querySelector('body')
  body.appendChild(newAlert)
  newAlert.className = 'alert alertShow'
  newAlert.innerHTML = msg
  // 消失
  setTimeout(() => {
    newAlert.className = 'alert alertHide' // 淡出
  }, 2000)

  setTimeout(() => {
    body.removeChild(newAlert) // 移除
  }, 2500)
}
